const submitButton = document.querySelector(".submit");

async function setNewPassword() {
  const newPasswordInput = document.getElementById("password").value;
  const confirmNewPasswordInput =
    document.getElementById("confirm-password").value;
  const emailInput = document.getElementById("email").value;

  if (!newPasswordInput || !confirmNewPasswordInput || !emailInput)
    return false;

  if (!newPasswordInput == confirmNewPasswordInput) return false;

  if (newPasswordInput == confirmNewPasswordInput) {
    const newPassword = newPasswordInput;
    let object = {
      email: emailInput,
      newPassword: newPassword,
    };
    console.log(object);

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(object),
    };
    console.log(request);
    let apiRequest = await fetch(
      "http://localhost:3045//passwordreset",
      request
    );
    let response = await apiRequest.json();
    console.log(response);

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
    }
    window.location.href = "./login.html";
  }
}

submitButton.addEventListener("click", setNewPassword);
