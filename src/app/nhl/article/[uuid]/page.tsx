import CommentsWrapper from "@/components/layout_components/comment/commentWrapper";
import ArticlePage from "@/components/pages/articlePage";
import { getArticleById } from "@/lib/getArticleData";

export async function generateMetadata({
  params,
}: {
  params: { uuid: string };
}) {
  const [data] = await getArticleById(params.uuid, "NHL_Articles");
  return { title: data.title };
}

export default function Page({ params }: { params: { uuid: string } }) {
  return (
    <>
      <ArticlePage leagueArticles="NHL_Articles" params={params} />{" "}
      <CommentsWrapper league="nhl" params={params} />
    </>
  );
}
