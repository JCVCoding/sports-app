import CommentsWrapper from "@/components/layout_components/comment/commentWrapper";
import ArticlePage from "@/components/pages/articlePage";

export default function Page({ params }: { params: { uuid: string } }) {
  return (
    <>
      <ArticlePage leagueArticles="NBA_Articles" params={params} />
      <CommentsWrapper params={params} league="nba" />
    </>
  );
}
