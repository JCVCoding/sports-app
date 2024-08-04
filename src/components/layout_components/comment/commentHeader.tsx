import CommentBox from "./commentBox";

const CommentHeader = () => {
  // const getRepliesCount = (comments) => {
  //   let numOfCommentReplies = 0;
  //   if (comments) {
  //     comments.data.forEach((comment) => {
  //       numOfCommentReplies += comment.reply.length;
  //     });
  //   }
  //   return numOfCommentReplies;
  // };
  return (
    <div className="flex flex-col my-8 gap-y-4">
      <div>
        {/* {comments ? comments.data.length + getRepliesCount(comments) : ""}{" "} */}
        Comments
      </div>
      <div>
        <CommentBox />
      </div>
    </div>
  );
};

export default CommentHeader;
