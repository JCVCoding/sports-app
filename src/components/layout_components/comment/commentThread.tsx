import Comment from "./comment";
import CommentReplies from "./commentReplies";
import { CommentDataType } from "./commentsSection";

const CommentThread = ({
  comments,
  league,
  uuid,
}: {
  comments: CommentDataType[] | null;
  league: string;
  uuid: string;
}) => {
  return comments?.map((comment) => {
    const { author, dislikeCount, likeCount, text, parentId, id } = comment;
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
        />
        <CommentReplies replies={comment.Reply} league={league} uuid={uuid} />
      </div>
    );
  });
};

export default CommentThread;
