import React, { Component } from 'react'
import { signUp, signIn } from './guitar-api.js';

export default class AuthPage extends Component {
    state = {
        signInEmail: '',
        signInPassword: '',
        signupEmail: '',
        signupPassword: '',
        error: null,
    }

    handleSignUp = async (e) => {
        e.preventDefault();

        const user = await signUp({
            email: this.state.signupEmail,
            password: this.state.signupPassword
        });

        this.props.handleToken(user.body.token);
        this.props.history.push('/');
    }


    handleSignIn = async (e) => {
        e.preventDefault();
        
        try {
            const user = await signIn({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            });
    
            this.props.handleToken(user.body.token);
            this.props.history.push('/');
        } catch(e) {

            this.setState({ error: e.response.body.error})
        }
    }

    render() {
        return (
            <div>
                {!!this.state.error && <h2>{this.state.error}</h2>}
                <form onSubmit={this.handleSignIn}>
                    Sign In?
                    <label>
                        Email
                        <input onChange={e => this.setState({ signInEmail: e.target.value })} value={this.state.signInEmail}/>
                    </label>
                    <label>
                        Password
                        <input type="password" onChange={e => this.setState({ signInPassword: e.target.value })} value={ this.state.signInPassword}/>
                    </label>
                    <button>Submit</button>
                </form>
                <form onSubmit={this.handleSignUp}>
                    Sign Up?
                    <label>
                        Email
                        <input onChange={e => this.setState({ signupEmail: e.target.value })} value={this.state.signupEmail}/>
                    </label>
                    <label>
                        Password
                        <input type="password" onChange={e => this.setState({ signupPassword: e.target.value })} value={ this.state.signupPassword}/>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
