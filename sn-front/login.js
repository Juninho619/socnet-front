const submitButtonLogin = document.querySelector(".submit-login");

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("missing credentials");
    return;
  }

  let loginCredentials = {
    email: email,
    password: password,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(loginCredentials),
  };
  let apiRequest = await fetch("http://localhost:3045/login", request);
  let response = await apiRequest.json();

  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("jwt", data);
  }
  document.location.href = "homepage.html";
}

submitButtonLogin.addEventListener("click", login);
