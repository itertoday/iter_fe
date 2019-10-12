import { put, takeEvery, all } from 'redux-saga/effects';
const USERS_URL = "https://randomuser.me/api/?results=5000";

function* fetchUsers(){
    console.log("* fetchUsers()");
    const json = yield fetch(USERS_URL).then( res => res.json());
    yield put({type: "LOADED_USERS", users: json});
}

function* actionWatcher() {
    console.log("actionWatcher()")
    yield takeEvery('LOADING', fetchUsers)
}

export default function* mySaga(){
    yield all([actionWatcher(),])
}