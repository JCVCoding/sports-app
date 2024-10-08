import Image from "next/image";
import ContentCard from "@/components/layout_components/contentCard";

import { ArticleData } from "@/lib/getAPIArticleData";
import { getAPIData } from "@/lib/getArticleData";

import { collectionName } from "@/lib/getArticleData";

async function getData(collectionName: collectionName) {
  try {
    const apiData = await getAPIData(collectionName);
    return [apiData];
  } catch (e) {
    console.error(e);
  }
}

export default async function ArticlePages({
  collectionName,
  league,
}: {
  collectionName: collectionName;
  league: string;
}) {
  const data = await getData(collectionName);
  const apiData = data![0];

  return (
    <>
      <h1 className="hidden">{`${league.toUpperCase()}`} Articles</h1>
      <section>
        <div className="flex flex-col items-center gap-y-3 mt-4">
          <Image
            src={
              league.toLowerCase() !== "nfl"
                ? `https://cdn.bleacherreport.net/images/team_logos/328x328/${league.toLowerCase()}.png`
                : "/images/NFL-Logo-PNG-Photo.png"
            }
            alt={`${league} logo`}
            width={80}
            height={80}
          ></Image>
          <h2 className="text-5xl font-bold text-center mb-4">{league}</h2>
        </div>
        <ol>
          <li className="my-8 mx-auto flex flex-col items-center">
            {apiData?.map(
              ({
                uuid,
                description,
                image_url,
                source,
                title,
                image_alt,
              }: ArticleData) => (
                <ContentCard
                  key={uuid}
                  description={description}
                  image_url={image_url}
                  source={source}
                  title={title}
                  league={league}
                  article_id={uuid}
                  image_alt={image_alt}
                />
              )
            )}
          </li>
        </ol>
      </section>
    </>
  );
}
