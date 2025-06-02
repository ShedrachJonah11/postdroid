import { RequestData } from "../types/api";

/**
 * A class representing an HTTP request builder and executor.
 * Designed to help dynamically construct and send HTTP requests
 * with full support for headers, query parameters, and body types.
 */
export class Req {
  _data: RequestData;

  /**
   * Create a new request wrapper.
   * @param {RequestData} data - The request data including method, URL, headers, body, and query parameters.
   */
  constructor(data: RequestData) {
    this._data = data;
  }

  /**
   * Builds a `URL` object from the base URL and appends query parameters if defined.
   * @returns {URL} A complete `URL` object with query parameters applied.
   */
  setUrl(): URL {
    const urlObj = new URL(this._data.url);
    this._data.params?.forEach((param) => {
      if (param.key) {
        urlObj.searchParams.append(param.key, param.value);
      }
    });
    return urlObj;
  }

  /**
   * Constructs the request headers from the provided header key-value pairs.
   * @returns {Headers} A `Headers` object ready to be passed to the fetch call.
   */
  buildBaseHeaders(): Headers {
    const headers = new Headers();
    this._data.headers?.forEach((header) => {
      if (header.key) {
        headers.append(header.key, header.value);
      }
    });
    return headers;
  }

  /**
   * Builds the request body based on the configured body type and updates headers accordingly.
   * - For `json`: Parses and stringifies the body and sets `Content-Type` to `application/json`.
   * - For `form`: Parses key-value pairs into a `FormData` object.
   * - For `text`: Uses plain text as-is with `Content-Type: text/plain`.
   *
   * @returns {{ body: any, headers: Headers }} An object containing the request body and updated headers.
   */
  buildBodyAndHeaders(): { body: any; headers: Headers } {
    const headers = this.buildBaseHeaders();
    const { bodyType, body } = this._data;

    if (!body) {
      return { body: undefined, headers };
    }

    if (bodyType === "json") {
      try {
        const parsed = typeof body === "string" ? JSON.parse(body) : body;
        headers.set("Content-Type", "application/json");
        return { body: JSON.stringify(parsed), headers };
      } catch (e) {
        headers.set("Content-Type", "text/plain");
        return { body, headers }; // fallback to raw string
      }
    }

    if (bodyType === "form") {
      const formData = new FormData();
      if (typeof body === "string") {
        body.split("&").forEach((pair) => {
          const [key, value] = pair.split("=");
          if (key) formData.append(key, value || "");
        });
      }
      // Let browser set Content-Type with boundary
      return { body: formData, headers };
    }

    if (bodyType === "text") {
      headers.set("Content-Type", "text/plain");
      return { body, headers };
    }

    return { body: undefined, headers };
  }

  /**
   * Executes the HTTP request using the configured method, headers, URL, and body.
   *
   * @async
   * @returns {Promise<Response>} A promise that resolves to the `Response` object from the fetch call.
   */
  async fetch(): Promise<Response> {
    const method = this._data.method;
    const url = this.setUrl().toString();
    const { body, headers } = this.buildBodyAndHeaders();

    const options: RequestInit = {
      method,
      headers,
    };

    if (method !== "GET" && method !== "HEAD") {
      options.body = body;
    }

    return await fetch(url, options);
  }
}
