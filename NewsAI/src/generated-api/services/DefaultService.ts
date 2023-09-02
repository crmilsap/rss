/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Topic } from '../models/Topic';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Topics
     * @returns Topic Successful Response
     * @throws ApiError
     */
    public getTopicsTopicsGet(): CancelablePromise<Array<Topic>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/topics',
        });
    }

    /**
     * Hello
     * @returns string Successful Response
     * @throws ApiError
     */
    public helloGet(): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }

}
