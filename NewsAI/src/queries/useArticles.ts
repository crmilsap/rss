import {useQuery} from '@tanstack/react-query';
import {apiClient} from '../client';

export const useArticles = (queryId: number | null) =>
  useQuery({
    queryKey: ['useArticles', queryId],
    queryFn: () =>
      apiClient.browseArticles.getArticlesBrowseArticlesGet(queryId),
  });

export const useArticle = (articleId: number) =>
  useQuery({
    queryKey: ['useArticle', articleId],
    queryFn: () =>
      apiClient.browseArticles.getArticleBrowseArticleGet(articleId),
  });
