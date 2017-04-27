import React from 'react';

import Row from './Row.js';

export default class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            table: this.createTable(),
            drawBomb:false,
        };
    }
    
    componentDidUpdate(nextProps) {
        if (this.props.cols !== nextProps.cols || this.props.status!== nextProps.status ) {
            let _table = this.createTable();
            this.setState({
                table: _table,
                drawBomb:false,
            });
        }   
    }
    createTable() {
        let Tabletmp = [];
        for(let i = 0; i < this.props.rows; i++){
            let tmp = [];
            for(let j = 0; j < this.props.cols; j++){
                let cell ={
                    x : i,
                    y : j,
                    count : 0,
                    isOpened : false,
                    hasMine : false,
                    hasFlag : false,
                    clickMine:false,
                    mineRound:0,
                    showCount:false
                }
                tmp.push(cell);
            }
            Tabletmp.push(tmp);
        }        

        return Tabletmp;
    }
    drawBomb() {
        for(let i = 0; i < this.props.mines; i++){
            let cell = this.state.table[Math.floor(Math.random()*this.props.rows)][Math.floor(Math.random()*this.props.cols)];
            if(cell.hasMine || cell.isOpened){
                i--;
            } else {
                cell.hasMine = true;
            }
        }
    }
    openCell(el){
        let _table = this.state.table;
        let countMineArround = this.mine_round_counter(el.x,el.y);
        let cell = _table[el.x][el.y];

        if(!this.state.drawBomb){

            this.props.handleStartClick();
            this.drawBomb();

            let _table = this.state.table;
            let countMineArround = this.mine_round_counter(el.x,el.y);
            let cell = _table[el.x][el.y];

            cell.isOpened = true;
            cell.mineRound = countMineArround;
            cell.showCount = true;

            this.props.addOpenCell();
            this.setState({
                drawBomb:true,
                table:_table
            });
                     
        }
        else if(cell.hasFlag == true || cell.isOpened == true) {
            return;
        }
        else if(cell.hasMine == true){
             this.endGame();
        }
        else if( !cell.isOpened && countMineArround==0){
             cell.isOpened = true;
             this.props.addOpenCell();
             this.openZeroCell(el.x,el.y);
             this.setState({table:_table});
        }
        else {
            this.props.addOpenCell();
            cell.isOpened = true;
            cell.mineRound = countMineArround;
            cell.showCount = true;
            this.setState({table:_table});
        }
        
    }
    mine_round_counter(x,y){
        let _table = this.state.table;
        let x_start = x > 0? x-1: x;
        let y_start = y > 0? y-1: y;
        let x_end = x < this.props.rows-1? x+1: x;
        let y_end = y < this.props.cols-1? y+1: y;
        let count = 0;

        for (let i = x_start; i <= x_end; i++) {
            for (let j = y_start; j <= y_end; j++) {
                if(_table[i][j].hasMine && !(x==i && y==j)){
                    count++;
                }
            }
        }
        return count;
        
    }
    openZeroCell(x,y){
        let _table = this.state.table;
        let x_start = x > 0? x-1: x;
        let y_start = y > 0? y-1: y;
        let x_end = x < this.props.rows-1? x+1: x;
        let y_end = y < this.props.cols-1? y+1: y;

        for (let i = x_start; i <= x_end; i++) {
                for (let j = y_start; j <= y_end; j++) {
                    this.openCell({x:i,y:j});
                }
            }
    }
    endGame(){
        let _table = this.state.table;
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                if( _table[i][j].hasMine){
                    _table[i][j].clickMine = true;
                }
            }
        }
        this.setState({table:_table});
        this.props.endGameLoose();
        
    }
    
    flagSet(el){
        let _table = this.state.table;
        _table[el.x][el.y].hasFlag = !_table[el.x][el.y].hasFlag;
        this.setState({table:_table});
        this.props.flagSet();
    }
    
    render() {
        return (              
                <table>
                    <tbody>
                    {
                        this.state.table.map((row, index) => {
                            return(
                                <Row
                                    key={index}
                                    rows = {row}
                                    openCell = {this.openCell.bind(this)}
                                    flagSet ={this.flagSet.bind(this)}  
                                />

                            );
                        })
                    }

                    </tbody>
                </table>
        );
    }
};



