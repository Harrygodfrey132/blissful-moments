//Common Function for live search
document.addEventListener("DOMContentLoaded", function () {
    let debounceTimer;
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            let searchTerm = e.target.value;
            let url = e.target.getAttribute("data-url");

            clearTimeout(debounceTimer);

            debounceTimer = setTimeout(function () {
                // Check if the listingTable exists
                const listingTable = document.querySelector("#listingTable");
                if (listingTable) {
                    fetch(`${url}?search=${searchTerm}`, {
                        method: "GET",
                        headers: {
                            "X-CSRF-TOKEN": document
                                .querySelector('meta[name="csrf-token"]')
                                .getAttribute("content"),
                            "X-Requested-With": "XMLHttpRequest",
                        },
                    })
                        .then((response) => response.text())
                        .then((html) => {
                            if (listingTable) {
                                // Double-check null safety
                                listingTable.innerHTML = html;
                            }
                        })
                        .catch((error) => console.error("Error:", error));
                } else {
                    console.error("Error: #listingTable element not found.");
                }
            }, 300);
        });
    }
});

// Common function for advance search filter
function advanceFormHandler() {
    // Get the form element and its action URL
    const form = document.getElementById("advanceSearchForm");
    if (!form) {
        console.error("Error: advanceSearchForm not found.");
        return;
    }
    const url = form.action;

    const formData = new URLSearchParams(new FormData(form));
    const query = formData.toString();

    // Fetch results based on the search query
    fetch(`${url}?${query}`, {
        method: "GET",
        headers: {
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
            "X-Requested-With": "XMLHttpRequest",
        },
    })
        .then((response) => response.text())
        .then((html) => {
            const listingTable = document.querySelector("#listingTable");
            if (listingTable) {
                listingTable.innerHTML = html;
            } else {
                console.error("Error: #listingTable element not found.");
            }
        })
        .catch((error) => console.error("Error:", error));
}

// Common Function for Multi Delete
document.addEventListener("DOMContentLoaded", () => {
    const deleteButton = document.querySelector("#deleteButton");
    if (!deleteButton) {
        console.error("Error: #deleteButton element not found.");
        return;
    }

    const selectAllCheckbox = document.querySelector("#selectAll");
    const rowCheckboxes = document.querySelectorAll(".rowCheckbox");
    const multiDeleteRoute = deleteButton.getAttribute("data-multi-delete-url");

    // Check if selectAllCheckbox exists on the page before adding event listener
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener("change", () => {
            rowCheckboxes.forEach((checkbox) => {
                checkbox.checked = selectAllCheckbox.checked;
            });
            toggleDeleteButton(); // Toggle delete button based on checkboxes
        });
    }

    // Handle individual checkbox change
    rowCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const allChecked = [...rowCheckboxes].every((cb) => cb.checked);
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked; // Update select all checkbox
            }
            toggleDeleteButton(); // Toggle delete button based on checkboxes
        });
    });

    // Enable or disable the Delete button
    function toggleDeleteButton() {
        const anyChecked = [...rowCheckboxes].some((cb) => cb.checked);
        if (anyChecked) {
            deleteButton.classList.remove("bg-gray-300", "cursor-not-allowed");
            deleteButton.classList.add("bg-red-500");
            deleteButton.disabled = false;
        } else {
            deleteButton.classList.add("bg-gray-300", "cursor-not-allowed");
            deleteButton.classList.remove("bg-red-500");
            deleteButton.disabled = true;
        }
    }

    // Multi-delete function
    deleteButton.addEventListener("click", function () {
        const selectedIds = [...rowCheckboxes]
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.dataset.id); // Collect the IDs of checked items

        if (selectedIds.length === 0) return;

        const confirmDelete = confirm(
            "Are you sure you want to delete these items?"
        );
        if (confirmDelete) {
            fetch(multiDeleteRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify({ ids: selectedIds }), // Send array of IDs
            })
                .then((response) => {
                    if (response.ok) {
                        // Uncheck all items
                        if (selectAllCheckbox) {
                            selectAllCheckbox.checked = false;
                        }
                        rowCheckboxes.forEach((checkbox) => {
                            checkbox.checked = false;
                        });

                        // Reset delete button state
                        toggleDeleteButton();

                        // Show success notification and reload
                        showNotification("successNotification");
                        location.reload(); // Refresh page to show updated table
                    } else {
                        showNotification(
                            "errorNotification",
                            "Error deleting items"
                        );
                    }
                })
                .catch((error) => console.error("Error:", error));
        }
    });
});

