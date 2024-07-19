"use client";
import CommentHeader from "./commentHeader";
import CommentThread from "./commentThread";
import { useEffect, useState } from "react";

export type CommentDataType = {
  id: string;
  author: string;
  text: string;
  likeCount: number;
  dislikeCount: number;
  publishedAt: string;
  updatedAt: string;
  parentId: string;
  Reply: CommentDataType[];
};

type CommentThread = {
  data: CommentDataType[];
};

const CommentsSection = ({
  params,
  league,
}: {
  params: { uuid: string };
  league: string;
}) => {
  const [data, setData] = useState<CommentDataType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const commentData = await fetch(
        `https://wealthy-pug-54.hasura.app/api/rest/comment_thread/?uuid=${params.uuid}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": `${process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET}`,
          },
        }
      );
      const data: CommentThread | null = await commentData.json();
      setData(Object.values(data!)[0]);
    };
    fetchData();
  }, [params.uuid, league]);

  if (data) {
    return (
      <>
        <CommentHeader numOfComments={data.length} />
        <CommentThread comments={data} league={league} uuid={params.uuid} />
      </>
    );
  }
};

export default CommentsSection;
