import React from 'react'
import MovieDetails from '../MovieDetails/MovieDetails'
import './SingleMovieBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'

class SingleMovieBox extends React.Component {
    state = {
        on: false
    }

    toggle = () => {
        this.setState({
            on: !this.state.on
        })
    }

    render() {
        return (
            <div className="movieBoxWrapper">
                <div className="movieBox p1 grid radius">
                    <img src={this.props.movie.Poster === 'N/A' ?
                        require('./../../../assets/noimage.jpg')
                        : this.props.movie.Poster}
                        alt="film poster"
                        className="block smallImage shadow" />
                    <div className="movieInfo flex">
                        <p className="movieTitle">{this.props.movie.Title}</p>
                        <p className="movieYear">Year: {this.props.movie.Year}</p>
                        <p className="movieType">Type: {this.props.movie.Type}</p>
                    </div>
                    <div onClick={this.toggle} className="btnDetailsWrapper flex flexCenter">
                        <p className="detailsText">More details</p>
                        <p className="arrow"><FontAwesomeIcon icon={faAngleDoubleDown} /></p>
                    </div>
                </div>
                {this.state.on && <MovieDetails
                    movieId={this.props.movie.imdbID}
                    user={this.props.user} />}
            </div>
        )
    }
}

export default SingleMovieBox;