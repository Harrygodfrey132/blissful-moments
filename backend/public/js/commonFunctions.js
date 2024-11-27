//Common Function for live search
document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelector('input[name="search"]')
        .addEventListener("input", function (e) {
            let searchTerm = e.target.value;
            let url = e.target.getAttribute("data-url");

            // Fetch new user data based on the search query
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
                    // Replace the user table body with the updated HTML
                    document.querySelector(`#listingTable`).innerHTML = html;
                })
                .catch((error) => console.error("Error:", error));
        });
});

//Common function for advance search filter
function advanceFormHandler() {
    // Get the form element and its action URL
    const form = document.getElementById("advanceSearchForm");
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
            // Inject the returned HTML into the listingTable element
            document.querySelector("#listingTable").innerHTML = html;
        })
        .catch((error) => console.error("Error:", error));
}

//Common Function for Multi Delete
document.addEventListener("DOMContentLoaded", () => {
    const deleteButton = document.querySelector("#deleteButton");
    const selectAllCheckbox = document.querySelector("#selectAll");
    const rowCheckboxes = document.querySelectorAll(".rowCheckbox");
    const multiDeleteRoute = deleteButton.getAttribute("data-multi-delete-url"); // Get the route from the button

    // Handle select all checkboxes
    selectAllCheckbox.addEventListener("change", () => {
        rowCheckboxes.forEach((checkbox) => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        toggleDeleteButton(); // Toggle delete button based on checkboxes
    });

    // Handle individual checkbox change
    rowCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const allChecked = [...rowCheckboxes].every((cb) => cb.checked);
            selectAllCheckbox.checked = allChecked; // Update select all checkbox
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
                        selectAllCheckbox.checked = false;
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
    document.getElementById("deleteModal").classList.toggle("hidden");
}

// Delete Modal Handler
function deleteModalHandler(button) {
    const url = button.getAttribute("data-url");
    const form = document.getElementById("deleteModalForm");

    form.action = url;
    toggleModal();
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

// Export or expose functions if needed
window.toggleModal = toggleModal;
window.deleteModalHandler = deleteModalHandler;
window.updateStatusHandler = updateStatusHandler;

// order details page toggle function
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => {
        const header = event.target.closest(".toggle-header");
        if (header) {
            const container = header.nextElementSibling;
            const iconDown = header.querySelector(".icon-down");
            const iconUp = header.querySelector(".icon-up");

            // Toggle max-height between 0 and the scrollHeight of the container for smooth animation
            if (container.style.maxHeight) {
                container.style.maxHeight = null;
            } else {
                container.style.maxHeight = container.scrollHeight + "px";
            }

            // Toggle icon visibility
            iconDown.classList.toggle("hidden");
            iconUp.classList.toggle("hidden");
        }
    });
});

//Custom Function to load Edit Form
function commonData() {
    return {
        panel: false,
        menu: true,
        openPanel: false,
        multiSearchOpen: false,
        actionType: "",
        errors: {},
        dropdown: false,
        loadEditForm(url) {
            fetch(url)
                .then((response) => response.text())
                .then((html) => {
                    document.getElementById("editForm").innerHTML = html;
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
                    document.getElementById("editForm").innerHTML = html;
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
            // Get the form element
            const form = document.getElementById(formId);
            const formData = new FormData(form);
            this.errors = {};
            // Send the form data using Fetch API (AJAX)
            fetch(form.action, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json()) // Assuming the response is JSON
                .then((data) => {
                    if (data.success) {
                        // Handle success
                        showNotification("successNotification");
                        this.openPanel = false;
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
