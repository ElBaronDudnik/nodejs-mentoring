export interface UserType {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export class User implements UserType {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
    constructor({ id, login, password, age, isDeleted = false }: UserType) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;
    }
}
