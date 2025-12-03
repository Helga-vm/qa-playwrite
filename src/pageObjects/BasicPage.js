export class BasicPage{
    constructor(page, url){
        this.page = page;
        this._url = url;
    }

    async navigate(){
        await this.page.goto(this._url);
    }
}