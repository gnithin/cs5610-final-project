import React, {Component} from 'react';
import SearchResultsView from "./searchResultsView";
import SearchBarView from "./searchBarView";
import NavBarComponent from "../navbar/NavBarComponent";
import Utils from "../../common/utils";
import {searchQuestionsService} from "../../services/questionService";
import {connect} from "react-redux";
import SearchQuestionActions from "../../redux/actions/searchQuestionsActions";

const SEARCH_PARAM = "query";

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        let query = new URLSearchParams(this.props.location.search);
        this.initialQuery = query.get(SEARCH_PARAM);

        this.state = {
            isLoading: false,
            isError: false,
        };
    }

    componentDidMount() {
        if (false === Utils.isEmptyStr(this.initialQuery)) {
            this.performSearchHandler(this.initialQuery);
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBarComponent/>
                {this.renderSearch()}
            </React.Fragment>
        );
    }

    renderSearch() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <SearchBarView
                        initialVal={this.initialQuery}
                        queryCb={this.performSearchHandler.bind(this)}
                    />
                </div>
                <div className="row">
                    <SearchResultsView
                        isLoading={this.state.isLoading}
                        isError={this.state.isError}
                    />
                </div>
            </div>
        );
    }

    performSearchHandler(query) {
        this.setState({
            isLoading: true,
            isError: false,
        });

        searchQuestionsService(query).then(resp => {
            this.props.setSearchResults(resp);

        }).catch(e => {
            this.setState({
                isError: true,
            })

        }).finally(() => {
            this.setState({
                isLoading: false,
            })

        });
       
        console.log("Got query! - ", query);
        window.history.pushState({}, "", `?${SEARCH_PARAM}=${query}`)
    }
}

const reduxToComponentMapper = (state) => {
    return {
        questions: state.searchQuestions.questions,
    };
};

const componentToReduxMapper = (dispatcher) => {
    return {
        setSearchResults: (results) => {
            return dispatcher(SearchQuestionActions.setResults(results));
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchContainer);
