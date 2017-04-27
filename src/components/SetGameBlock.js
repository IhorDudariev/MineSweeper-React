import React from 'react';

export default class SetGameBlock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dificalty: { "mines":40, "width": 16, "height": 16},
            statusPlay: false
        }
    }
    setDifficulty(e){

        let dificaltySet =  function() {
            switch (e.target.value) {

            case "easy":
                return { "mines":10, "width": 9, "height": 9}

            case "medium":
               return { "mines":40, "width": 16, "height": 16}

            case "expert":
               return { "mines":99, "width": 30, "height": 16}

            default:
                return { "mines":10, "width": 9, "height": 9}
            }
        }
        this.setState({
            dificalty: dificaltySet()
        })
    }    
    startGame(e){
        this.props.startGame({status:e.target.value, level:this.state.dificalty});
        this.setState({
            statusPlay: true
        })
    }   

    render() {
        return (                    
                <div className={(this.props.status == 'loose' || this.props.status == 'win')? "dificalty-block fix-open": "dificalty-block"}>
                    <div className="set-dificalty-block">
                        <div className="radio-block">  
                            <input type="radio" id="task_all" name="dificalty" value="easy" onChange={this.setDifficulty.bind(this)}/>
                            <label htmlFor="task_all">
                                <span className="text-label">Easy</span>
                            </label>
                        </div>
                        <div className="radio-block">  
                            <input type="radio" id="task_not_done" name="dificalty" value="medium" defaultChecked={true} onChange={this.setDifficulty.bind(this)}/>
                            <label htmlFor="task_not_done">
                                <span className="text-label">Medium</span>
                            </label>
                        </div>
                        <div className="radio-block">  
                            <input type="radio" id="task_done" name="dificalty" value="expert" onChange={this.setDifficulty.bind(this)}/>
                            <label htmlFor="task_done">
                                <span className="text-label">Hard</span>
                            </label>
                        </div>
                    </div>
                    <div className="btn-start-block">
                        <p className="info-text">
                            {
                                 (this.props.status == 'loose')? 'You Loose!!! ' : 
                                 (this.props.status == 'win')? 'You Win!!! '  
                                 : ''
                            }
                            Game time is {this.props.time} sec.
                        </p>
                        <input type="button" className="my_btn" value={(this.state.statusPlay)? 'New Game': 'Start'} onClick={this.startGame.bind(this)}/>
                    </div>   
                </div>
        );
    }
};



