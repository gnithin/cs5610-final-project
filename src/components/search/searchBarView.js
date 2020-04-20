import React, {Component} from 'react';
import './searchBar.css'
import Utils from "../../common/utils";

class SearchBarView extends Component {
    constructor(props) {
        super(props);
        let initialVal = props.initialVal;
        if (Utils.isNull(initialVal)) {
            initialVal = "";
        }
        this.state = {
            query: initialVal
        };
    }

    render() {
        return (
            <form className="form-inline col-12 sb-wrapper" onSubmit={(e) => {
                e.preventDefault();
                this.props.queryCb(this.state.query);
            }}>
                <input
                    className="form-control col-11"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={this.state.query}
                    onChange={(e) => {
                        this.setState({query: e.target.value});
                    }}
                    autoFocus={true}
                />
                <button className="btn btn-primary col-1" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </form>
        );
    }
}

export default SearchBarView;
