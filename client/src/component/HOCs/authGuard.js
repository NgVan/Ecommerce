import React, {Component} from 'react'
import { connect } from 'react-redux';

/* 
    Connect redux from react component
        - class component: use HOC connect()
        - functional component: use hooks useSelector() & useDispatch()
*/    

const authGuard = (OriginalComponent) => {
    class MixedComponent extends Component {
        // constructor(props) {
        //     super(props);
        //     // this.onSubmit = this.onSubmit.bind(this);
        //     this.componentDidMount = this.componentDidMount.bind(this);
        //     this.componentDidUpdate = this.componentDidUpdate.bind(this);
        // }
        componentDidMount() {
            //whether the user is authenticated
            if(this.props.isAuth && this.props.jwtToken) {
                console.log("All good DidMount, user allows to entrace")
                console.log("isAuth DidMount", this.props.isAuth)
                console.log("Token DidMount", this.props.jwtToken)
            } else {
                console.log("User isn't authenticated, decline access")
                console.log("isAuth DidMount", this.props.isAuth)
                console.log("Token DidMount", this.props.jwtToken)
                this.props.history.push('/')
            }
            // if(!this.props.isAuth && !this.props.jwtToken) {
            //     this.props.history.push('/')
            // }
        }

        componentDidUpdate() {
            //whether the user is authenticated
            if(this.props.isAuth && this.props.jwtToken) {
                console.log("All good DidUpdate, user allows to entrace")
                console.log("isAuth DidUpdate", this.props.isAuth)
                console.log("Token DidUpdate", this.props.jwtToken)
            } else {
                console.log("User isn't authenticated, decline access")
                console.log("isAuth DidUpdate", this.props.isAuth)
                console.log("Token DidUpdate", this.props.jwtToken)
                this.props.history.push('/')
            }
            // if(!this.props.isAuth && !this.props.jwtToken) {
            //     this.props.history.push('/')
            // }
        }

        render(){
            return <OriginalComponent {...this.props} />
            // truyen toan bo thuoc tinh cua MixedComponent component vao OriginalComponent component
            // truyen vao component nao thi toan bo component do se co thuoc tinh cua MixedComponent 
        }
    }

    function mapStateToProps(state) {
        return {
            //  key: props muon truyen vao component
            // value: nhanh trong redux store
            isAuth: state.auth.isAuthenticated,
            jwtToken: state.auth.token
        }
    }

    return connect(mapStateToProps)(MixedComponent)
}

export default authGuard;