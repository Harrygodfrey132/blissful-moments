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
        multiSearchOpen: false ,
        actionType: "",
        errors: {},
        loadEditForm(url) {
            fetch(url)
                .then((response) => response.text())
                .then((html) => {
                    document.getElementById("editForm").innerHTML = html;
                })
                .catch((error) =>
                    showNotification(
                        "errorNotification",
                        "Error loading edit form"
                    )
                );
        },
        submitFormHandler() {
            // Get the form element
            const form = document.getElementById("userEditForm");
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
