import { type } from "@testing-library/user-event/dist/type"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Table } from "reactstrap"
import { getCurrentUserDetails, getCurrentUserRole, getCurrentUserToken, isLoggedIn } from "../../../auth"
import Base from "../../../components/Base"
import { BASE_URL } from "../../../services/helper"
import { deleteJob, getMyJobs } from "../../../services/user_service"

const MyJobs = () => {
   
    const [posts, setPosts] = useState([])

    useEffect(() => {
      getMyJobs().then(res => {
        //   console.log("res inside myJobs: ", res)
          setPosts(res)
        //   console.log("my-jobs: ", posts)
      }).catch(err => {
          console.log(err)
      })
          
    }, [])
  
    const role = getCurrentUserRole();
  
    const handleTriggerEmail = (jobId) => {
        const id = toast.loading("Email Notifications Triggered! Please while action completes...")
        fetch(`http://localhost:8080/jobs/${jobId}/trigger-emails`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        })
        .then(response => {
          console.log(response.data)
          if(response.ok) {
            toast.update(
              id, {
                render:"Email Notifications Successfully...", 
                type: "success",
                isLoading:false,
                autoClose:2000,
                className: 'rotateY animated'
              }
            )
          } else {
            toast.update(
              id, {
                render:"Something went wrong on server! Please try later :/", 
                type: "error",
                isLoading:false,
                autoClose:2000,
                className: 'rotateY animated'
              }
            )
          }
        }).catch(err => {
          console.log(err)
          toast.update(
            id, {
              render: "Something went wrong on server! Please try later :/",
              type: "error",
              isLoading: false,
              autoClose:2500,
              className: 'rotateY animated'
            }
          )
        })
    }  

    const handleDelete = (jobId) => {
        fetch(`http://localhost:8080/jobs/delete/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer "+getCurrentUserToken()
            }
        })
        .then(res => {
            if(res.ok) {
                const newPosts = posts.filter(item => item.jobId !== jobId);
                setPosts(newPosts)
            }
            else {
                toast.error('Error deleting job. Message: ', res.statusText)
            }
        }).catch(err => {
            console.log(err)
            toast.error('Error deleting job. Message: ', err)
        })
    }

    const mapDataToRows = () => 
     posts.map(item => (
      <tr key={item.jobId}>
        <td className="table-dark text-center">{item.jobId}</td>
        <td className="table-light text-center">{item.title}</td>
        <td className="table-light text-center">{item.company}</td>
        <td className="table-light text-center">{item.ctc}</td>
        <td className="table-light text-center">
          {/* {item.skillsRequired.map(skill => (
            <span style={{fontWeight: 'bolder'}}
            className="text-capitalize" key={skill.skillId}>{skill.skillName}</span>
          ))} */}
          <span style={{fontWeight: 'bolder'}}
            className="text-capitalize">
             {item.skillsRequired.map(skill => skill.skillName).join(" , ")}
          </span>
        </td>
        <td className="table-light text-center">{item.location}</td>
        <td className="table-light text-center">
            <Button tag={Link} to={`/user/update-job/${item.jobId}`} color='warning' size='sm'>Update</Button>
            <Button color='danger' size='sm' className="mx-2 my-1" onClick={() => handleDelete(item.jobId)}>Delete</Button>
            <Button color='primary' size='sm' className="mx-2 my-1" onClick={() => handleTriggerEmail(item.jobId)}>Trigger Email Notifications</Button>
        </td> 
      </tr>
     ))

  return (
    <Base>
       <div className="mx-5">
        <h1 style={{textAlign: 'center', marginTop: '10px'}}>My Job Postings</h1>
        <Table bordered dark hover responsive size="" striped >
            <thead>
                <tr>
                <th className="text-center">Job ID</th>
                <th className="text-center">Title</th>
                <th className="text-center">Company</th>
                <th className="text-center">Salary</th>
                <th className="text-center">Skills</th>
                <th className="text-center">Location</th>
                <th className="text-center">Actions</th>
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
export default MyJobs