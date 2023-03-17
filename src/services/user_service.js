import { getCurrentUserToken } from "../auth";
import { myAxios, myAxios2 } from "./helper";

export const signUp = (user) => {
    return myAxios
        .post('/auth/signup', user)
        .then((response) => response.data);
};

export const loginUser = (loginDetails) => {
    return myAxios
        .post('/auth/login', loginDetails)
        .then((response) => response.data)
                 
}

export const getAllJobs = () => {
    // console.log(getCurrentUserToken())
    return myAxios
        .get('/jobs', {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        })
        .then((response) => response.data)
}

export const createJob = (JobDetails) => {
    return myAxios
        .post('/jobs', JobDetails, {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then((response) => response.data)
}

export const getMyJobs = () => {
    return myAxios
        .get('/jobs/my', {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then((response) => response.data)
}

export const applyJob = (id) => {
    return myAxios
        .post('/jobs/apply', {jobId: id},{
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            },
        }).then(response => response.data)
}

export const myAppliedJobs = () => {
    return myAxios
        .get('/jobs/applied', {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then(response => response.data)
}

export const withdrawApplication = (jobId) => {
    return myAxios
        .delete(`jobs/${jobId}`, {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then(response => response.data)
}

export const uploadResume = (file) => {

    return myAxios
        .post('/resume/upload', file, {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken(),
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
}

export const getMyResume = () => {

    return myAxios
        .get('/resume/showMyResume', {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then(response => response.data)
}

export const getResumeByUserId = (id) => {
    return myAxios2
        .get(`/resume/get/${id}`, {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then(response => response.data)
}

export const getAppliedCandidates = () => {
    return myAxios
        .get('/jobs/allApplications', {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then(response => response.data)
}

export const shortlistApplication = (aId) => {
    console.log(getCurrentUserToken())
    return myAxios
        .post(`/jobs/${aId}/shortlist`, {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then(response => response.data)
}

export const getAllSkills = () => {
    return myAxios2
        .get('/skills/getAllSkills').then(resp => resp.data)
}

export const getJobById = (id) => {
    return myAxios2
        .get(`/jobs/${id}`, {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then(resp => resp.data)
}

export const updateJobById = (id, jobData) => {
    return myAxios2.put(`/jobs/${id}`, jobData, {
        headers: {
            'Authorization': "Bearer "+getCurrentUserToken()
        }
    })
}

export const updateProfile = (id, userDetails) => {
    return myAxios2
        .put(`/auth/update/${id}`, userDetails, {
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        }).then(resp => resp.data)
}
