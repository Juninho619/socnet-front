async function displayPosts() {
  let container = document.querySelector(".container");
  // retrieve id from followed user
  // api call followed users
  let followerId = window.localStorage.getItem("follower_id");

  container.innerHTML = "";

  // add font awesome thumbs up and down
  // display how many of each

  let apiRequest = await fetch(
    `http://localhost:3045/post/postsbyfollowed/${followerId}`
  );
  let response = await apiRequest.json();
  let posts = Array.from(response);
  console.log(response);
  console.log(posts);

  posts.forEach((element) => {
    container.innerHTML += `<div class="container mx-auto border-2 border-black rounded-md m-4 p-4 w-94"><p>${element.post_content}</p><p inline>${element.comment}</p><button class="comment bg-sky-500 hover:bg-sky-700 rounded-full" id="${element._id}">Comment</button><div class="comment-area"></div><div class="thumbs-icons"><i class="like-button fa fa-thin fa-thumbs-up"></i><p>${element.post_like}</p><i class="fa fa-thin fa-thumbs-down"></i><p>${element.post_dislike}</div></div>`;
    let commentArea = document.querySelector(".comment-area");
    let commentButton = document.querySelector(".comment");
    let commentId = element._id;
    let likeButton = document.querySelector(".fa-thumbs-up");
    let dislikeButton = document.querySelector(".fa-thumbs-down");
    let postId = element._id;

    likeButton.addEventListener("click", async () => {
      let likeRequest = {
        id: postId,
      };

      let postLike = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(likeRequest),
      };
      let publishComment = await fetch(
        "http://localhost:3045/post/like",
        postLike
      );
      let response = await publishComment.json();
    });

    dislikeButton.addEventListener("click", async () => {
      let disLikeRequest = {
        id: postId,
      };

      let postDislike = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(disLikeRequest),
      };
      let publishComment = await fetch(
        "http://localhost:3045/post/dislike",
        postDislike
      );
      let response = await publishComment.json();
    });

    commentButton.addEventListener("click", async () => {
      commentArea.innerHTML = "";
      commentArea.innerHTML += `
<textarea id="message" rows="4" class="comment-input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your comment here..."></textarea>
<button class="publish-comment-button rounded-full bg-black text-white">Publish comment</button>`;
      let publishCommentButton = document.querySelector(
        ".publish-comment-button"
      );
      let commentInput = document.querySelector(".comment-input");
      publishCommentButton.addEventListener("click", async () => {
        let commentRequest = {
          id: commentId,
          comment: commentInput.value,
        };

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

// async function suggestUsers() {}

displayPosts();
