export class User{
    private _loggedInUserName: string;
    private _roles: string[];

    get loggedInUserName(): string {
        return this._loggedInUserName;
    }

    set loggedInUserName(newName: string) {
            this._loggedInUserName = newName;
    }

     get roles(): string[] {
        return this._roles;
    }

    set roles(newRoles: string[]) {
            this._roles = newRoles;
    }
}