export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type GroupType = {
    id?: string;
    name: string;
    permission: Array<Permission>;
}

export class Group implements GroupType {
    id: string;
    name: string;
    permission: Array<Permission>;
    constructor({id, name, permission}: GroupType) {
        this.id  = id;
        this.name = name;
        this.permission = permission;
    }
}