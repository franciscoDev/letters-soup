import { Board } from "./board";
import {Cell} from "./cell";
import { ContentDirection} from "./content_direction";

export class Soup {

    private content:Array<string>;
    private board:Board;
    private fill:string ;
    private defaultFill:string;
    private solution:any;

    constructor(content:Array<string>,size:number,fill?:string) {
        this.content   = content;
        this.solution = {};
        this.board     = new Board(size,size,'*');
        this.defaultFill = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fill = (fill)?fill:this.defaultFill;
        console.log(this.board.show());
    }
 
    public generateSoup():Array<any>{ 
        
        for (let index = 0; index < this.content.length ; index++) {
            const content = this.content[index].toUpperCase();
            console.log('CONTENT',content);
            const cells = this.getValidCells(content);
            console.log('Valid Cells',cells);
            this.setContentInBoard(content,cells,this.isInvertContent() );
            console.log(this.board.show());
            this.solution[content] = cells;
        } 
         this.fillEmptyCells();
         console.log(this.board.show());
         return this.board.getAllCells();
    }

    public getSolution():any{
        return this.solution;
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
        let cells:Array<Cell> = [];
        do {
            const randomCell= this.getRandomCell();
            const direction = this.getRandomDirection();
            if(direction == ContentDirection.DiAGONAL)  cells = this.board.getDiagonalCells(randomCell,contentSize);
            if(direction == ContentDirection.HORIZONTAL)cells = this.board.getRowCells(randomCell,contentSize);
            if(direction == ContentDirection.VERTICAL)  cells = this.board.getColumnCells(randomCell,contentSize);
            if( cells.length === contentSize) isValidWordInBoard = true;
        } while (! isValidWordInBoard );
       
        return cells;
    }

    private isValidCells(cells:Array<Cell>,content:string):boolean{
        let isValid = true;
        for (let i = 0; i < cells.length; i++) {
          if( cells[i].getContent() != this.board.getDefaultContentCell() ){
            isValid = false;
            break;
          }
        }
        return isValid;
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
        let directions = 3;//HORIZONTAL,VERTICAL,DIAGONAL. 
        return Math.floor(Math.random() * directions ) + 1; ;
    }

    private isInvertContent():boolean{
        let isInvert = (Math.floor(Math.random() * 2)==1)?true:false;
        return isInvert;
    }

    private fillEmptyCells():void{
        for (let row = 0; row < this.board.getSize(); row++) {
            for (let column = 0; column <  this.board.getSize(); column++) {
                let cell = this.board.getCell(row,column);
                if( cell.getContent() == this.board.getDefaultContentCell() ){
                    cell.setContent(this.getRandomCharFromFill());
                }
            }   
        }
    }

}