export class Cell {

    private content:any;
    private row:number;
    private column:number;

    constructor(content:any,row:number,column:number) {
        this.content = content;
        this.row = row;
        this.column = column;
    }

 
    public getContent() :any{
        return this.content;
    }

 
    public getRow() :number{
        return this.row;
    }

   
    public getColumn() {
        return this.column;
    }

 
    public setContent(content:any) {
        this.content = content;
    }
}