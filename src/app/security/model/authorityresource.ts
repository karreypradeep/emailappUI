export class AuthorityResource{
    private _authorityConstant: string;
    private _viewGrant: string;
    private _createGrant: string;
    private _updateGrant: string;
    private _deleteGrant: string;
    private _moduleName: string;

    get authorityConstant(): string {
        return this._authorityConstant;
    }

    set authorityConstant(newAuthorityConstant: string) {
            this._authorityConstant = newAuthorityConstant;
    }

    get viewGrant(): string {
        return this._viewGrant;
    }

    set viewGrant(newViewGrant: string) {
            this._viewGrant = newViewGrant;
    }

    get createGrant(): string {
        return this._createGrant;
    }

    set createGrantt(newCreateGrant: string) {
            this._createGrant = newCreateGrant;
    }
 
    get updateGrant(): string {
        return this._updateGrant;
    }

    set updateGrant(newUpdateGrant: string) {
            this._updateGrant = newUpdateGrant;
    }
  
    get deleteGrant(): string {
        return this._deleteGrant;
    }

    set deleteGrant(newDeleteGrant: string) {
            this._deleteGrant = newDeleteGrant;
    }
  
    get moduleName(): string {
        return this._moduleName;
    }

    set moduleName(newModuleName: string) {
            this._moduleName = newModuleName;
    }

}