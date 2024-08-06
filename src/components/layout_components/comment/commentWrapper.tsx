"use client";

import CommentsSection from "./commentsSection";
import StoreProvider from "@/app/StoreProvider";

const CommentsWrapper = ({
  params,
  league,
}: {
  params: { uuid: string };
  league: string;
}) => {
  return (
    <StoreProvider>
      <CommentsSection uuid={params.uuid} league={league} />
    </StoreProvider>
  );
};

export default CommentsWrapper;
