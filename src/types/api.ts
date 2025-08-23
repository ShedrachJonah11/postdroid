export type Method =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";

export type KeyValuePair = {
  key: string;
  value: string;
};

interface Header extends KeyValuePair {}

interface Param extends KeyValuePair {}

export type Headers = Header[];

export type Params = Param[];

export type BodyType = "json" | "form" | "text" | "file" | "none";

export type RequestData = {
  url: string;
  method: Method;
  headers: Headers;
  params: Params;
  body?: any;
  bodyType?: BodyType;
  auth?: AuthData;
};

export type ResponseData = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
};

type AuthData =
  | { type: "none" }
  | { type: "basic"; username: string; password: string }
  | { type: "bearer"; token: string }
  | { type: "apiKey"; key: string; value: string; addTo: "header" | "query" };
