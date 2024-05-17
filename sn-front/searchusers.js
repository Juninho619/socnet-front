async function showAllUsers() {
  let container = document.querySelector(".container");
  container.innerHTML = "";

  let apiRequest = await fetch("http://localhost:3045/displayusers");
  let response = await apiRequest.json();
  let users = Array.from(response);
  console.log(users);
  console.log(response);

  users.forEach((element) => {
    container.innerHTML += `<div class="container mx-auto border-gray-500 rounded-md m-4 p-4"<img src="${element.user_profile}"/><h2>${element.username}</h2><p>${element.user_email}</p><p>${element.first_name}</p><p>${element.last_name}<button class="follow border-1 border-black bg-blue-400 text-white ml-2 rounded-md p-2"">Follow</button></div>`;
  });
}

showAllUsers();