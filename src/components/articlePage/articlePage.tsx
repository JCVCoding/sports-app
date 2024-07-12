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

export default async function ArticlePage({
  collectionName,
  league,
}: {
  collectionName: collectionName;
  league: string;
}) {
  const data = await getData(collectionName);
  const apiData = data![0];

  return (
    <section>
      <div className="flex flex-col items-center gap-y-3 mt-4">
        <Image
          src={`https://cdn.bleacherreport.net/images/team_logos/328x328/${league.toLowerCase()}.png`}
          alt={`${league} logo`}
          width={80}
          height={80}
        ></Image>
        <h2 className="text-5xl font-bold text-center mb-4">{league}</h2>
      </div>
      <ol>
        <li className="my-8 mx-auto">
          {apiData?.map(
            ({ uuid, description, image_url, source, title }: ArticleData) => (
              <ContentCard
                key={uuid}
                description={description}
                image_url={image_url}
                source={source}
                title={title}
                league={league}
                article_id={uuid}
              />
            )
          )}
        </li>
      </ol>
    </section>
  );
}
