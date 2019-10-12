const USERS_URL = "https://randomuser.me/api/?results=5000";

export default class Api {

    fetchUsers(){
        console.log("Api.fetchUsers()")
        return fetch(USERS_URL)
            .then( res => res.json())
            .then( jsonData => { console.log("data", jsonData);return jsonData; })
            .catch( err => console.log(err))
    }
}