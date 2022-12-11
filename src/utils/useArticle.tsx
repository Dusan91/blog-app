import React from "react";
import { Article, ArticlesDataProps } from "./commonInterfaces";

interface Context {
  article: Article | null;
  setArticle: React.Dispatch<React.SetStateAction<Article | null>>;
  articles: ArticlesDataProps | null;
  setArticles: React.Dispatch<React.SetStateAction<ArticlesDataProps | null>>;
}
const ArticleContext = React.createContext<Context>({
  article: null,
  setArticle: (): void => {},
  articles: null,
  setArticles: (): void => {},
});

type ProviderProps = {
  children: React.ReactNode;
};

const ArticleProvider: React.FC<ProviderProps> = (
  children
): React.ReactElement => {
  const [article, setArticle] = React.useState<Article | null>(null);
  const [articles, setArticles] = React.useState<ArticlesDataProps | null>(
    null
  );
  const value = React.useMemo((): Context => {
    return {
      article,
      setArticle,
      articles,
      setArticles,
    };
  }, [article, setArticle, articles, setArticles]);

  return <ArticleContext.Provider value={value} {...children} />;
};
function useArticle() {
  const context = React.useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be inside HistoryProvider !");
  }
  return { ...context };
}
export { ArticleProvider, useArticle };
