import { environment } from "@environments/environment";
import { Canal } from "app/core/enums/distribuidoras";


export class LoginRequestDTO {
    public grant_type: string;
    public client_id: string;
    public client_secret: string;
    public scope: string

    constructor(
        public username: string,
        public password: string,
    ) {
        this.grant_type = 'password';
        this.client_id = this.identificaClientIdPorCanal();
        this.client_secret = this.identificaClientSecretPorCanal();
        this.username = username;
        this.password = password;
        this.scope = 'openid';
    }


    private identificaClientIdPorCanal(): string {
        switch (environment.canal) {
            case Canal.AGR: {
                return 'CwYFvFj_DDtLJedIu9y1n1hcOd8a';
            }
            case Canal.AGC: {
                return 'YicYeqO8E_XACfWfjeQgLSo6Md0a';
            }
            case Canal.AGP: {
                return 'uScXQQwAe2qxKATIvv1EfB77IoYa';
            }
            case Canal.AGE: {
                return '7fUw6KahtPMfaNz_8DQ241Fqo2Ia';
            }
            default: {
                return 'a_vrfGrkqevUPzXWSZbC_KwkEX8a';
            }
        }
    }

    private identificaClientSecretPorCanal(): string {
        switch (environment.canal) {
            case Canal.AGR: {
                return 'f9ZJfZEhCpj8db5nYrhl_tWxhaMa';
            }
            case Canal.AGC: {
                return 'FFiuHe1wEiSKJZRU8ENqMC4sA0oa';
            }
            case Canal.AGP: {
                return 'agbpXX7kWfSfuOCH8cdfzwf7Riga';
            }
            case Canal.AGE: {
                return 'KRQZu1qipiNr3N2v61qOuskJYmAa';
            }
            default: {
                return 'ZmILVM_atdaM7C7O6sayq029XM4a';
            }
        }
    }
}
