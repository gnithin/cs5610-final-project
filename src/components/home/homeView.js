import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";
import {createQuestion} from "../../redux/actions/questionActions";
import {connect} from "react-redux";
import questionService from "../../services/questionService";

class HomeView extends Component {
    state={
        questionList:[]
    }

    componentDidMount() {

        questionService.getQuestionService().then((res) => {
            console.log(res);
            if (res.status === 1) {
                console.log("asdsad--",res.data)
            }
            // this.props.getAllQuestions(res.data)
        });
    }


    render() {
        return (
           <div>
               <NavBarComponent />
               Home Component!!!!
             <Link
                 className="btn btn-primary"
                 title="Create Question"
                 to={`/create-question`}
             >
               Create Question
             </Link>
           </div>
        );
    }
}


const stateMapper = (state) => {
    console.log(state);
    return {
        questionList: state.questionList
    }

};

const dispatchMapper = (dispatch) => {
    console.log("DEBUG: stateMapper in getAllQuestions called first");
    return {
        getAllQuestions: () => {
                dispatch()
        }
    }

};
export default connect(stateMapper,dispatchMapper) (HomeView);
