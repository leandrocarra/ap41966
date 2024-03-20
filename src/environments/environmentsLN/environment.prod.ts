import { environment } from "@environments/environment";
import { EnvironmentInterface } from "./environment-interface";

export const environmentLN: EnvironmentInterface = {
  production: true,
  apiUrl: "https://api-agencia.elektro.com.br",
  USUARIO_UE: environment.USUARIO_UE
};
