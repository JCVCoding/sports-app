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
  replies?: CommentDataType[];
  dislikedUsers?: string[];
  likedUsers?: string[];
  uuid?: string;
  avatar?: string | null;
};

export type CommentThreadType = {
  data: CommentDataType[];
};
