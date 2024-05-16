const submitButton = document.querySelector(".submit");

async function newProfilePic() {
  const newPic = document.getElementById("profile-pic");

  let newPicrequest = {
    user_profile: newPic,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(newPicrequest),
  };
  console.log(newPicrequest);

  let apiRequest = await fetch("http://localhost:3045/profile", request);
  let response = await apiRequest.json();
  console.log(response);
  if (response.status === 200) {
    const data = await response.json();
    window.location.href = "./login.html";
    console.log("Ok");
  }
}

submitButton.addEventListener("click", newProfilePic);
