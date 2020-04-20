import React from 'react';
import {connect} from "react-redux";
import LoadingComponent from "../loader";
import {format} from "timeago.js/esm";
import Utils from "../../common/utils";
import {Link} from "react-router-dom";

const SearchResultsView = ({questions, isLoading, isError}) => {
    if (true === isError) {
        return (
            <div className="col-12">
                <span>Couldn't find any results!</span>
            </div>
        );
    }

    if (true === isLoading) {
        return (
            <div className="col-12">
                <LoadingComponent/>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="col-12">
                <span>Couldn't find any results!</span>
            </div>
        );
    }

    const renderIndividualCardEntries = (question) => {
        let user = {};
        if (false === Utils.isNull(question.user) && false === Utils.isNull(question.user.name)) {
            user = question.user;
        }

        return (
            <React.Fragment>
                <div className="card-title">
                    <h4>{question.title}</h4>
                </div>
                <div className="">
                    {question.description}
                </div>
                <div>
                    Asked {format(question.createdTimestamp)}
                </div>
                <div>
                    Asked by
                    <Link to={`/profiles/${user.id}`}>
                        {user.name}
                    </Link>
                </div>
            </React.Fragment>
        );
    };

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-12">
                    Results
                </div>
                <div className="col-12">
                    {questions.map(question => {
                        return (
                            <div className="card" key={`q-${question.id}`}>
                                <div className="card-body col-12">
                                    {renderIndividualCardEntries(question)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};


const reduxToComponentMapper = (state) => {
    return {
        questions: state.searchQuestions.questions,
    };
};

export default connect(reduxToComponentMapper)(SearchResultsView);
