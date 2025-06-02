/**
 * A wrapper class around the native Fetch API `Response` object.
 * Provides utility methods to extract headers and interpret the body
 * based on content type.
 */
export class Res {
  _element: Response;
  _time: number | null = null;

  /**
   * Creates a new response wrapper.
   * @param {Response} e - The native `Response` object returned from `fetch`.
   */
  constructor(e: Response) {
    this._element = e;
  }

  /**
   * Extracts and returns response headers as a plain JavaScript object.
   *
   * @returns {Record<string, string>} An object representing the response headers.
   * Each key corresponds to a header name, and each value is the header value.
   *
   * @example
   * {
   *   "content-type": "application/json",
   *   "cache-control": "no-cache"
   * }
   */
  getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    this._element.headers.forEach((value: string, key: string) => {
      headers[key] = value;
    });
    return headers;
  }

  /**
   * Attempts to parse and return the response body based on the `Content-Type` header.
   *
   * - Returns JSON if the content type is `application/json`
   * - Returns plain text for text-like content types (`text/*`, `application/xml`, `application/javascript`)
   * - For binary or unknown types, returns a placeholder string
   *
   * @async
   * @returns {Promise<any>} A promise that resolves to the parsed response body or a descriptive string for binary data.
   *
   * @example
   * const res = new Res(response);
   * const body = await res.getBody();
   * console.log(body); // Could be an object, string, or binary info
   */
  async getBody(): Promise<any> {
    const contentType = this._element.headers.get("content-type") || "";
    let responseData;

    if (contentType.includes("application/json")) {
      responseData = await this._element.json();
    } else if (
      contentType.includes("text/") ||
      contentType.includes("application/xml") ||
      contentType.includes("application/javascript")
    ) {
      responseData = await this._element.text();
    } else {
      responseData = `Binary data: ${contentType}`;
    }

    return responseData;
  }
}
