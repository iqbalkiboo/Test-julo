import React from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
// import { auth } from './../../../Firebase.js'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: '',
        registerForm: false
    }

    messageTimeout = () => {
        this.timing = setTimeout(() => {
            this.setState({
                errorMessage: null
            });
        }, 3500);
    }

    componentWillUnmount() {
        clearTimeout(this.timing);
    }

    toggleRegister = () => {
        this.setState({ registerForm: !this.state.registerForm })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    validation = () => {
        const regEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        if (!regEmail.test(this.state.email) || this.state.password.length < 6) {
            this.setState({ errorMessage: `Invalid e-mail or password, please try again!` })
            this.messageTimeout()
            return false;
        } else
            return true
    }

    firebaseError = (err) => {
        console.log(err.message)
        this.setState({ errorMessage: err.message })
        this.messageTimeout()
    }

    createNewAccount = (e) => {
        e.preventDefault();
        const isValid = this.validation()
        if (!isValid)
            return
        else {
            // auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            //     .then((cred) => {
            //         this.props.showForm()
            //     }).catch((err) => {
            //         this.firebaseError(err)
            //     });
        }
    }

    login = (e) => {
        e.preventDefault();
        const isValid = this.validation()
        if (!isValid)
            return
        else {
            // auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            //     .then((cred) => {
            //         this.props.showForm()
            //     }).catch((err) => {
            //         this.firebaseError(err)
            //     });
        }
    }

    render() {
        return (
            <div className="loginWrapper flex shadow radius">
                <div className="login flex flexCenter">
                    <FontAwesomeIcon icon={faWindowClose}
                        className="loginX"
                        onClick={this.props.showForm} />
                    <h2 className="formHeading">{!this.state.registerForm ? "Login" : "Sign Up"}</h2>
                    {!this.state.registerForm ?
                        <p className="signUpQuestion">Don't have an account?
                        <button className="registerBtn"
                                onClick={this.toggleRegister}>Sign Up</button>
                        </p> : null}
                    <form className="login-form flex flexCenter p1">
                        <label htmlFor="login-email" className="block">Email</label>
                        <input type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="block formInput radius"
                            placeholder="Enter your email"
                            required />
                        <label htmlFor="login-password" className="block">Password</label>
                        <input type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password"
                            className="block formInput radius"
                            placeholder="Enter your password"
                            minLength="6"
                            required />
                        <div className="errorContainer">
                            <p className="error">{this.state.errorMessage}</p>
                        </div>

                        {!this.state.registerForm ?
                            <button type="submit"
                                onClick={this.login}
                                className="submitLogin btn radius">Login</button>
                            : null
                        }
                        {this.state.registerForm ?
                            <button type="submit"
                                onClick={this.createNewAccount}
                                className="submitSignup btn radius">Create account</button>
                            : null
                        }
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;