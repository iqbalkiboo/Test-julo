import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { auth } from './../../Firebase.js'
import { withRouter } from "react-router";

class Header extends React.Component {

    logOut = (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            localStorage.removeItem('user')
            if (this.props.history.location.pathname === '/movies_list/') {
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (
            <header className="flex" id="nav">
                <nav className="flex">
                    <h4 className="logo">Movie List</h4>
                    <ul className="navUl flex">
                        <li>
                            <Link to="/">Search</Link>
                        </li>
                        {this.props.user ?
                            <li>
                                <Link to="/movies_list/">My List</Link>
                            </li>
                            : null}
                    </ul>
                </nav>
                <ul className="logging flex">
                    {!this.props.user ?
                        <li className="loggingLi">
                            <input type="button"
                                onClick={() => this.props.showForm()}
                                className="logged-out logBtn"
                                value="Login" />
                        </li>
                        : null}
                    {this.props.user ?
                        <li className="loggingLi">
                            <input type="button"
                                onClick={this.logOut}
                                value="Logout"
                                className="logged-in logBtn" />
                        </li>
                        : null}
                    {this.props.user ?
                        <li className="loggingLi">
                            <span className="account">{this.props.user.email}</span>
                        </li>
                        : null}
                </ul>
            </header>
        )
    }
}
export default withRouter(Header)