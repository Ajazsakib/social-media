// method to submit the comemnt data for a post using ajax

let createComment = function () {
  let newCommentForm = $('#new-comment-form');

  newCommentForm.submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/comments/create',
      data: newCommentForm.serialize(),
      success: function (data) {
        console.log(data);
        let newPost = newPostDom(data.data.comment);
        $('.post-comments-list>ul').append(newPost);
      },
      error: function (error) {
        console.log(error.responsetext);
      },
    });
  });
};

createComment();

// method to create a post in DOM

let newPostDom = function (post) {
  return $(`<li>
    <div style="display: flex; justify-content: space-between; margin: 10px 0">
      <div>
        <div class="username">${comment.user.name}</div>
        <div class="content">${comment.content}</div>
      </div>
     ${
       locals.user &&
       locals.user.id == comment.user.id && (
         <small>
           <a href="/comments/destroy/<%= comment.id%>">Delete Comment</a>
         </small>
       )
     }
    </div>
  </li>
  `);
};
