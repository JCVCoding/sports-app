"use client";

import CommentHeader from "./commentHeader";
import CommentThread from "./commentThread";
import StoreProvider from "@/app/StoreProvider";

const CommentsSection = ({
  params,
  league,
}: {
  params: { uuid: string };
  league: string;
}) => {
  return (
    <StoreProvider>
      <CommentHeader />
      <CommentThread league={league} uuid={params.uuid} />
    </StoreProvider>
  );
};

export default CommentsSection;
