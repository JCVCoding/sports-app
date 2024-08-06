"use client";

import CommentHeader from "./commentHeader";
import CommentThread from "./commentThread";

import { setLeague, setUUID } from "./commentSlice";
import { useAppDispatch } from "@/lib/hooks";

const CommentsSection = ({
  uuid,
  league,
}: {
  uuid: string;
  league: string;
}) => {
  const dispatch = useAppDispatch();
  dispatch(setUUID(uuid));
  dispatch(setLeague(league));

  return (
    <>
      <CommentHeader />
      <CommentThread />
    </>
  );
};

export default CommentsSection;
