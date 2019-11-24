import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


export const getUsers = () => {
    return { type: 'LOADING', }
};

class Home extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleUserClick = this.handleUserClick.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        this.props.onChange(e.target.value);
    }

    handleUserClick(e){
        this.props.getUsers();
    }

    render() {
        //const {userName, users } = this.props;

        const { error, isAuthenticated, token } = this.props;

		    if (!isAuthenticated) {
		      return <Redirect to="/login" />;
		    }

        return (
            <div className="Home">
                <h1>This is the HOME page </h1>
            </div>
        )
    }
}

/*function mapState(state) {
    return { 'userName': state.firstReducer.name, users: state.usersReducer.users }
}*/

function mapState(state) {
  return { 'token':state.authReducer.token, 'isAuthenticated':state.authReducer.isAuthenticated, 'error':state.authReducer.error }
}

// function mapDispatch(dispatch) {
//     return {
//         onChange(name) {
//             dispatch({ type: 'RENAME', name: name })
//         },
//         getUsers(){
//             dispatch({ type: 'LOADING', })
//         },
//     }
// }

const mapDispatchToProps = {
    getUsers
};

export default connect(mapState, mapDispatchToProps)(Home);