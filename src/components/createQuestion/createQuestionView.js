import React, {Component} from 'react';
import {connect} from "react-redux";

class CreateQuestionView extends Component {
    render() {
        return (
            <div>
                Create a new question!
            </div>
        );
    }


}
const stateMapper = () =>{
console.log("called first")
    return {}
}
const dispatchMapper=(dispatch)=>{

    return {}
}
export default connect(stateMapper)(CreateQuestionView);