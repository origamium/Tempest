import { APIKeyType } from "../Types/APIKeyType";
import Authorization from "../Authorization";
import { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { AuthorizationUnitObject } from "../Service/ApiSet/AuthorizationUnitObject";
import { Exportable } from "../../HelperType/Exportable";

export type ProviderObject = {
    serviceKey: string; // equal Service Object key. and must be unique
    providerKey: string;
    providerName: string;
    authorization: AuthorizationUnitObject;
    domain: string; // domain must be equal key
    baseUrl: string;
    apiKey: APIKeyType;
};

// key is domain. e.g. 'twitter.com', 'slack.com'
export type Providers = UndefinedablePairOfObject<ProviderObject>;

export class Provider implements Exportable<ProviderObject> {
    private readonly _serviceKey: string;
    private readonly _providerKey: string;
    private readonly _providerName: string;
    private readonly _baseUrl: string; // https://slack.com/api/, https://api.twitter.com/, https://mstdn.jp/api/v1/ ...
    private readonly _domain: string; // mstdn.jp, pawoo.net...
    private readonly _auth: Authorization;

    constructor({ source, officialProviderKey }: { source: ProviderObject; officialProviderKey?: string }) {
        this._serviceKey = source.serviceKey;
        this._providerKey = source.providerKey;
        this._providerName = source.providerName;
        this._baseUrl = source.baseUrl;
        this._domain = source.domain;

        this._auth = new Authorization(source.authorization, { apiKey: source.apiKey });
    }

    get authorization(): Authorization {
        return this._auth;
    }

    get apiKey(): APIKeyType | undefined {
        return this._auth.apiKey;
    }

    get baseUri(): string {
        return this._baseUrl;
    }

    get serviceKey(): string {
        return this._serviceKey;
    }

    get providerKey(): string {
        return this._providerKey;
    }

    get providerName(): string {
        return this._providerName;
    }

    get domain(): string {
        return this._domain;
    }

    export(): ProviderObject {
        return {
            serviceKey: this._serviceKey,
            providerKey: this._providerKey,
            providerName: this._providerName,
            authorization: this._auth.export(),
            domain: this._domain,
            baseUrl: this._baseUrl,
            apiKey: this._auth.apiKey,
        };
    }
}

export class ProviderControl implements Exportable<Providers> {
    private _providers: PairOfObject<Provider>;

    constructor(source: Providers) {
        this._providers = Object.entries(source).reduce(
            (accm, [key, source]) => ({ ...accm, [key]: new Provider({ source } as { source: ProviderObject }) }),
            {}
        );
    }

    public getProviders(): { key: string; name: string; service: string }[] {
        return Object.values(this._providers).map((v) => ({
            key: v.serviceKey,
            name: v.providerName,
            service: v.serviceKey,
        }));
    }

    public getProvider(key: string): Provider | undefined {
        return this._providers[key];
    }

    export(): Providers {
        return Object.entries(this._providers).reduce((accm, [key, value]) => ({ ...accm, [key]: value.export() }), {});
    }
}
