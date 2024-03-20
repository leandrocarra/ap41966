export class UsuarioDAO {

    constructor(
        public username: string = '',
        public email: string = '',
        public celular: number = 0,
        public cpf: number = 0,
        public password: string | null = '',
        public tipoEnviado: string = '',
        public receberInfos: boolean = false
        ) { }
}
