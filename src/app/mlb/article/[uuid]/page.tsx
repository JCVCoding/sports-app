import CommentsWrapper from "@/components/layout_components/comment/commentWrapper";
import ArticlePage from "@/components/pages/articlePage";
import { getArticleById } from "@/lib/getArticleData";

export async function generateMetadata({
  params,
}: {
  params: { uuid: string };
}) {
  const [data] = await getArticleById(params.uuid, "MLB_Articles");
  return { title: data.title };
}

export default function Page({ params }: { params: { uuid: string } }) {
  return (
    <>
      <ArticlePage leagueArticles="MLB_Articles" params={params} />
      <CommentsWrapper league="mlb" params={params} />
    </>
  );
}
