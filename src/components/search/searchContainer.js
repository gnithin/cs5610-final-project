import React, {Component} from 'react';
import SearchResultsView from "./searchResultsView";
import SearchBarView from "./searchBarView";
import NavBarComponent from "../navbar/NavBarComponent";

class SearchContainer extends Component {
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
            <React.Fragment>
                <SearchBarView/>
                <SearchResultsView/>
            </React.Fragment>
        );
    }
}

export default SearchContainer;
