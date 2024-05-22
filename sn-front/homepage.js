async function displayPosts() {
  let container = document.querySelector(".container");
  // retrieve id from followed user
  // api call followed users
  let followerId = window.localStorage.getItem("follower_id");

  container.innerHTML = "";

  let apiRequest = await fetch(
    `http://localhost:3045/post/postsbyfollowed/${followerId}`
  );
  let response = await apiRequest.json();
  let posts = Array.from(response);
  console.log(response);
  console.log(posts);

  posts.forEach((element) => {
    container.innerHTML += `<div class="container mx-auto border-2 border-black rounded-md m-4 p-4 w-64"><p>${element.post_content}</p><p>${element.post_comment}</p><button class="follow">Follow</button></div>`;
  });
}

displayPosts();
