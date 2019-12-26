import {server} from '../package.json';

const { root } = server;

export const USERS_URL = "https://randomuser.me/api/?results=5000";
export const REQUESTS_URL = `${root}/requests/`;
export const PRODUCTS_URL = `${root}/products/`;
export const PRICING_URL = `${root}/pricing/`;
export const ORDERS_URL = `${root}/orders/`;
export const LOGIN_URL = "http://127.0.0.1:8000/login/";
export const LOGOUT_URL = "http://127.0.0.1:8000/logout/";
export const REGISTRATION_URL = "http://127.0.0.1:8000/users/";

/*


{
"products": [
    {"quantity": 3, "product_type": "Nuevo"},
    {"quantity": 2, "product_type": "Recarga"}
]
}


*/
// export class Api {

//     fetchUsers(){
//         console.log("Api.fetchUsers()")
//         return fetch(USERS_URL)
//             .then( res => res.json())
//             .then( jsonData => { console.log("data", jsonData);return jsonData; })
//             .catch( err => console.log(err))
//     }

//     fetchRequests(){
//         return fetch(REQUESTS_URL)
//             .then( res => res.json())
//             .then( jsonData => { console.log("requests data", jsonData);return jsonData.results; })
//             .catch( err => console.log(err));
//     }
// }