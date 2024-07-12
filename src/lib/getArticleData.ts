import { ArticleData } from "./getAPIArticleData";
import clientPromise from "./mongodb";

export type collectionName =
  | "NBA_Articles"
  | "NFL_Articles"
  | "NHL_Articles"
  | "MLB_Articles"
  | "Top_Stories";

export const getAPIData = async (collectionName: collectionName) => {
  const client = await clientPromise;
  const db = client.db("ArticleData");
  const backupData = await db
    .collection<ArticleData>(collectionName)
    .find()
    .toArray();
  return backupData;
};

export const getArticleById = async (
  id: string,
  collectionName: collectionName
) => {
  const client = await clientPromise;
  const db = client.db("ArticleData");
  const articleData = await db
    .collection<ArticleData>(collectionName)
    .find({ uuid: id })
    .toArray();
  return articleData;
};
