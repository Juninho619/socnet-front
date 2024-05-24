const searchUsernameButton = document.querySelector(".username-search-button");
const emailButton = document.querySelector(".email-search-button");

async function showAllUsers() {
  let container = document.querySelector(".container");
  container.innerHTML = "";

  let apiRequest = await fetch("http://localhost:3045/displayusers");
  let response = await apiRequest.json();
  let users = Array.from(response);
  console.log(users);
  console.log(response);

  // follow function
  // select button
  // implement search here as well

  users.forEach((element) => {
    container.innerHTML += `<div class="container mx-auto border-gray-500 rounded-md m-4 p-4"><img class="image border-red border-2" src="../../socnet-back//sn-back/src/uploads/${element.profile}" width="200" height="100"/><h2>${element.username}</h2><p>${element.user_email}</p><p>${element.first_name}</p><p>${element.last_name}<button id="${element.user_id}" class="follow-button border-1 border-black bg-blue-400 text-white ml-2 rounded-md p-2">Follow</button></div>`;
    const followButton = document.querySelector(".follow-button");
    followButton.addEventListener("click", followUser(element.user_id));
    const image = document.querySelector("image");
    console.log(image);
  });
}
async function followUser(userId) {
  window.localStorage.setItem("follower-id", 4);
  let followerId = window.localStorage.getItem("follower-id");
  let followRequest = {
    followerId: followerId,
    followedId: userId,
  };

  let followUser = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(followRequest),
  };
  let publishComment = await fetch("http://localhost:3045/follow", followUser);
  let response = await publishComment.json();
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
      container.innerHTML += `<h2>${element.username}</h2><p>${element.email}</p><p>${element.first_name}</p><p>${element.last_name}<button onclick="followUser(element.user_id)" class="follow border-1 border-black bg-blue-400 text-white ml-2 rounded-md p-2">Follow</button>`;
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
      container.innerHTML += `<h2>${element.username}</h2><p>${element.email}</p><p>${element.first_name}</p><p>${element.last_name}<button onclick="followUser(element.user_id)" class="follow  border-1 border-black bg-blue-400 text-white ml-2 rounded-md p-2">Follow</button>`;
    });
  }
}

showAllUsers();
searchUsernameButton.addEventListener("click", searchuser);
emailButton.addEventListener("click", searchuser);
