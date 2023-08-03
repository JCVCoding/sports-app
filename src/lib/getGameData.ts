import clientPromise from './mongodb';
import { getTeamDataByName, teamData } from './getTeamData';
import { collectionName, dbName } from './getTeamData';

export interface gameData {
  Date: string;
  Start: string;
  Visitor: string;
  PTS_Away: number;
  Home: string;
  PTS_Home: number;
  HomeTeamInfo: teamData;
  AwayTeamInfo: teamData;
}

export const getGameData = async (
  dbName: dbName,
  collectionName: collectionName,
  teamName: string
) => {
  const client = await clientPromise;
  const db = client.db(dbName);
  try {
    let data = await db
      .collection('2023_Season')
      .aggregate<gameData>([
        {
          $lookup: {
            from: 'NBA_Teams',
            localField: 'Home',
            foreignField: 'team_name',
            as: 'HomeTeamInfo',
          },
        },
        {
          $lookup: {
            from: 'NBA_Teams',
            localField: 'Visitor',
            foreignField: 'team_name',
            as: 'AwayTeamInfo',
          },
        },
        { $unwind: '$HomeTeamInfo' },
        { $unwind: '$AwayTeamInfo' },
      ])
      .toArray();
    return data;
  } catch (error) {
    console.log(error);
  }
};
