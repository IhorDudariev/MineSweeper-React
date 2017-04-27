import React from 'react';

import Table from './components/Table.js';
import SetGameBlock from './components/SetGameBlock.js';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            level:{"mines":40, "width": 16, "height": 16},
            timerRunning: false,
            secondsElapsed: 0,
            startFlag: false,
            openCell: 0,
            flagCell: 40,
            statusShow: false,
            status:'stop',
        };
    }
    newGame(el) {
        this.setState({
            statusShow: !this.state.statusShow,
            secondsElapsed: 0,
            startFlag: true,
            level: el.level,
            openCell: 0,
            flagCell: el.level.mines,
            status:'playing'
        }); 
        this.stopTime();  
        
    }
    addOpenCell(){
        this.setState({
            openCell : ++ this.state.openCell
        });
        if( this.state.openCell == (this.state.level.width * this.state.level.height) - this.state.level.mines) {
            this.setState({
                 status : 'win',
            });
            this.stopTime();
        }        
    }
    addflagCell(){
        this.setState({
            flagCell : -- this.state.flagCell
        });       
    }
    getSeconds() {
        return ('0' + this.state.secondsElapsed % 60).slice(-2);
    }
    getMinutes() {
        return Math.floor(this.state.secondsElapsed / 60);
    }

    handleStartClick() {
        let _this = this;
        this.setState({timerRunning: true });
        this.incrementer = setInterval(function () {
        _this.setState({ secondsElapsed: (_this.state.secondsElapsed + 1) })
            }, 1000);
    }
    stopTime() {
        clearInterval(this.incrementer);
        this.setState({
          timerRunning: false,
        });
    }
    endGame() {
        this.stopTime();
        this.setState({ status : 'loose'});
    }
    render() {

        let timeGame = this.getMinutes()+':'+this.getSeconds();
        return (
            <div className="wrap-game">
                <SetGameBlock
                    startGame ={this.newGame.bind(this)}
                    status = {this.state.status}
                    time = {timeGame}
                />
                <div>
                    {
                        (this.state.startFlag)?
                        <div className={(this.state.status == 'loose' || this.state.status == 'win')? 'table-field open-fix' : 'table-field '}>
                            <div className="header-table">
                                <div><span className="icon-info flag-icon"></span>{this.state.flagCell}</div>
                                <div><span className="icon-info time-icon"></span>{timeGame}</div>
                            </div>
                            <Table
                                rows = {this.state.level.height}
                                cols = {this.state.level.width}
                                mines = {this.state.level.mines}
                                handleStartClick = {this.handleStartClick.bind(this)}
                                endGameLoose={this.endGame.bind(this)}
                                addOpenCell ={this.addOpenCell.bind(this)}
                                flagSet = {this.addflagCell.bind(this)}
                                openCell = {this.state.openCell}
                                status = {this.state.statusShow}
                            />
                            
                        </div>    
                        :''  
                    }
                    
                </div>   
            </div>
        );
    }
};



