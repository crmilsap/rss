/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticleResponse } from '../models/ArticleResponse';
import type { Topic } from '../models/Topic';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BrowseArticlesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Topics
     * @returns Topic Successful Response
     * @throws ApiError
     */
    public getTopicsBrowseTopicsGet(): CancelablePromise<Array<Topic>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/browse/topics',
        });
    }

    /**
     * Get Articles
     * @param queryId
     * @returns ArticleResponse Successful Response
     * @throws ApiError
     */
    public getArticlesBrowseArticlesGet(
        queryId?: (number | null),
    ): CancelablePromise<Array<ArticleResponse>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/browse/articles',
            query: {
                'queryId': queryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Article
     * @param articleId
     * @returns ArticleResponse Successful Response
     * @throws ApiError
     */
    public getArticleBrowseArticleGet(
        articleId: number,
    ): CancelablePromise<ArticleResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/browse/article',
            query: {
                'articleId': articleId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
