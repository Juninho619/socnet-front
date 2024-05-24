const submitButton = document.querySelector(".submit");

async function setNewPassword() {
  const newPasswordInput = document.getElementById("password").value;
  const confirmNewPasswordInput =
    document.getElementById("confirm-password").value;

  if (!newPasswordInput || !confirmNewPasswordInput) return false;

  if (!newPasswordInput == confirmNewPasswordInput) return false;

  if (newPasswordInput == confirmNewPasswordInput) {
    const newPassword = newPasswordInput;
    let object = {
      email: newPassword,
    };
    console.log(object);

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(object),
    };
    let apiRequest = await fetch(
      "http://localhost:3045//passwordreset",
      request
    );
    let response = await apiRequest.json();

    if (response.status === 200) {
      const data = await response.json();
    }
  }
}

submitButton.addEventListener("click", setNewPassword);
