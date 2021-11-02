import { Cell } from "./cell";

export class Board {

    cells: any[][];
    rows: number;
    columns: number;
    emptyContentCell:string='';
    contentCell:string;

    constructor(rows: number, columns: number,contentCell:string='') {
        this.cells = [];
        this.rows = rows;
        this.columns = columns;
        this.contentCell = (contentCell == this.emptyContentCell) ? this.emptyContentCell : contentCell;
        this.createDefaultCells(this.contentCell);
    }

    //Show content of the board.
    public show(): string {
        let output: string = '';
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let cell = this.cells[i][j];
                output += '[' + cell.getContent() + ']';
            }
            output += '\n';
        }
        return output;
    }

    //Set default content to each cell.
    private createDefaultCells(content:any) {
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j] = new Cell(content,i,j);
            }
        }
    }

    //Get a whole row from specific index.
    public getRow(row:number):Array<Cell> {
        let cells:Array<Cell> = [];
        cells = this.cells[row];
        return cells;
    }

    //Get part of a row from specific index.
    public getRowCells(startCell:Cell,numberCells:number):Array<Cell> {
        let cells:Array<Cell> = [];
        let indexColumn = startCell.getColumn();
        if( numberCells > this.cells.length) throw new Error('Invalid number cells');      
        
        for (let column = 0 ; (column < numberCells && indexColumn <= this.cells.length-1); column++) {
            cells.push(this.cells[startCell.getRow()][indexColumn]);
            indexColumn = indexColumn+1;            
        }
        return cells;
    }

    //Get a whole column from specific index.
    public getColumn(column:number):Array<Cell> {
        let cells:Array<Cell> = [];
        for (let row = 0; row < this.cells.length; row++) {
            cells.push(this.cells[row][column]); 
        }   
        return cells;
    }

    //Get part of a column from specific index.
    public getColumnCells(initCell:Cell,numberCells:number):Array<Cell>{
        let cells:Array<Cell> = [];
        let indexRow = initCell.getRow();
        if( numberCells > this.cells.length) throw new Error('Invalid number cells');

        for (let row = 0; (row < numberCells  && indexRow <= this.cells.length-1); row++) {
            cells.push(this.cells[indexRow][initCell.getColumn()]);
            indexRow = indexRow + 1 ;
        }
        return cells;
    }

    //Get a whole diagonal from specific index.
    public getDiagonal(row:number,column:number) :Array<Cell>{
        let cells:Array<Cell> = [];
        let diagonalSize = (row > column)?( this.cells.length-row ): (this.cells.length- column);      
        for (let indexCell = 0 ; indexCell < diagonalSize; indexCell++ ) {
            cells.push(this.cells[row + indexCell][column + indexCell]);
        }       
        return cells;
    }

    //Get part of a diagonal from specific index.
    public getDiagonalCells(startCell:Cell,numberCells:number) :Array<Cell>{
        let cells:Array<Cell> = [];
        let diagonalSize = (startCell.getRow() > startCell.getColumn())?( this.cells.length-startCell.getRow()  ): (this.cells.length- startCell.getColumn());      
        if( numberCells <= diagonalSize )  
            for (let indexCell = 0 ; indexCell < numberCells; indexCell++ ) {
                cells.push(this.cells[startCell.getRow() + indexCell][startCell.getColumn() + indexCell]);
            }       
        return cells;
    }
 
    //Change a cell in board from specific row and column.
    public setCell(row:number,column:number,cell:Cell):void {
       this.cells[row][column] = cell;  
    }

    //Get a cell in board from specific row and column.
    public getCell(row:number,column:number) : Cell{
        return this.cells[row][column];
        
    }

    //Get size of the board. 
    public getSize():number {
        return this.cells.length;
    }

    public setSize(size:number):void {
        this.rows = size;
        this.columns = size; 
    }
 
    public reset() :void{
        this.cells= [];
        this.createDefaultCells(this.contentCell);
    }

    //Get default content of the cells.
    public getDefaultContentCell():string{
        return this.contentCell;
    }

    public getAllCells(){
        return this.cells;
    }

}