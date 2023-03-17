import { Button, Table } from "reactstrap"
import Base from "../../../components/Base"
import { getAppliedCandidates, shortlistApplication } from "../../../services/user_service"
import { useState, useEffect } from "react"
import {toast} from 'react-toastify'
import { getCurrentUserToken } from "../../../auth"
import { Link } from "react-router-dom"


const AppliedCandidates = () => {

    const [applications, setApplications] = useState([])
    // let isLoading;
    // const setIsLoading = (x, param) => {
    //     isLoading = x;
    // }

    const handleViewResume = (id) => {

    }


    const handleShortlist = (applicationId) => {
        const id = toast.loading("Shortlist Action Triggered! Please Wait...")
        //toast.loading("Shortlist Action Triggered! Please Wait...")

        const requestOptions = {
            method: 'POST',
            headers: {Authorization: `Bearer ${getCurrentUserToken()}`}
        };

        return fetch(`http://localhost:8080/jobs/${applicationId}/shortlist`, requestOptions)
            .then(response => response.json)
            .then(data => {
                
                console.log(data)
                toast.update(
                    id, {
                        render:"Application Shortlisted Successfully.", 
                        type: "success",
                        isLoading:false,
                        autoClose:2000,
                        className: 'rotateY animated'
                    }
                );
                
                const updatedApplications = applications.map(app => {
                    if (app.applicationId === applicationId) {
                    return { ...app, status: "SHORTLISTED" }
                }
                    return app
                })
                setApplications(updatedApplications)
            }).catch(err => {
                
                toast.error(`Can't shortlist application, some error occured!`)
                console.log(err)
            })
    }

    useEffect(() => {
        getAppliedCandidates().then(response => {
            // console.log(response)
            setApplications(response)
        }).catch(err => {
        console.log(err)
        })
    }, [])

    const mapDataToRows = () => {
        return applications.map(item => {

            const {
                applicationId, 
                candidateId, 
                candidateName, 
                candidateCurrCompany,
                candidateSkills, 
                jobDto: {
                    jobId, 
                    title, 
                    location, 
                    ctc
                } 
            } = item;
            {console.log("inside-applied-candidates: ",candidateId)}
            return (
                <tr key={applicationId}>
                <td className="text-center table-dark">{applicationId}</td>
                <td className="text-center table-light">{title}</td>
                <td className="text-center table-light">{jobId}</td>
                <td className="text-center table-light">{location}</td>
                <td className="text-center table-light">{candidateName}</td>
                <td className="text-center table-light">
                {/* {candidateSkills.map(skill => (
                    <span className="mx-2 px-2 py-1" style={{background: 'rgb(86 89 94)', color:'white'}} key={skill.skillId}>{skill.skillName}</span>
                ))} */}
                    <span 
                        style={{fontWeight: 'bolder'}}
                        className="text-capitalize"
                    >
                        {candidateSkills.map(skill => skill.skillName).join(" , ")}
                    </span>
                </td>
                <td className="text-center table-light">{candidateCurrCompany}</td>
                <td className="text-center table-light"> 
                <Button 
                    color="primary" 
                    size="sm" 
                    onClick={() => handleShortlist(applicationId)}
                    disabled={item.status === "SHORTLISTED"}
                >
                    {item.status === "SHORTLISTED" ? "Shortlisted" : "Shortlist"}
                </Button> 
                <Button className="mx-1 my-1" color="primary" size="sm" tag={Link} to={`/user/candidate-resume/${candidateId}`}>View Resume</Button>
                </td>
            </tr>
        )}
      )  
    }

  return (
    <Base>
        <div className="mx-5">
        <h1 style={{textAlign: 'center', marginTop: '10px'}}>Applied Candidates</h1>
        <Table bordered dark hover responsive size="" striped >
            <thead>
                <tr>
                <th className="text-center">Application Id</th>
                <th className="text-center">Job-Title</th>
                <th className="text-center">Job-Id</th>
                <th className="text-center">Job-Location</th>
                <th className="text-center">Candidate Name</th>
                <th className="text-center">Candidate's Skills</th>
                <th className="text-center">Candidate's Organisation</th>

                {/* <th className="text-center">Candidate Current Company</th> */}
                <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
              {mapDataToRows()}
            </tbody>
        </Table>
      </div>
    </Base>
  )
}
export default AppliedCandidates