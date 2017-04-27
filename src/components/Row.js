import React from 'react';

import Cell from './Cell.js';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        		<tr>
        		{
	                this.props.rows.map((col, index) => {
	                    return(
	                            <Cell 
	                            	key={index} 
	                            	open={this.props.openCell.bind(this,col)} 
                                    flagTo = {this.props.flagSet.bind(this,col)}
	                            	cell={col}

	                            />
	                    );
	                })
            	}
            	</tr>
        );
    }
};
