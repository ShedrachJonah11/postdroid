import { Headers, Method } from "../types";

export class Req {
  _url: string;
  _method: Method;
  _headers: Headers = [];
  _body: any;

  constructor(url: string, method: Method, headers: Headers, body?: any) {
    this._url = url;
    this._method = method;
    this._headers = headers;
    this._body = body;
  }

  /**
   * Fetch a endpoint
   * @function _fetch
   */
  async fetch() {
    return await fetch(this._url, {
      method: this._method,
      body: JSON.stringify(this._body),
      headers: this._headers,
    });
  }
}
