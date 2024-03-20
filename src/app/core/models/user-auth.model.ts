export class UserAuth {
    constructor(
        public userId?: string,
        public password?: string,
        public email?: string,
        public fullName?: string,
        public birthDate?: string,
        public rg?: string,
        public tel?: string
    ) {
        this.userId = userId;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.rg = rg;
        this.tel = tel;
    }
}