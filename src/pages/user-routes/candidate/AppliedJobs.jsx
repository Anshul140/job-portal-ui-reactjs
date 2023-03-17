import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button, Table } from "reactstrap"
import Base from "../../../components/Base"
import { myAppliedJobs, withdrawApplication } from "../../../services/user_service"

const AppliedJobs = () => {

  const [posts, setPosts] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])

  const handleWithdraw = ( applicationId, jobId) => {
    withdrawApplication(applicationId).then(res => {
      // console.log(res)
      toast.success("Application withdrawn successfully.")


      // get stored jobs from localStorage
      const storedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];

      // remove specific jobId from storedJobs
      const updatedJobs = storedJobs.filter(id => id !== jobId)

      // set the updated array back in localStorage
      localStorage.setItem('appliedJobs', JSON.stringify(updatedJobs))

      // update the state of appliedJobs
      setAppliedJobs(updatedJobs)
    }).catch(err => {
      toast.error(`Can't withdraw application, some error occured!`)
      console.log(err)
    })

  }

  useEffect(() => {
    myAppliedJobs().then(response => {
      // console.log(response)
      setPosts(response)
    }).catch(err => {
      console.log(err)
    })
  }, [appliedJobs])

  const mapDataToRows = () => 
     posts.map(item => (
      <tr key={item.applicationId}>
        <td className="table-dark text-center">{item.applicationId}</td>
        <td className="table-light text-center">{item.jobDto.title}</td>
        <td className="table-light text-center">{item.jobDto.company}</td>
        <td className="table-light text-center">{item.jobDto.ctc}</td>
        {/* <td>{item.skills}</td> */}
        <td className="table-light text-center">{item.jobDto.location}</td>
        <td className="table-light text-center">{item.jobDto.jobId}</td>
        <td className="table-light text-center"> 
          <Button 
            color="danger" 
            size="sm" 
            onClick={()=>handleWithdraw(item.applicationId, item.jobDto.jobId)}
          >
            Withdraw
          </Button> 
        </td>
      </tr>
     ))
  



  return (
    <Base>
      <div className="mx-5">
        <h1 style={{textAlign: 'center', marginTop: '10px'}}>My Applications</h1>
        <Table bordered dark hover responsive size="" striped >
            <thead>
                <tr>
                <th className="text-center">#ID</th>
                <th className="text-center">Title</th>
                <th className="text-center">Company</th>
                <th className="text-center">Salary</th>
                {/* <th>Skills</th> */}
                <th className="text-center">Location</th>
                <th className="text-center">Job ID</th>
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
export default AppliedJobs