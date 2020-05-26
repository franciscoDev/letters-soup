import { Board } from "./board";
import {Cell} from "./cell";
import { ContentDirection} from "./content_direction";

export class Soup {

    private content:Array<string>;
    private board:Board;
    private fill:string ;
    private defaultFill:string;

    constructor(content:Array<string>,size:number) {
        this.content = content;
        this.board = new Board(size,size);
        this.defaultFill = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fill = this.defaultFill;
        console.log(this.board.show());
    }

    public getRandomContent() : string{
        const index = Math.floor(Math.random() * this.content.length ) ;
        return this.content[index];
    }

    public setFill(fill:string):void{
        this.fill = fill;
    }
 
    public setToLowerCaseDefultFill() :void{
        this.fill = this.defaultFill.toLocaleLowerCase();
    }

    public getRandomCharFromFill():string{
        const index = Math.floor(Math.random() *  this.fill.length ) ;
        return  this.fill.charAt(index);
    }

    
    public getRandomCell() : Cell {
        const row    =   Math.floor(Math.random() *  this.board.getSize()) ; 
        const column =   Math.floor(Math.random() *  this.board.getSize()) ; 
        return this.board.getCell(row,column);      
    }

 
    private setContentInBoard(content:string,cells:Array<Cell>) :void{
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.setContent(content[i]);
            this.board.setCell(cell.getRow(),cell.getColumn(),cell);
        }
    }

    private getNumberCellsFromContentSize(contentSize:number):Array<Cell>{
        let isValidWordInBoard = false;
        let cells:Array<Cell> = [];
        do {
            const randomCell= this.getRandomCell();
            const direction = this.getRandomDirection();
            if(direction == ContentDirection.DiAGONAL)  cells = this.board.getDiagonal(randomCell.getRow(),randomCell.getColumn());
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

    private getRandomDirection():number{
        let directions = 2;//HORIZONTAL,VERTICAL,DIAGONAL.
        return Math.floor(Math.random() * directions ) + 1; ;
    }

    public generateSoup(){   
        do {
            const content = this.getRandomContent();
            console.log('CONTENT',content);
            const cells = this.getValidCells(content);
            console.log('Valid Cells',cells);
            this.setContentInBoard(content,cells );
            console.log(this.board.show());
            let indexWord = this.content.indexOf(content);
            this.content.splice(indexWord,1);
            console.log('Array Content:',this.content);
        } while (this.content.length > 0 );
         
    }
}