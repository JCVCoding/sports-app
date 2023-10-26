import CommentHeader from './commentHeader';
import CommentThread from './commentThread';

import { commentProps } from './comment';

const CommentsSection = () => {
  let sampleComments: commentProps[] = [
    {
      author: 'Josh',
      avatar: '/next.svg',
      text: 'This is a sample comment!',
      timestamp: 'Today at 9:15pm',
      voteCount: 3,
      replies: [
        {
          author: 'Bob',
          avatar: '/next.svg',
          text: 'This is a sample reply!',
          timestamp: 'Today at 10:21pm',
          voteCount: 3,
        },
      ],
    },
    {
      author: 'Josh',
      avatar: '/next.svg',
      text: 'This is a sample comment!',
      timestamp: 'Today at 9:57pm',
      voteCount: 3,
    },
  ];
  return (
    <>
      <CommentHeader />
      {sampleComments.map((val, index) => (
        <CommentThread commentData={val} key={index} />
      ))}
    </>
  );
};

export default CommentsSection;
