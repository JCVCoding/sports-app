import Comment from './comment';
import CommentReplies from './commentReplies';

const CommentThread = () => {
  return (
    <>
      <Comment
        author='Josh'
        avatar='Josh'
        text='This is a test comment'
        timestamp='Today at 8:30pm'
        voteCount={3}
      />
      <CommentReplies />
    </>
  );
};

export default CommentThread;
