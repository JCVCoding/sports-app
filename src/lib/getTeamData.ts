import clientPromise from './mongodb';

type collectionName = 'NBA_Teams' | 'NFL_Teams' | 'NHL_Teams' | 'MLB_Teams';

export interface teamData {
  team_id: number;
  team_name: string;
  conference: string;
  logo_url: string;
  team_abbreviation: string;
}

export const getTeamDataByName = async (
  collectionName: collectionName,
  teamName: string
) => {
  const client = await clientPromise;
  const db = client.db('TeamsData');
  try {
    const data = await db
      .collection<teamData>(collectionName)
      .find({ team_name: teamName })
      .toArray();
    return data;
  } catch (error) {
    console.log(error);
  }
};
