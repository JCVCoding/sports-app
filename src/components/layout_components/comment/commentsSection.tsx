"use client";

import CommentHeader from "./commentHeader";
import CommentThread from "./commentThread";

import { setLeague, setUUID, useGetCommentsQuery } from "./commentSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { CommentDataType } from "./commentTypes";
import LoadingSpinner from "@/components/loading/loading";

const CommentsSection = ({
  uuid,
  league,
}: {
  uuid: string;
  league: string;
}) => {
  const dispatch = useAppDispatch();
  const { data } = useSession();
  const {
    data: comments = {},
    isLoading,
    isSuccess,
  } = useGetCommentsQuery(uuid);
  dispatch(setUUID(uuid));
  dispatch(setLeague(league));
  let commentsArray: CommentDataType[] = [];

  const getRepliesCount = (
    comments: CommentDataType[],
    arrayLength: number
  ) => {
    let numOfCommentReplies = 0;
    if (comments) {
      comments.forEach((comment) => {
        numOfCommentReplies += comment.replies.length;
      });
    }
    return numOfCommentReplies + arrayLength;
  };

  const getComments = () => {
    return Object.values(comments)[0] as CommentDataType[];
  };

  if (isLoading) return <LoadingSpinner />;

  if (isSuccess) {
    commentsArray = getComments();
    return (
      <>
        {getRepliesCount(commentsArray, commentsArray.length) + " Comments"}
        {data?.user && <CommentHeader />}
        <CommentThread comments={commentsArray} />
      </>
    );
  }
};

export default CommentsSection;
