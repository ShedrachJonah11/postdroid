import { AuthType } from "../types";
import { Buffer } from "buffer";

export class Auth {
  _type: AuthType;

  constructor(type: AuthType) {
    this._type = type;
  }

  /**
   * Make the auth header
   * @function makeHeader
   */
  async makeHeader(...args: any[]) {
    let authHeader;
    if (this._type === "basic") {
      if (typeof args[0] === "string" && typeof args[1] === "string") {
        const buffer = Buffer.from(
          process.env.AFBP_KEY + ":" + process.env.AFBP_SECRET
        ).toString("base64");
        authHeader = {
          Authorization: `Basic ${buffer}`,
        };
      } else {
        throw new Error("Basic auth requires a username and a password");
      }
    }
    return authHeader;
  }
}
