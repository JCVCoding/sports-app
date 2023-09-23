import { ArticleData, createTodaysDate } from './getAPIArticleData';
import clientPromise from './mongodb';

type collectionName =
  | 'NBA_Articles'
  | 'NFL_Articles'
  | 'NHL_Articles'
  | 'MLB_Articles'
  | 'Top_Stories';

export const getAPIData = async (collectionName: collectionName) => {
  const client = await clientPromise;
  const db = client.db('ArticleData');
  const backupData = await db
    .collection<ArticleData>(collectionName)
    .find({ published_at: { $lt: createTodaysDate() } })
    .sort({ 'published_at': -1 })
    .limit(5)
    .toArray();
  return backupData;
};

export const getAIGeneratedData = async (collectionName: collectionName) => {
  const client = await clientPromise;
  const db = client.db('ArticleData');
  const backupData = await db
    .collection(collectionName)
    .find({ ai_generated: true })
    .sort({ 'ai_generated': -1 })
    .limit(5)
    .toArray();
  return backupData;
};

export const getArticleById = async (
  id: string,
  collectionName: collectionName
) => {
  const client = await clientPromise;
  const db = client.db('ArticleData');
  const articleData = await db
    .collection<ArticleData>(collectionName)
    .find({ uuid: id })
    .toArray();
  return articleData;
};
