import Comment, { commentProps } from './comment';
import CommentReplies from './commentReplies';

const CommentThread = ({ commentData }: { commentData: commentProps }) => {
  let { author, avatar, text, timestamp, voteCount, replies } = commentData;
  return (
    <>
      <Comment
        author={author}
        avatar={avatar}
        text={text}
        timestamp={timestamp}
        voteCount={voteCount}
      />
      <CommentReplies replies={replies} />
    </>
  );
};

export default CommentThread;
