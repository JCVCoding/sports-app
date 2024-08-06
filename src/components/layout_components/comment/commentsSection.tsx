"use client";

import CommentHeader from "./commentHeader";
import CommentThread from "./commentThread";

import { getComments, setLeague, setUUID } from "./commentSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

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
  useEffect(() => {
    dispatch(getComments(uuid));
  });

  return (
    <>
      <CommentHeader />
      <CommentThread />
    </>
  );
};

export default CommentsSection;
