const searchUsernameButton = document.querySelector(".username-search-button");
const emailButton = document.querySelector(".email-search-button");
const deleteButton = document.querySelector(".delete");

window.localStorage.setItem("token", token);
const token = localStorage.getItem(token);
async function showAllUsers() {
  let container = document.querySelector(".container");
  container.innerHTML = "";

  let apiRequest = await fetch("http://localhost:3045/displayusers");
  let response = await apiRequest.json();
  let users = Array.from(response);

  users.forEach((element) => {
    let id = element.user_id;
    container.innerHTML += `<div class="container mx-auto ss='border-4 border-zinc rounded-md m-4 p-4"><h2>${element.username}</h2><p>${element.user_email}</p><p>${element.first_name}</p><p>${element.last_name}<button onclick="deleteUser(${id})" class="delete">Delete</button></div>`;
  });
}

async function searchuser() {
  let container = document.querySelector(".container");
  const usernameSearch = document.getElementById("search-input-username").value;
  const emailSearch = document.getElementById("search-input-email").value;

  container.innerHTML = "";

  if (usernameSearch) {
    let searchUsername = {
      username: usernameSearch,
    };

    let searchUsernameRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(searchUsername),
    };
    console.log(searchUsername);
    let apiCall = await fetch(
      "http://localhost:3045/searchuser",
      searchUsernameRequest
    );
    let response = await apiCall.json();
    let foundUsers = Array.from(response);

    foundUsers.forEach((element) => {
      container.innerHTML += `<h2>${element.username}</h2><p>${element.email}</p><p>${element.first_name}</p><p>${element.last_name}<button onclick="deleteUser(element.user_id)" class="delete">Delete</button>`;
    });
  }

  if (emailSearch) {
    let searchEmail = {
      username: emailSearch,
    };

    let searchEmailRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(searchEmail),
    };

    let apiCall = await fetch(
      "http://localhost:3045/searchuser",
      searchEmailRequest
    );
    let response = await apiCall.json();
    const foundUsers = Array.from(response);

    foundUsers.forEach((element) => {
      container.innerHTML += `<h2>${element.username}</h2><p>${element.email}</p><p>${element.first_name}</p><p>${element.last_name}<button onclick="deleteUser(element.user_id" class="delete">Delete</button>`;
    });
  }
}

showAllUsers();

async function deleteUser(userId) {
  let userToBeDeleted = {
    id: userId,
  };

  let deleteRequest = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(userToBeDeleted),
  };

  let apiRequest = await fetch(
    "http://localhost:3045/deleteuser",
    deleteRequest
  );
  // let response = await apiRequest.json;
  // deleteButton.innerHTML = response;
}

async function showAllPosts() {
  let container1 = document.querySelector(".container1");
  container1.innerHTML = "";

  let apiRequest = await fetch("http://localhost:3045/post/allposts");
  let response = await apiRequest.json();
  let posts = Array.from(response);

  posts.forEach((element) => {
    let id = element.user_id;
    container1.innerHTML += `<div class="container mx-auto ss='border-4 border-zinc rounded-md m-4 p-4"><p>${element.post_content}</p><p>${element.post_comment}</p></div>`;
  });
}

showAllPosts();

searchUsernameButton.addEventListener("click", searchuser);
emailButton.addEventListener("click", searchuser);
