document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".php-email-form");
  const successAlert = document.getElementById("successAlert");
  const errorAlert = document.getElementById("errorAlert");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          successAlert.textContent = data.message;
          successAlert.classList.remove("d-none");
          successAlert.classList.add("alert-success");
          errorAlert.classList.add("d-none");

          // Hide the success alert after 5 seconds
          setTimeout(() => {
            successAlert.classList.add("d-none");
            // Reset the form after submission
            form.reset();
          }, 5000);
        } else {
          errorAlert.textContent = data.message;
          errorAlert.classList.remove("d-none");
          errorAlert.classList.add("alert-danger");
          successAlert.classList.add("d-none");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorAlert.textContent = "An unexpected error occurred.";
        errorAlert.classList.remove("d-none");
        errorAlert.classList.add("alert-danger");
        successAlert.classList.add("d-none");
      });
  });
});
