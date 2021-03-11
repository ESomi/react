import React, { Component } from 'react'; 
import PropTypes from 'prop-types'

const propTypes = {
    onPlus: PropTypes.func,
    onSubtract: PropTypes.func,
    onRadomizeColor: PropTypes.func
};

function createWarning(funcName) {
    console.warn(funcName+' is not defined')
}

const defaultProps = {
    onPlus: () => createWarning('onPlus'),
    onSubtract: () => createWarning('onSubtract'),
    onRadomizeColor: () => createWarning('onRandomizeColor'),
 };

class Control extends Component { 
    constructor(props) { 
        super(props);
    }

render() {
        return(
            <div>
                <button onClick={this.props.onPlus}>+</button>
                <button onClick={this.props.onSubtract}>-</button>
                <button onClick={this.props.onRadomizeColor}>Randomize Color</button>
            </div>
        );
    }
}

Control.propTypes = propTypes;
Control.defaultProps = defaultProps
export default Control;