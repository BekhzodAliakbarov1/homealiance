import { combineReducers } from "redux";
import { selectedFormReducer } from './formRender'
import _ from "lodash";


export const fetchTypeOfServiceReducer = (state = [], action) => {
    switch (action.type) {
        case "SELECTED_SERVICE_TYPE":
            return action.payload
        default:
            return state;
    }
};

export const fetchDescriptionReducer = (state = 'No description', action) => {
    switch (action.type) {
        case "DESCRIPTION":
            return action.payload
        default:
            return state;
    }
};

export const fetchDateTimeReducer = (state = [], action) => {
    switch (action.type) {
        case "DATE_TIME":
            return action.payload
        default:
            return state;
    }
};

export const fetchUserInformationReducer = (state = [], action) => {
    switch (action.type) {
        case "USER_INFORMATION":
            return action.payload
        default:
            return state;
    }
};


export const fetchCurentLocationReducer = (state = [], action) => {
    switch (action.type) {
        case "CURRENT_LOCATION":
            return action.payload
        default:
            return state;
    }
};

export const fetchAdressReducer = (state = [], action) => {
    switch (action.type) {
        case "ADRESS":
            return action.payload
        default:
            return state;
    }
};

export const bookNowReducer = (state = [], action) => {
    switch (action.type) {
        case "BOOK_NOW":
            return action.payload
        default:
            return state;
    }
};



//ALL APIS
const fetchAdminsReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_API_ADMINS":
            return [action.payload];
        default:
            return state;
    }
};
const fetchOrdersReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_API_ORDERS":
            return [action.payload];
        default:
            return state;
    }
};
//CRUD OPERATIONS
const productReducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return { ...state, [action.payload.id]: action.payload };
        case "EDIT_PRODUCT":
            return { ...state, [action.payload.id]: action.payload };
        case "DELETE_PRODUCT":
            return _.omit(state, action.payload);
        default:
            return state;
    }
};
// Current Admin
const currentAdminReducer = (state = [], action) => {
    switch (action.type) {
        case "CURENT_ADMIN":
            return [action.payload];
        case 'CURENT_ADMIN_LOGOUT':
            return []
        default:
            return state;
    }
};
//Read All

const readEachOne = (state = [], action) => {
    switch (action.type) {
        case "READ_ADMIN":
            return [action.payload];
        case 'READ_ORDER':
            return [action.payload];
        default:
            return state;
    }
};

//SELECTED_FOR_ANY_ACTION
const selectedForAnyActionReducer = (state = [], action) => {
    switch (action.type) {
        case "SELECTED_ANY_ITEM":
            return [action.payload];
        default:
            return state;
    }
};



export default combineReducers({
    selectedData: selectedFormReducer,
    serviceType: fetchTypeOfServiceReducer,
    describtion: fetchDescriptionReducer,
    dateTime: fetchDateTimeReducer,
    userInformation: fetchUserInformationReducer,
    currentLocation: fetchCurentLocationReducer,
    adress: fetchAdressReducer,
    booked: bookNowReducer,

    // APIS
    productsAdmins: fetchAdminsReducer,
    order: fetchOrdersReducer,
    admin: currentAdminReducer,
    read: readEachOne,
    productReducer: productReducer,
    selected: selectedForAnyActionReducer,
})