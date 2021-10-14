import React from 'react';
import SingleMovieBox from '../SingleMovieBox/SingleMovieBox';
import './RenderResults.css';

class RenderResults extends React.Component {
    state = {
        movieSearchResult: this.props.movieSearchResult
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.movieSearchResult !== this.props.movieSearchResult)
            this.setState({ movieSearchResult: this.props.movieSearchResult })
    }

    render() {
        return (
            <div className="renderResult">
                {this.state.movieSearchResult.map((movie, index) => {
                    return <SingleMovieBox
                        key={index} movie={movie}
                        searchValue={this.props.searchValue}
                        user={this.props.user} />
                })}
            </div>
        )
    }
}

export default RenderResults;