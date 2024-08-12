import clientPromise from "./mongodb";
import { teamData } from "./getTeamData";
import { dbName } from "./getTeamData";

export interface gameData {
  _id: any;
  Date: string;
  Start: string;
  Visitor: string;
  PTS_Away: number;
  Home: string;
  PTS_Home: number;
  HomeTeamInfo: teamData;
  AwayTeamInfo: teamData;
}

export const getGameData = async (dbName: dbName) => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const mlbData = () => {
    let data = db
      .collection("2023_Season")
      .aggregate<gameData>([
        {
          $lookup: {
            from: "Teams",
            localField: "Home",
            foreignField: "team_abbreviation",
            as: "HomeTeamInfo",
          },
        },
        {
          $lookup: {
            from: "Teams",
            localField: "Visitor",
            foreignField: "team_abbreviation",
            as: "AwayTeamInfo",
          },
        },
        { $sort: { Date: 1 } },
        { $unwind: "$HomeTeamInfo" },
        { $unwind: "$AwayTeamInfo" },
        { $limit: 10 },
      ])
      .toArray();
    return data;
  };
  try {
    if (dbName === "MLB_Data") {
      let data = await mlbData();
      return data;
    } else {
      let data = await db
        .collection("2023_Season")
        .aggregate<gameData>([
          {
            $lookup: {
              from: "Teams",
              localField: "Home",
              foreignField: "team_name",
              as: "HomeTeamInfo",
            },
          },
          {
            $lookup: {
              from: "Teams",
              localField: "Visitor",
              foreignField: "team_name",
              as: "AwayTeamInfo",
            },
          },
          {
            $addFields: {
              Date: {
                $toDate: "$Date",
              },
            },
          },
          { $sort: { Date: 1 } },
          { $unwind: "$HomeTeamInfo" },
          { $unwind: "$AwayTeamInfo" },
        ])
        .limit(20)
        .toArray();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
