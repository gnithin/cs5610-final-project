import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";

class HomeView extends Component {
    render() {
        return (
           <div>
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

export default HomeView;