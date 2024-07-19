import CommentBox from "./commentBox";

const CommentHeader = ({ numOfComments }: { numOfComments: number }) => {
  return (
    <div className="flex flex-col my-8 gap-y-4">
      <div>{numOfComments} Comments</div>
      <div>
        <CommentBox />
      </div>
    </div>
  );
};

export default CommentHeader;
