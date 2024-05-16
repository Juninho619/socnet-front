const submitButton = document.querySelector(".submit");

async function register() {
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const profilePic = document.getElementById("profile-pic").value;
  const password = document.getElementById("password").value;

  if (!firstName || !lastName || !username || !email || !password) {
    return;
  }

  let user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    profilePic: profilePic,
    password: password,
    username: username,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  };
  console.log(user);

  let apiRequest = await fetch("http://localhost:3045/register", request);
  let response = await apiRequest.json();
  console.log(response);
  if (response.status === 200) {
    const data = await response.json();
    window.location.href = "./login.html";
    alert("Hello!");
  }
}

submitButton.addEventListener("click", register);
