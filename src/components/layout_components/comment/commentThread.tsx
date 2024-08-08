import Comment from "./comment";
import CommentReplies from "./commentReplies";
import { useAppSelector } from "@/lib/hooks";
import { CommentDataType } from "./commentTypes";
const CommentThread = ({ comments }: { comments: CommentDataType[] }) => {
  const { league, uuid } = useAppSelector((state) => state.commentReducer);
  return comments.map((comment) => (
    <div key={comment.id}>
      <Comment
        author={comment.author!}
        avatar={comment.avatar}
        text={comment.text}
        timestamp={!comment.updatedAt ? comment.publishedAt : comment.updatedAt}
        likeCount={comment.likeCount}
        dislikeCount={comment.dislikeCount}
        id={comment.id}
        league={league}
        uuid={uuid}
        authorEmail={comment.authorEmail}
        dislikedUsers={comment.dislikedUsers}
        likedUsers={comment.likedUsers}
        isReply={false}
        isEdited={comment.updatedAt !== null}
      />
      {comment.replies && <CommentReplies replies={comment.replies} />}
    </div>
  ));
};

export default CommentThread;
