import Comment from "./comment";
import CommentReplies from "./commentReplies";
import { useAppSelector } from "@/lib/hooks";
import { useGetCommentsQuery } from "./commentSlice";
import LoadingSpinner from "@/components/loading/loading";
const CommentThread = () => {
  const { league, uuid } = useAppSelector((state) => state.commentReducer);

  const { data, isLoading } = useGetCommentsQuery(uuid);
  if (data) console.log(Object.values(data)[0]);
  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        Object.values(data)[0].map((comment) => {
          return (
            <div key={comment.id}>
              <Comment
                author={comment.author!}
                avatar=""
                text={comment.text}
                timestamp={
                  !comment.updatedAt ? comment.publishedAt : comment.updatedAt
                }
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
        })
      )}
    </div>
  );
};

export default CommentThread;
