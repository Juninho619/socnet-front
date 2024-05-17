async function displayPosts() {
  let container = document.querySelector(".container");
  // retrieve id from followed user
  localStorage.getItem(jwt);

  container.innerHTML = "";

  let apiRequest = await fetch(`http://localhost:3045/post/postsbyfollowed/25`);
  let response = await apiRequest.json();
  let posts = Array.from(response);

  posts.forEach((element) => {
    container.innerHTML += `<div class="container mx-auto ss='border-4 border-zinc rounded-md m-4 p-4"><p>${element.post_content}</p><p>${element.post_user_id}</p><button class="follow">Follow</button></div>`;
  });
}

displayPosts();
