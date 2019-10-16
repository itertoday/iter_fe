import React from 'react';
import { connect } from 'react-redux'


export const getUsers = () => {
    console.log("getUsers() action");
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
        const {userName, users } = this.props;
        return (
            <div className="Home">
                <p>this is home. But also displaying redux value: {userName}. Amount of users: {users.length}</p>
                <input type="text" placeholder="Enter new name" onChange={this.handleChange} />
                <button onClick={this.handleUserClick}>Load Users</button>
            </div>
        )
    }
}

function mapState(state) {
    return { 'userName': state.firstReducer.name, users: state.usersReducer.users }
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