import { ImageCard } from '@greggsetzer/beartracks-ui';
import { Article } from '../../../common/types/apiTypes';

interface ArticlesListProps {
  articles?: Article[];
}

const ArticlesList = ({ articles = [] }: ArticlesListProps) => {
  const articlesList = articles.map((article: Article) => {
    return (
      <ImageCard
        key={article.id}
        title={article.title}
        description={article.listingDescription}
        linkUrl={article.url}
        imgSrc={article.listingImageUrl}
        alt={article.altText}
        newBrowserTab={true}
      />
    );
  });

  return <>{articlesList}</>;
};

export default ArticlesList;
