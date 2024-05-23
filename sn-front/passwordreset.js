const resetButton = document.querySelector(".reset-login");

async function resetPassword() {
  const emailInput = document.getElementById("email").value;
  let object = {
    email: emailInput,
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
    "http://localhost:3045/resetpasswordrequest",
    request
  );
  let response = await apiRequest.json();

  if (response.status === 200) {
    const data = await response.json();
  }
}
resetButton.addEventListener("click", resetPassword);
