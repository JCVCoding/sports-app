export type CommentDataType = {
  id?: string;
  author?: string | null | undefined;
  text?: string;
  likeCount?: number;
  dislikeCount?: number;
  publishedAt?: string;
  updatedAt?: string | null;
  parentId?: string | null;
  authorEmail?: string | null | undefined;
  reply?: CommentDataType[];
  dislikedUsers?: string[];
  likedUsers?: string[];
  uuid?: string;
};

export type CommentThreadType = {
  data: CommentDataType[];
};
