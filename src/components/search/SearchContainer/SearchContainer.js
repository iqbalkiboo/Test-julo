import React from 'react'
import RenderResults from '../RenderResults/RenderResults'
import SearchInput from '../SearchInput/SearchInput'
import Loader from '../../layout/Loader'
import axios from 'axios'

class SearchContainer extends React.Component {
  state = {
    movieSearchResult: [],
    loading: false,
    dataResponse: true
  }

  toggleLoader() {
    this.setState({ loading: !this.state.loading })
  }

  // search by keyword/title
  getMovies = (searchValue) => {
    this.toggleLoader()
    axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=a56835b9`)
      .then(res => {
        this.toggleLoader()
        if (res.data.Response !== "False") {
          this.setState({ movieSearchResult: res.data.Search, dataResponse: true })
        } else {
          this.setState({ dataResponse: false })
        }
      }).catch(err => {
        console.log(err.message);
      })
  }

  render() {
    return (
      <div className="p1" id="startSearch">
        <SearchInput getMovies={this.getMovies} />
        {(this.state.loading) ? <Loader /> : null}
        {this.state.dataResponse ?
          <RenderResults
            movieSearchResult={this.state.movieSearchResult}
            user={this.props.user} searchValue={this.state.searchValue} />
          : <div><h3>Searching for title or not found!</h3></div>}
      </div>
    )
  }
}

export default SearchContainer;