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
                alert("Failed to update status");
                toggleButton.dispatchEvent(new Event("click"));
            } else {
                flasher.success("Record status updated successfully");
            }
        })
        .catch((error) => {
            console.error("Error updating status:", error);
            alert("An error occurred. Please try again.");
            toggleButton.dispatchEvent(new Event("click"));
        });
}

// Export or expose functions if needed
window.toggleModal = toggleModal;
window.deleteModalHandler = deleteModalHandler;
window.updateStatusHandler = updateStatusHandler;
