import CommentsWrapper from "@/components/layout_components/comment/commentWrapper";
import ArticlePage from "@/components/pages/articlePage";
import { getArticleById } from "@/lib/getArticleData";

export async function generateMetadata({
  params,
}: {
  params: { uuid: string };
}) {
  const [data] = await getArticleById(params.uuid, "NBA_Articles");
  return { title: data.title };
}

export default function Page({ params }: { params: { uuid: string } }) {
  return (
    <>
      <ArticlePage leagueArticles="NBA_Articles" params={params} />
      <CommentsWrapper params={params} league="nba" />
    </>
  );
}
