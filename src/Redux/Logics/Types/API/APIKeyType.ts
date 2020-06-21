export interface APIKeyType {
    ApiKey: string;
    ApiSecretKey?: string; // if "AuthInfoType.official" was available, ApiSecretKey may be undefined, "
}

export interface TokenType {
    Token: string;
    TokenSecret?: string; // in oauth2.0, TokenSecret is undefined.
    expire?: number;
}
