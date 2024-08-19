import Image from "next/image";
import { getArticleById } from "@/lib/getArticleData";
import { collectionName } from "@/lib/getArticleData";

export default async function ArticlePage({
  params,
  leagueArticles,
}: {
  params: { uuid: string };
  leagueArticles: collectionName;
}) {
  const [data] = await getArticleById(params.uuid, leagueArticles);
  return (
    <>
      <h3 className="lg:text-4xl md:text-2xl text-xl font-medium mb-3 px-2 md:px-0">
        {data.title}
      </h3>
      <div className="text-gray-400 pb-3 px-2 md:px-0">
        Source: {data.source}
      </div>
      <div className="relative mb-3">
        <Image
          src={data.image_url}
          alt={data.image_alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="mb-6 px-2 md:px-0 text-sm md:text-lg">
        {data.description}
      </div>
    </>
  );
}
