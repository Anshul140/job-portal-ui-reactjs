import axios from "axios"
import Multiselect from "multiselect-react-dropdown"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button, Input, InputGroup, Table } from "reactstrap"
import { getCurrentUserDetails, getCurrentUserRole, getCurrentUserToken, isLoggedIn } from "../../auth"
import Base from "../../components/Base"
import { BASE_URL } from "../../services/helper"
import { applyJob, getAllJobs, getAllSkills, getMyJobs, myAppliedJobs } from "../../services/user_service"

const AvailableJobs = () => {

  const role = getCurrentUserRole();

  const [posts, setPosts] = useState([])

  const [appliedJobs, setAppliedJobs] = useState([])

  const [selectedSkills, setSelectedSkills] = useState([])

  const [skills, setSkills] = useState([])

  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getAllJobs().then(res => {
        // console.log("res inside available jobs: ", res)
        setPosts(res)
        console.log("jobs: ", res)
    }).catch(err => {
        console.log(err)
    })    

    getAllSkills().then(response => {
      setSkills(response)
    }).catch(error => {
      console.log(error)
    })

    if(role === 'ROLE_CANDIDATE') {
      axios.get(`${BASE_URL}/jobs/applied`, {
        headers: {
            'Authorization': "Bearer "+getCurrentUserToken()
        }
      }).then(res => {
        // console.log(res.data)

        const appliedJobIds = res.data.map(application => application.jobDto.jobId)
        setAppliedJobs(appliedJobIds)
        // console.log("appliied-job-ids: ",appliedJobIds)
      })
    }
  }, [])
 
  const handleApply = (id) => {
  
      applyJob(id).then(res => {
        toast.success("Applied to job successfully", res)
        // console.log(res)
        setAppliedJobs([...appliedJobs, id])
      }).catch(err => {
        toast.error("Failed to apply for the job! Error: ", err)
      }) 
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredJobs = posts.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const companyMatch = job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const skillsMatch = job.skillsRequired.some((skill) => 
      skill.skillName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const locationMatch = job.location.toLowerCase().includes(searchTerm.toLowerCase());

    return titleMatch || companyMatch || skillsMatch || locationMatch;
  })

  const mapDataToRows = () => {
     let filteredPosts = posts;
    
     return filteredJobs.map(item => (
      <tr key={item.jobId}>
        <td className="table-dark text-center">{item.jobId}</td>
        <td className="table-light text-center">{item.title}</td>
        <td className="table-light text-center">{item.company}</td>
        <td className="table-light text-center">{item.ctc}</td>
        <td className="font-weight-bold table-light text-center">
          <span 
            style={{fontWeight: 'bolder'}}
            className="text-capitalize"
          >
            {item.skillsRequired.map(skill => skill.skillName).join(" , ")}
          </span>
        </td>
        <td className="table-light text-center">{item.location}</td>
        {
          role === 'ROLE_CANDIDATE' ?
          <td className="table-light text-center">
            {
              appliedJobs.includes(item.jobId) ? (
                <Button size="sm" color='primary' disabled>Applied</Button>
              ): (
                <Button size="sm" color='primary' onClick={() => handleApply(item.jobId)}>Apply</Button>
              )
            }
          </td> :
          null
        }
      </tr>
     ))
  }

  return (
    <Base>
       <div className="mx-5">
        <h1 style={{textAlign: 'center', marginTop: '10px'}}>Job Openings</h1>
        <div className="my-3">
          <Input type="text" placeholder="Search by title, company, location or skill" onChange={handleSearch}/>
        </div>
        <Table bordered dark hover responsive size="" striped >
            <thead>
                <tr>
                <th className="text-center">#ID</th>
                <th className="text-center">Title</th>
                <th className="text-center">Company</th>
                <th className="text-center">Salary</th>
                <th className="text-center">Desired Skills</th>
                <th className="text-center">Location</th>
                {role === 'ROLE_CANDIDATE' ? <th className="text-center">Action</th>: null}
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
export default AvailableJobs

/*


  


*/