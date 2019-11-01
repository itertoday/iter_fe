export const USERS_URL = "https://randomuser.me/api/?results=5000";
export const REQUESTS_URL = "http://localhost:8000/requests/";
export const PRODUCTS_URL = "http://localhost:8000/products/";
export const PRICING_URL = "http://localhost:8000/pricing/";


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