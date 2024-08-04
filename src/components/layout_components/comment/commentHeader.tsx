import { useAppSelector } from "@/lib/hooks";
import CommentBox from "./commentBox";
import { CommentDataType } from "./commentTypes";

const CommentHeader = () => {
  const comments = useAppSelector((state) => state.commentReducer.comments);
  const getRepliesCount = (comments: CommentDataType[]) => {
    let numOfCommentReplies = 0;
    if (comments) {
      comments.forEach((comment) => {
        numOfCommentReplies += comment.reply.length;
      });
    }
    return numOfCommentReplies;
  };
  return (
    <div className="flex flex-col my-8 gap-y-4">
      <div>
        {comments ? comments.length + getRepliesCount(comments) : ""} Comments
      </div>
      <div>
        <CommentBox />
      </div>
    </div>
  );
};

export default CommentHeader;
