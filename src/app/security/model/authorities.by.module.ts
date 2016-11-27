import {AuthorityResource} from './authorityresource';
export class AuthoritiesByModuleResource{
    private _moduleName: string;
    private _authorities: AuthorityResource[];

    get moduleName(): string {
        return this._moduleName;
    }

    set moduleName(newModuleName: string) {
            this._moduleName = newModuleName;
    }

     get authorities(): AuthorityResource[] {
        return this._authorities;
    }

    set authorities(newAuthorities: AuthorityResource[]) {
            this._authorities = newAuthorities;
    }
}