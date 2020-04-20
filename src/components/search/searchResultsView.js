import React from 'react';
import {connect} from "react-redux";
import LoadingComponent from "../loader";
import {format} from "timeago.js/esm";
import Utils from "../../common/utils";
import {Link, withRouter} from "react-router-dom";
import './searchResults.css'

const SearchResultsView = ({history, questions, query, isLoading, isError}) => {
    if (true === isError) {
        return (
            <div className="col-12">
                <span className="sr-message">Couldn't find any results!</span>
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
        if (Utils.isEmptyStr(query)) {
            return (
                <div className="col-12">
                    <span className="sr-message">
                        Search for questions
                    </span>
                </div>
            );
        }

        return (
            <div className="col-12">
                <span className="sr-message">Couldn't find any results!</span>
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
                <div className="card-text">
                    Asked by - &nbsp;
                    <Link to={`/profiles/${user.id}`}>
                        {user.name}
                    </Link>
                </div>
                <div className="card-text text-muted">
                    Asked {format(question.createdTimestamp)}
                </div>
            </React.Fragment>
        );
    };

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-12">
                    <span className="sr-message">Results</span>
                </div>
                <div className="col-12 sr-results-wrapper">
                    {questions.map(question => {
                        return (
                            <div
                                className="card sr-entry"
                                key={`q-${question.id}`}
                                onClick={(e) => {
                                    history.push(`/questions/${question.id}`)
                                }}
                            >
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
        query: state.searchQuestions.query,
    };
};

export default withRouter(connect(reduxToComponentMapper)(SearchResultsView));

