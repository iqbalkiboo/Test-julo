import React from 'react';
import Loader from '../../layout/Loader';
import { db } from './../../../Firebase.js'
import './MoviesList.css'
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons'

class MoviesList extends React.Component {
    state = {
        fetchedDatabase: [],
        loading: false,
    }

    toggleLoader() {
        this.setState({ loading: !this.state.loading })
    }

    componentDidMount() {
        this.fetchMoviesCollection()
    }

    // firebase realtime (snapshot) functions for fetching and sorting data
    snapshotFunction = (snapshot, moviesArr) => {
        snapshot.docs.forEach(doc => {
            const film = doc.data()
            film.dbId = doc.id
            moviesArr.push(film)
        })
        this.setState({
            fetchedDatabase: moviesArr
        })
    }

    fetchMoviesCollection = () => {
        this.toggleLoader()
        if (this.props.user) {
            const moviesArr = []
            db.collection('movies')
                .where('userUid', '==', this.props.user.uid)
                .get()
                .then((snapshot) => {
                    this.toggleLoader()
                    this.snapshotFunction(snapshot, moviesArr)
                }, err => console.log(err.message));
        }
    }

    sortByAbc = () => {
        const moviesArr = []
        db.collection('movies')
            .orderBy('title')
            .where('userUid', '==', this.props.user.uid)
            .get()
            .then((snapshot) => {
                this.snapshotFunction(snapshot, moviesArr)
            }, err => console.log(err.message));
    }

    sortByRating = () => {
        const moviesArr = []
        db.collection('movies')
            .orderBy('imdbRate')
            .where('userUid', '==', this.props.user.uid)
            .get()
            .then((snapshot) => {
                this.snapshotFunction(snapshot, moviesArr)
            }, err => console.log(err.message));
    }

    // updating data Firebase Firestore functions
    getUpdatedData = () => {
        const moviesArr = []
        db.collection('movies')
            .where('userUid', '==', this.props.user.uid)
            .get()
            .then((data) => {
                data.docs.forEach(doc => {
                    const film = doc.data()
                    film.dbId = doc.id
                    moviesArr.push(film)
                })
                this.setState({
                    fetchedDatabase: moviesArr
                })
            }).catch(err => console.log(err.message))
    }

    deleteItem = (e) => {
        let id = e.target.parentElement.parentElement.getAttribute('id');
        db.collection("movies").doc(id).delete()
            .then(() => {
                this.getUpdatedData()
            })
    }

    addToFavorites = (e) => {
        let id = e.target.parentElement.parentElement.getAttribute('id');
        db.collection('movies').doc(id).update({
            favorite: true
        }).then(() => {
            this.getUpdatedData()
        })
    }

    render() {
        return (
            <div className="watchlist p1 flex flexCenter" id="mylist">
                <h1 id="watchlist">Watchlist</h1>
                {this.props.user ?
                    <div className="listContainer">
                        {(this.state.loading) ? <Loader /> : null}
                        <div className="buttons flex flexCenter">
                            <button
                                onClick={this.sortByAbc}
                                className="btnSort radius">Sort A-Z</button>
                            <button
                                onClick={this.sortByRating}
                                className="btnSort radius">Sort by IMDB rating</button>
                        </div>
                        <ul className="list flex flexCenter">
                            {this.state.fetchedDatabase.map((movie) => (
                                <li key={movie.dbId}
                                    id={movie.dbId}
                                    className="grid listItem">
                                    <div className="titlesWrapper flex flexCenter">
                                        <h3>{movie.title}</h3>
                                        <h5>Year: {movie.year}</h5>
                                        <h5>Type: {movie.type}</h5>
                                        <h5>Genre: {movie.genre}</h5>
                                    </div>
                                    <img
                                        src={movie.image === 'N/A' ?
                                        require('./../../../assets/noimage.jpg')
                                        : movie.image}
                                        alt="film poster"
                                        className="block listImage shadow" />
                                    <div className="imdbWrapper flex">
                                        <h4>Imdb Rating: {movie.imdbRate}</h4>
                                        <h5>
                                            <a href={movie.imdbLink}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                className="imdbLink">IMDB Link</a>
                                        </h5>
                                        <p className={movie.favorite ? 'star yellow' : 'star'} >&#10031;</p>
                                    </div>
                                    <div className="favWrapper flex flexCenter">
                                        <button onClick={this.addToFavorites}
                                            className="btnList addFav radius"
                                            disabled={movie.favorite}>Add to favorites</button>
                                        <button onClick={e =>
                                            window.confirm("Are you sure you want to delete this item?") &&
                                            this.deleteItem(e)}
                                            className="btnList delete radius">Delete</button>
                                    </div>
                                </li>
                            ))}
                            <HashLink
                                to="#watchlist"
                                scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'end' })}
                                className="topLink hash radius">Back To Top &nbsp; <FontAwesomeIcon icon={faHandPointUp} className="handIcon" />
                            </HashLink >
                        </ul>
                    </div>
                    : <h3>Login or create account to manage your list!</h3>
                }
            </div>
        )
    }
}

export default MoviesList;