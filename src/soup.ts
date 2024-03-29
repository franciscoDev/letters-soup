import { Board } from "./board";
import {Cell} from "./cell";
import { ContentDirection } from "./content_direction";

export class Soup {

    private content:Array<string>;
    private board:Board;
    private fill:string ;
    private defaultFill:string;
    private solution:any;
    private size:number;

    constructor(words:Array<string>,size:number,fill?:string) {
        this.content        = words;
        this.size           = size;
        this.solution       = {};
        this.board          = new Board(this.size,this.size,'*');
        this.defaultFill    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fill           = (fill) ? fill : this.defaultFill;
    }
 
    public generate():Array<any>{ 
        this.board.reset();
        this.solution = {};
        this.content.forEach((value)=>{
            const word  = value.toUpperCase();
            const cells = this.getValidCells(word);
            this.setContentInBoard(word,cells,this.isInvertContent() );
            this.solution[word] = cells;
        });
        this.fillEmptyCells();
        return this.board.getAllCells();
    }

    public getSolution(valueInContent?:string):any{
        if(valueInContent) return this.solution[valueInContent.toUpperCase()];
        return this.solution;
    }
 
    public show() :string{
        return this.board.show();
    }
 
    public setContent(content:Array<string>):void {
        this.content = content ;
    }
 
    public setSize(size:number) :void{
        this.size= size;
        this.board.setSize(this.size);
    }
 
    public getSize():number {
       return this.size; 
    }

    public setFill(fill:string):void{
        this.fill = fill;
    }

    private getValidCells(content:string):Array<Cell>{
        let contentSize = content.length;
        let canSetInBoard = false;
        let cells:Array<Cell> = [];
        do {
            cells = this.getNumberCellsFromContentSize(contentSize);
            let isValid = this.isValidCells(cells,content);
            if( isValid ) canSetInBoard = true ;
        } while (! canSetInBoard);
        return cells;
    }

    private setContentInBoard(content:string,cells:Array<Cell>,isInvert:boolean) :void{
        for (let i = 0,j=content.length-1; i < cells.length; i++,j--) {
            let cell = cells[i];
            let charContent = (isInvert)?content[j]:content[i];
            cell.setContent(charContent);
            this.board.setCell(cell.getRow(),cell.getColumn(),cell);
        }
    }

    private getNumberCellsFromContentSize(contentSize:number):Array<Cell>{
        let isValidWordInBoard = false;
        let cells:Array<Cell>  = [];
        do {
            const randomCell = this.getRandomCell();
            const direction  = this.getRandomDirection();
            if(direction === ContentDirection.DIAGONAL)  cells = this.board.getDiagonalCells(randomCell,contentSize);
            if(direction === ContentDirection.HORIZONTAL)cells = this.board.getRowCells(randomCell,contentSize);
            if(direction === ContentDirection.VERTICAL)  cells = this.board.getColumnCells(randomCell,contentSize);
            if( cells.length === contentSize) isValidWordInBoard = true;
        } while (! isValidWordInBoard );
       
        return cells;
    }

    private isValidCells(cells:Array<Cell>,content:string):boolean{
        for (let i = 0; i < cells.length; i++) {
          if( cells[i].getContent() !== this.board.getDefaultContentCell() )
            return false;
        }
        return true;
    }

    private getRandomCharFromFill():string{
        const index = Math.floor(Math.random() *  this.fill.length ) ;
        return  this.fill.charAt(index);
    }

    private getRandomCell() : Cell {
        const row    =   Math.floor(Math.random() *  this.board.getSize()) ; 
        const column =   Math.floor(Math.random() *  this.board.getSize()) ; 
        return this.board.getCell(row,column);      
    }

    private getRandomDirection():number{
        let directions = Object.entries(ContentDirection).length;//HORIZONTAL,VERTICAL,DIAGONAL. 
        return Math.floor(Math.random() * directions ) + 1; ;
    }

    private isInvertContent():boolean{
        return (Math.floor(Math.random() * 2) === 1) ? true : false;
    }

    private fillEmptyCells():void{
        for (let row = 0; row < this.board.getSize(); row++) {
            for (let column = 0; column <  this.board.getSize(); column++) {
                let cell = this.board.getCell(row,column);
                if( cell.getContent() === this.board.getDefaultContentCell() ){
                    cell.setContent(this.getRandomCharFromFill());
                }
            }   
        }
    }

}