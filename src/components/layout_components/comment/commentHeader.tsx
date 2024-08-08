import CommentBox from "./commentBox";

const CommentHeader = () => {
  return (
    <div className="flex flex-col my-8 gap-y-4">
      <div>
        <CommentBox />
      </div>
    </div>
  );
};

export default CommentHeader;
