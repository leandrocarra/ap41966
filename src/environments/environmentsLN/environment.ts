import { environment } from "@environments/environment";
import { EnvironmentInterface } from "./environment-interface";

export const environmentLN: EnvironmentInterface = {
    production: false,
    apiUrl: 'https://api-agenciahml.elektro.com.br',
    USUARIO_UE: environment.USUARIO_UE
};
