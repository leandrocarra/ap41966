export class LoginRequestDTO {
    constructor(
        public grant_type: string = 'password',
        public client_id: string = 'FD185FAB7FB849A3AB8E7D82C8BB3FEA',
        public username: string = '',
        public password: string = ''
    ) { }
}
