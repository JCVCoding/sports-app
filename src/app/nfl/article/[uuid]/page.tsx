import ArticlePage from "@/components/pages/articlePage";

export default function Page({ params }: { params: { uuid: string } }) {
  return <ArticlePage leagueArticles="NFL_Articles" params={params} />;
}