// Modal Toggle
function toggleModal() {
    const modal = document.getElementById("deleteModal");
    if (modal) {
        modal.classList.toggle("hidden");
    } else {
        console.error("Error: #deleteModal element not found.");
    }
}

// Delete Modal Handler
function deleteModalHandler(button) {
    const url = button.getAttribute("data-url");
    const form = document.getElementById("deleteModalForm");

    if (form) {
        form.action = url;
        toggleModal();
    } else {
        console.error("Error: #deleteModalForm element not found.");
    }
}

// Update Status Handler
function updateStatusHandler(status) {
    const toggleButton = event.currentTarget;
    const url = toggleButton.getAttribute("data-url");
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ status: status }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data.success) {
                showNotification(
                    "errorNotification",
                    "Failed to update status"
                );
                toggleButton.dispatchEvent(new Event("click"));
            } else {
                showNotification("successNotification");
            }
        })
        .catch((error) => {
            showNotification("errorNotification", "Error updating status");
            toggleButton.dispatchEvent(new Event("click"));
        });
}

//Custom Function to load Edit Form
function setup() {
    return {
        panel: false,
        menu: true,
        openPanel: false,
        multiSearchOpen: false,
        actionType: "",
        errors: {},
        dropdown: false,
        refreshListing(url) {
            fetch(`${url}`, {
                method: "GET",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                    "X-Requested-With": "XMLHttpRequest",
                },
            })
                .then((response) => response.text())
                .then((html) => {
                    document.querySelector(`#listingTable`).innerHTML = html;
                })
                .catch((error) => console.error("Error:", error));
        },
        loadEditForm(url) {
            fetch(url)
                .then((response) => response.text())
                .then((html) => {
                    document.getElementById("formData").innerHTML = html;
                    this.openPanel = true;
                })
                .catch((error) =>
                    showNotification(
                        "errorNotification",
                        "Error loading edit form"
                    )
                );
        },
        loadCreateForm(url) {
            fetch(url)
                .then((response) => response.text())
                .then((html) => {
                    document.getElementById("formData").innerHTML = html;
                    this.openPanel = true;
                })
                .catch((error) =>
                    showNotification(
                        "errorNotification",
                        "Error loading edit form"
                    )
                );
        },
        loadViewForm(url) {
            fetch(url)
                .then((response) => response.text())
                .then((html) => {
                    document.getElementById("formData").innerHTML = html;
                    this.openPanel = true;
                })
                .catch((error) =>
                    showNotification(
                        "errorNotification",
                        "Error loading edit form"
                    )
                );
        },
        submitFormHandler(formId) {
            const csrfToken = document.querySelector(
                'meta[name="csrf-token"]'
            ).content;
            const form = document.getElementById(formId);
            const url = form.getAttribute("data-url");
            const formData = new FormData(form);
            this.errors = {};
            // Send the form data using Fetch API (AJAX)
            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
            })
                .then((response) => response.json()) // Assuming the response is JSON
                .then((data) => {
                    if (data.success) {
                        showNotification("successNotification");
                        this.openPanel = false;
                        this.refreshListing(url);
                    } else {
                        // Handle validation errors or other issues
                        showNotification(
                            "errorNotification",
                            "Error updating user!"
                        );
                    }
                })
                .catch((error) => {
                    console.error("Error submitting the form:", error);
                    showNotification(
                        "errorNotification",
                        "An error occurred. Please try again."
                    );
                });
        },
    };
}
