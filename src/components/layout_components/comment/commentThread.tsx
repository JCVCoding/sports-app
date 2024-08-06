import Comment from "./comment";
import CommentReplies from "./commentReplies";
import { useAppSelector } from "@/lib/hooks";
const CommentThread = () => {
  const { comments, league, uuid } = useAppSelector(
    (state) => state.commentReducer
  );

  return (
    <div>
      {comments.map((comment) => {
        let publishedAt = new Date(comment.publishedAt).toTimeString();
        let updatedAt = new Date(comment.updatedAt).toTimeString();
        return (
          <div key={comment.id}>
            <Comment
              author={comment.author!}
              avatar=""
              text={comment.text}
              timestamp={!updatedAt ? publishedAt : updatedAt}
              likeCount={comment.likeCount}
              dislikeCount={comment.dislikeCount}
              id={comment.id}
              league={league}
              uuid={uuid}
              authorEmail={comment.authorEmail}
              dislikedUsers={comment.dislikedUsers}
              likedUsers={comment.likedUsers}
              isReply={false}
            />
            {comment.reply.length > 0 && (
              <CommentReplies replies={comment.reply} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentThread;
