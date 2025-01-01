import { Headers } from "../types";

export class Res {
  _element: Response;
  constructor(e: Response) {
    this._element = e;
  }

  /**
   * Get current call response headers
   * @function getHeaders
   * @returns {Headers} The headers
   */
  getHeaders() {
    const headers = {} as Headers;
    this._element.headers.forEach((value: string, key: string) => {
      headers[key] = value;
    });
    return headers;
  }

  /**
   * Get current call response body
   * @function getBody
   * @returns {Headers} The body
   */
  async getBody() {
    return await this._element.json(); // Assumes JSON response; to adjust
  }
}
