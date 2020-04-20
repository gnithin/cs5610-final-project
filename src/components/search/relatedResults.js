import React, {Component} from 'react';
import Utils from "../../common/utils";
import {searchQuestions} from "../../services/stackOverflowService";

class RelatedResults extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props)
    }

    getStateFromProps(props) {
        return {
            query: props.query,
            results: null,
            isLoading: false,
        }
    }

    componentDidMount() {
        this.fetchResults();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.query !== this.props.query) {
            this.setState({...this.getStateFromProps(this.props)});
            this.fetchResults()
        }
    }

    fetchResults() {
        console.log("DEBUG: query - ", this.state.query);
        if (Utils.isEmptyStr(this.state.query)) {
            this.setState({
                results: null,
                isLoading: false,
            });
            return;
        }

        this.setState({
            isLoading: true,
        });

        searchQuestions(this.state.query).then(resp => {
            this.setState({
                results: resp,
            })

        }).catch((e) => {
            console.log("Error e - ", e);

        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        // TODO: loading
        if (Utils.isNull(this.state.results)) {
            return (<span></span>)
        }

        return (
            <div>
                <div className="sr-message">
                    Related - '{this.state.query}'
                </div>
                <ul className="list-group">
                    {this.state.results.items.slice(0, 10).map(
                        (eachItem, index) => {
                            return (
                                <li className="list-group-item" key={index}>
                                    <a
                                        target={'_blank'}
                                        rel="noopener noreferrer"
                                        href={eachItem.link}
                                    >
                                        {Utils.htmlUnescape(eachItem.title)}
                                    </a>
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
        );
    }
}

export default RelatedResults;
