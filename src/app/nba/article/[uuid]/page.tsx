import CommentsSection from "@/components/layout_components/comment/commentsSection";
import ArticlePage from "@/components/pages/articlePage";

export default function Page({ params }: { params: { uuid: string } }) {
  return (
    <>
      <ArticlePage leagueArticles="NBA_Articles" params={params} />
      <CommentsSection params={params} league="nba" />
    </>
  );
}
