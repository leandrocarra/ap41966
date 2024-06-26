export class LoginResponseDTO {
    constructor(
        public access_token: string,
        public refresh_token: string,
        public scope: string,
        public token_type: string,
        public expires_in: number
    ) {}
}