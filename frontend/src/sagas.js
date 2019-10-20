import { put, takeEvery, all } from 'redux-saga/effects';
import  {USERS_URL, REQUESTS_URL}  from './resource';
function* fetchUsers(){
    const json = yield fetch(USERS_URL).then( res => res.json());
    yield put({type: "LOADED_USERS", users: json});
}

function* fetchRequests(){
    const requests = yield fetch(REQUESTS_URL).then( res => res.json()).then(data => data.results);
    yield put({type: "REQUESTS_LOADED", requests});
}

function* actionUserWatcher() {
    yield takeEvery('LOADING', fetchUsers)
}

function* actionRequestsWatcher(){
    yield takeEvery('REQUESTS_LOADING', fetchRequests)
}

export default function* mySaga(){
    yield all([actionUserWatcher(), actionRequestsWatcher()])
}