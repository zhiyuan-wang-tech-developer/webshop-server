import {
  SignOptions,
  VerifyOptions,
  sign,
  Secret,
  verify,
  VerifyCallback,
  decode,
} from "jsonwebtoken";
import { readFileSync } from "fs";
import { Action } from "routing-controllers";
import { AuthorizationChecker } from "routing-controllers/AuthorizationChecker";
import path from "path";

export declare interface LoginDataPayload {
  email: string;
  password: string;
}

export declare interface JWTDataPayload {
  id: number;
  name: string;
  email: string;
}

// use 'utf8' to get key string instead of byte array (512 bit key)
// use private key to sign data
const privateKEY: Secret = readFileSync(
  path.join(__dirname, "private.key"),
  "utf8"
);

// use public key to verify token
const publicKEY: Secret = readFileSync(
  path.join(__dirname, "public.key"),
  "utf8"
);

// Token signing options
const signOptions: SignOptions = {
  issuer: "Zhiyuan Future Tech Corporation",
  subject: "Webshop User Token",
  audience: "Client",
  algorithm: "RS256",
  expiresIn: "2h", // expiration time after which the token will be invalid.
};

// Token verifying options
const verifyOptions: VerifyOptions = {
  issuer: "Zhiyuan Future Tech Corporation",
  subject: "Webshop User Token",
  audience: "Client",
  algorithms: ["RS256"],
  complete: true,
};

const verifyCallback: VerifyCallback = (error, decoded) => {
  if (error) {
    console.error(JSON.stringify(error));
  }
  console.log(JSON.stringify(decoded));
};

/**
 * @summary to sign data and generate JSON web token
 * @returns JSON web token string
 */
export function signData(data: JWTDataPayload): string {
  return sign(data, privateKEY, signOptions);
}

/**
 * @summary to verify JSON web token and return original data
 * @returns an decoded object { header, payload, signature }
 */
export function verifyTokenSync(token: string) {
  try {
    return verify(token, publicKEY, verifyOptions);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

export function verifyTokenAsync(token: string) {
  verify(token, publicKEY, verifyOptions, verifyCallback);
}

export const authorizationChecker: AuthorizationChecker = (action: Action) => {
  // Retrieve the request header "Authorization"
  const authorization: string = action.request.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    // Mind the whitespace after "Bearer".
    // The authorization header has the format: "Bearer <token>"
    const [, token] = authorization.split(" ");
    // Check if the client provided a valid JSON web token or not.
    if (token) {
      console.log("Token: " + JSON.stringify(token));
      let decoded = verifyTokenSync(token);
      if (decoded) {
        console.log("Decoded: " + JSON.stringify(decoded));
        return true;
      }
    }
    // NOTE: a double exclamation mark !! will transform any variable into a boolean.
    // return !!(token && verifyTokenSync(token));
  }
  // In case there is no valid authorization header
  return false;
};

export function getUserIdFromAuthorizationHeader(
  authorization: string
): number {
  const [, token] = authorization.split(" ");
  if (token) {
    const { id }: any = decode(token);
    if (id) {
      return id;
    }
  }
  return 0;
}
