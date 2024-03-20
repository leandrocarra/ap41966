export type User = {
  id?: BigInteger;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  roles?: any[];
  restrictionAccounts?: any[];
  restrictionProductGroup?: any[];
  accountLocked?: boolean;
};

export type TokenTO = {
  grant_type?: string;
  userName?: string;
  password?: string;
  client_id?: string;
};

export type TokenOutputTO = {
  token?: string;
};

export type UsuarioAtivoTO = {
  documento?: string;
  recaptcha?: string;
};

export type UsuarioAtivoOutputTO = {
  ativo?: boolean;
};

export type ValidaUsuarioTO = {
  documento?: string;
  dataNascimento?: string;
  tipoDocSecundario?: string;
  tipoCliente?: string;
  docSecundario?: string;
  canaldigital?: string;
  usuario?: string;
};

export type ValidaUsuarioOutputTO = {
  userValido?: boolean;
};


export type AtivaUsuarioTO = {
  uid?: string;
};

export type TrocaSenhaTO = {
  documento?: string;
  canaldigital?: string;
};

export type TrocaSenhaOutputTO = {
  email?: string;
  telefone?: string;
};

export type EsqueciSenhaTO = {
  userName?: string;
  tipoEnvio?: number;
};

export type TokenValidoTO = {
  tokenValidator?: string;
  userName?: string;
};

export type EsqueciSenhaValidaTO = {
  tokenValidator?: string;
  userName?: string;
  senha?: string;
};

export type MinhaContaTO = {
  canaldigital?: string;
  documento?: string;
};

export type AtualizarMinhaContaTO = {
  canaldigital?: string;
  documento?: string;
  emailCadastro?: string;
  telefone?: string;
  celular?: string;
  usuarioAcesso?: string;
  emailAcesso?: string;
  termosUso?: string;
};

export type AtualizarSenha = {
  canaldigital?: string;
  documento?: string;
  senha?: string;
};

export type TipoPessoa = 'FISICA' | 'JURIDICA'; 
