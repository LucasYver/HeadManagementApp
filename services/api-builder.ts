/* eslint-disable no-underscore-dangle */
import Axios from 'axios';

import { apiUrl } from '../config/config';

export enum HttpVerbs {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',

  DELETE = 'DELETE',
}

export enum ContentTypeHeaderType {
  JSON = 'application/json',
  MULTIPART_FORM_DATA = 'multipart/form-data',
}

export class ApiBuilder {
  _endpoint: string | undefined;

  _verb: HttpVerbs;

  _types: string[] | undefined;

  readonly _headers: Headers;

  _body: any | undefined;

  _options: object | undefined;

  _queryParams: string;

  _thunkAPI;

  private constructor() {
    const headers = new Headers();
    headers.append('Content-Type', ContentTypeHeaderType.JSON);
    headers.append('Accept', ContentTypeHeaderType.JSON);

    this._endpoint = undefined;
    this._verb = HttpVerbs.GET;
    this._types = undefined;
    this._headers = headers;
    this._body = undefined;
    this._options = undefined;
    this._queryParams = '';
  }

  static getInstance(thunkAPI) {
    const instance = new ApiBuilder();
    instance._thunkAPI = thunkAPI;

    return instance;
  }

  endpoint(endpoint: string) {
    this._endpoint = endpoint;
    return this;
  }

  apiEndpoint(endpoint: string) {
    this.endpoint(`${apiUrl}${endpoint}`);
    return this;
  }

  verb(verb: HttpVerbs) {
    this._verb = verb;
    return this;
  }

  withBody(body) {
    this._body = body;
    return this;
  }

  withQueryParams<T>(queryParams: T) {
    this._queryParams = `?${Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&')}`;

    return this;
  }

  async build() {
    if (!this._endpoint) {
      throw new Error('Endpoint unknown.');
    }

    const isFormDataBody = this._body instanceof FormData;
    if (isFormDataBody) {
      this._headers.append('Content-Type', ContentTypeHeaderType.MULTIPART_FORM_DATA);
    }

    try {
      const response = await Axios(`${this._endpoint}${this._queryParams}`, {
        method: this._verb,
        headers: this._headers,
        data: this._body,
      });

      const payload = response.data;

      if (response.status >= 400) {
        return this._thunkAPI.rejectWithValue(payload);
      }

      return payload;
    } catch (error) {
      return this._thunkAPI.rejectWithValue();
    }
  }
}
