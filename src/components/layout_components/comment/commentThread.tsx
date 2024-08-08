import Comment from "./comment";
import CommentReplies from "./commentReplies";
import { useAppSelector } from "@/lib/hooks";
import { useGetCommentsQuery } from "./commentSlice";
import LoadingSpinner from "@/components/loading/loading";
const CommentThread = () => {
  const { league, uuid } = useAppSelector((state) => state.commentReducer);

  const { data, isLoading } = useGetCommentsQuery(uuid);
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
                avatar={comment.avatar}
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
                isEdited={comment.updatedAt !== null}
              />
              {comment.replies && <CommentReplies replies={comment.replies} />}
            </div>
          );
        })
      )}
    </div>
  );
};

export default CommentThread;
