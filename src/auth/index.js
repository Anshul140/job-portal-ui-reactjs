import { toast } from "react-toastify";

//isLoggedIn 
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if(data == null) {
        return false;
    } else {
        return true;
    }
};

//doLogin => data-set to localStorage
export const doLogin = (data, next) => {
    localStorage.setItem("data",JSON.stringify(data));
    setTimeout(doLogout, 24*60*60*1000);
    next()
}

//doLogout => remove from localStorage
export const doLogout = (next) => {
    localStorage.removeItem("data")
    localStorage.removeItem("appliedJobs")
    // toast.warn("Oops!! Your 24 hours finished, Please login again to load your contents!")
    window.location.href = '/'
    next()
}

// get currentUser
export const getCurrentUserDetails = () => {
    if(isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).userDetails;
    } else {
        return undefined;
    }
}

// get currentUserToken
export const getCurrentUserToken = () => {
    if(isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).token;
    } else {
        return undefined;
    }
}

//get currentUserRole
export const getCurrentUserRole = () => {
    if(isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).userDetails.role;
    }
    else {
        return "";
    }
}