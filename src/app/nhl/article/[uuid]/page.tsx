import CommentsWrapper from "@/components/layout_components/comment/commentWrapper";
import ArticlePage from "@/components/pages/articlePage";

export default function Page({ params }: { params: { uuid: string } }) {
  return (
    <>
      <ArticlePage leagueArticles="NHL_Articles" params={params} />{" "}
      <CommentsWrapper league="nhl" params={params} />
    </>
  );
}
