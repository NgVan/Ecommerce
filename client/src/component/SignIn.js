import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import * as actions from '../actions'
import CustomInput from "./CustomInput"

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }
    async onSubmit(formData) {
        console.log("onSubmit is called")
        console.log('formData', formData)
        // we need to call some actioncreator
        await this.props.signIn(formData)
        if(!this.props.errorMessage)
            this.props.history.push('/dashboard')
    }

    async responseFacebook (response) {
        console.log("responseFacebook",response);
        await this.props.authFacebook(response.accessToken);
        if(!this.props.errorMessage)
            this.props.history.push('/dashboard')
    }

    async responseGoogle (response) {
        console.log("responseGoogle",response);
        await this.props.authGoogle(response.accessToken);
        if(!this.props.errorMessage)
            this.props.history.push('/dashboard')
    }

    render (){
        const {handleSubmit} =this.props;
        return(
            <div className ="row">
                <div className="col">
                    <form onSubmit = {handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name = "email"
                                type = "text"
                                id = "email"
                                label = "Enter your email"
                                placeholder = 'example@gmail.com'
                                component = {CustomInput} />
                        </fieldset>
                        <fieldset>
                            <Field
                                name = "password"
                                type = "text"
                                id = "password"
                                label = "Enter your password"
                                placeholder = 'Your password'
                                component = {CustomInput} />
                        </fieldset>

                        {this.props.errorMessage? 
                        <div className = "alert alert-danger">
                            {this.props.errorMessage}
                        </div> : null}

                        <button type="submit" className = 'btn btn-primary'>Sign In</button>
                    </form>
                </div>
                <div className="col">
                    <div className = "text-center">
                        <div className = "alert alert-primary">
                            Sign in with third-party services
                        </div>
                        <FacebookLogin 
                            appId="357177895809731"
                            textButton="Facebook"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn btn-outline-primary"
                        />
                        <GoogleLogin
                            clientId="809857162407-ln9r35b6ak4q0o52kdav5458fvur0o4d.apps.googleusercontent.com"
                            render={renderProps => (
                                <button className="btn btn-outline-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
                              )}
                            buttonText="Google"
                            icon="false"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            
                        />
                    </div>
                </div>
            </div>
            
        );
    }
}

function mapStateToProps(state) {
    console.log("state: ", state);
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose (
    connect(mapStateToProps,actions),
    reduxForm({ form: 'signin' })
)(SignIn)