import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../actions'

class Header extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this)
    }
    signOut(){
        console.log("SignOut account!")
        this.props.signOut()
    }
    render(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style = {{marginBottom: '30px'}}>
            <Link className="navbar-brand" to="/">Auth_Node</Link>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/Dashboard">Dashboard</Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                { !this.props.isAuth ? 
                    [<li className="nav-item" key="signup">
                        <Link className="nav-link" to="/Signup">Signup</Link>
                    </li>,
                    <li className="nav-item" key="signin">
                        <Link className="nav-link" to="/Signin">Signin</Link>
                    </li>] :null}
                { this.props.isAuth ? 
                    <li className="nav-item">
                        <Link className="nav-link" to="/Signout" onClick={this.signOut}>Signout</Link>
                    </li> :null}
            </ul>
        </nav>
    ); 
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, actions)(Header)