import Comment from "./comment";
import CommentReplies from "./commentReplies";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getComments, setLeague, setUUID } from "./commentSlice";
import { useEffect } from "react";
const CommentThread = ({ league, uuid }: { league: string; uuid: string }) => {
  const dispatch = useAppDispatch();
  dispatch(setUUID(uuid));
  dispatch(setLeague(league));

  useEffect(() => {
    dispatch(getComments(uuid));
  }, [uuid, dispatch]);

  const comments = useAppSelector((state) => state.commentReducer.comments);

  if (comments) {
    return comments?.map((comment) => {
      const {
        author,
        dislikeCount,
        likeCount,
        text,
        authorEmail,
        id,
        dislikedUsers,
        likedUsers,
      } = comment;
      let { publishedAt, updatedAt } = comment;
      publishedAt = new Date(publishedAt).toTimeString();
      updatedAt = new Date(updatedAt).toTimeString();
      return (
        <div key={id}>
          <Comment
            author={author}
            avatar=""
            text={text}
            timestamp={!updatedAt ? publishedAt : updatedAt}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            id={id}
            league={league}
            uuid={uuid}
            authorEmail={authorEmail}
            dislikedUsers={dislikedUsers}
            likedUsers={likedUsers}
            isReply={false}
          />
          {comment.reply.length > 0 && (
            <CommentReplies replies={comment.reply} />
          )}
        </div>
      );
    });
  }
};

export default CommentThread;
