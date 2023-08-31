import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { IState } from "../../model/interfaces/IState";
import { CommonReducer } from "../reducers/CommonReducer/CommonReducer";
import { OrganizationReducer } from "../reducers/OrganizationReducer/OrganizationReducer";
import { ProjectReducer } from "../reducers/ProjectReducer/ProjectReducer";
import { UserReducer } from "../reducers/UserReducer/UserReducer";

const rootReducers=combineReducers<IState>({
    organization: OrganizationReducer,
    project: ProjectReducer,
    common:CommonReducer,
    user: UserReducer

})

export const store = createStore(rootReducers,applyMiddleware(thunk))