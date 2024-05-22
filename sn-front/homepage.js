async function displayPosts() {
  let container = document.querySelector(".container");
  // retrieve id from followed user
  // api call followed users
  let followerId = window.localStorage.getItem("follower_id");

  // comment id not posterid you dumbfuck

  container.innerHTML = "";

  let apiRequest = await fetch(
    `http://localhost:3045/post/postsbyfollowed/${followerId}`
  );
  let response = await apiRequest.json();
  let posts = Array.from(response);
  console.log(response);
  console.log(posts);

  posts.forEach((element) => {
    container.innerHTML += `<div class="container mx-auto border-2 border-black rounded-md m-4 p-4 w-64"><p>${element.post_content}</p><p>${element.post_comment}</p><button class="comment">Comment</button><div class="comment-area"></div></div>`;
    let commentArea = document.querySelector(".comment-area");
    let commentButton = document.querySelector(".comment");
    let commentId = element._id;

    commentButton.addEventListener("click", async () => {
      commentArea.innerHTML = "";
      commentArea.innerHTML += `
<textarea id="message" rows="4" class="comment-input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your comment here..."></textarea>
<button class="publish-comment-button">Publish comment</button>`;
      let publishCommentButton = document.querySelector(
        ".publish-comment-button"
      );
      let commentInput = document.querySelector(".comment-input").value;
      publishCommentButton.addEventListener("click", async () => {
        let commentRequest = {
          id: commentId,
          comment: commentInput,
        };
        console.log(commentInput);

        let postComment = {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(commentRequest),
        };
        let publishComment = await fetch(
          "http://localhost:3045/post/comment",
          postComment
        );
        let response = await publishComment.json();

        if (response.status === 200) {
          commentArea.innerHTML = `<p>comment published</p>`;
        }
      });
    });
  });
}

// let commentArea = document.querySelector(".comment-area");

// commentArea.addEventListener("click", async () => {
//   commentArea.innerHTML += `
// <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
// <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your comment here..."></textarea>
// `;
// });

displayPosts();
