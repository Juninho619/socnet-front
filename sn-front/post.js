const submitPostButton = document.querySelector(".submit-button");

async function publishNewPost() {
  const userId = window.localStorage.getItem("user-id");
  const postInput = document.getElementById("text").value;

  let newPost = {
    post: postInput,
    userId: userId,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(newPost),
  };

  let apiRequest = await fetch("http://localhost:3045/post/newpost", request);
  let response = await apiRequest.json();

  if (response.status === 200) {
    const data = await response.json();
    window.location.href = "./homepage.html";
  }
}

submitPostButton.addEventListener("click", publishNewPost);
