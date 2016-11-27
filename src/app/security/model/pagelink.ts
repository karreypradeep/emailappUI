export class PageLink{
    private _name: string;
    private _label: string;
    private _url: string;

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
            this._name = newName;
    }

    get url(): string {
        return this._url;
    }

    set url(newUrl: string) {
            this._url = newUrl;
    } 

    get label(): string {
        return this._label;
    }

    set label(newLabel: string) {
            this._label = newLabel;
    }
}