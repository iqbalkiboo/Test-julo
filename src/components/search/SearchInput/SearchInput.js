import React from 'react'
import './SearchInput.css'

class SearchInput extends React.Component {
    state = {
        searchValue: ''
    }

    onChange = (e) => this.setState({ searchValue: e.target.value })

    onKeyUp = (e) => {
        e.preventDefault()
        this.props.getMovies(this.state.searchValue)
    }

    render() {
        return (
            <div className="searchBox flex flexCenter p1" >
                <div className="search" >
                    <h1 className="mb1">Search for movies or tv shows</h1>
                    <h3 className="mb1">Login to add movies to your watchlist and mark favorites</h3>
                    <div className="flexCenter">
                        <input type="text"
                            id="search"
                            className="radius mb1 searchArea shadow"
                            value={this.state.searchValue}
                            onChange={this.onChange}
                            autoFocus
                            placeholder="Enter title or keyword"
                            onKeyUp={this.onKeyUp} />
                        <p>Start typing to search...</p>
                    </div>
                </div >
            </div>
        )
    }
}

export default SearchInput;