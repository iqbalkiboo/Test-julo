import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import Header from './components/layout/Header'
import SearchContainer from './components/search/SearchContainer/SearchContainer'
import MoviesList from './components/search/MoviesList/MoviesList'
import Login from './components/search/Login/Login'
import { auth } from './Firebase.js'


class App extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem('user')),
    showLogin: false
  }

  componentDidMount() {
    this.authListener()
  }

  authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
        localStorage.setItem('user', JSON.stringify(user))
      }
      else {
        this.setState({ user: null })
        localStorage.removeItem('user')
      }
    });
  }

  showForm = () => {
    this.setState({ showLogin: !this.state.showLogin })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            {this.state.showLogin ? <div className="overlay"
              onClick={this.showForm}></div>
              : null}
            {this.state.showLogin ? <Login showForm={this.showForm} /> : null}
            <Header {...this.state} showForm={this.showForm} />
            <Route exact path='/'
              render={(props) =>
                <SearchContainer {...props}
                  user={this.state.user} />}>
            </Route>
            {this.state.user ?
              <Route path='/movies_list/'
                render={(props) =>
                  <MoviesList {...props}
                    user={this.state.user} />}>
              </Route> :
              <Redirect to='/' />
            }
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
