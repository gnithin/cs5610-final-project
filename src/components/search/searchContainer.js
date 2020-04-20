import React, {Component} from 'react';
import SearchResultsView from "./searchResultsView";
import SearchBarView from "./searchBarView";
import NavBarComponent from "../navbar/NavBarComponent";
import Utils from "../../common/utils";
import {searchQuestionsService} from "../../services/questionService";
import {connect} from "react-redux";
import SearchQuestionActions from "../../redux/actions/searchQuestionsActions";
import RelatedResults from "./relatedResults";

const SEARCH_PARAM = "query";

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        let query = new URLSearchParams(this.props.location.search);
        this.initialQuery = query.get(SEARCH_PARAM);

        this.state = {
            isLoading: false,
            isError: false,
            query: this.initialQuery,
        };
    }

    componentDidMount() {
        if (false === Utils.isEmptyStr(this.initialQuery)) {
            this.performSearchHandler(this.initialQuery);
        }
    }

    componentWillUnmount() {
        this.props.resetSearchResults();
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
                    <div className="col-12 col-md-6">
                        <SearchResultsView
                            isLoading={this.state.isLoading}
                            isError={this.state.isError}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <RelatedResults
                            query={this.state.query}
                        />
                    </div>
                </div>
            </div>
        );
    }

    performSearchHandler(query) {
        this.setState({
            isLoading: true,
            isError: false,
            query: query,
        });

        searchQuestionsService(query).then(resp => {
            this.props.setSearchResults(resp, query);

        }).catch(e => {
            this.props.resetSearchResults();
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
        setSearchResults: (results, query) => {
            return dispatcher(SearchQuestionActions.setResults(results, query));
        },
        resetSearchResults: () => {
            return dispatcher(SearchQuestionActions.resetResults());
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchContainer);
