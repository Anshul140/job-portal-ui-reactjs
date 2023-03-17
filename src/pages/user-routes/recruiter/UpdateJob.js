import { useNavigate, useParams } from "react-router-dom"
import Base from "../../../components/Base"
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label, Row, Col, FormFeedback } from "reactstrap"
import { toast } from "react-toastify"
import { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { getAllSkills, getJobById, updateJobById } from "../../../services/user_service"

const UpdateJob = () => {

  const navigate = useNavigate();
  const { jobId } = useParams()
  const [skills, setSkills] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState({
    title:'',
    ctc:'',
    location:'',
    requiredSkills:[]
  })

  const [errObj, setErrObj] = useState({})

  const [error, setError] = useState({
    errors:{},
    isError:false
  })


  useEffect(() => {
    getAllSkills().then(resp => {
      setSkills(resp)
    }).catch(err => {
      console.log(err)
    })

    getJobById(jobId).then(res => {
        setData(res)
        console.log(data.requiredSkills)
        console.log("get job by id: ", res)
    }).catch(err => {
        console.log(err)
    })
  }, [])

  const handleChange = (event, field) => {

    //dynamic setting of properties
    setData({...data, [field]:event.target.value})
    // console.log(data)
  }

  const resetData = () => {
    setData({
      title:'',
      ctc:'',
      location:'',
      requiredSkills:[]
    })
  }

  const submitForm = (e) => {
    
    e.preventDefault()
    //call server api for sending data
    updateJobById(jobId, data).then((resp) => {
    //  console.log(resp)
    //  console.log("success log")
     toast.success("Job is updated successfully.")

     setData({
      title:'',
      ctc:'',
      location:'',
      requiredSkills:[]
     })
     setSubmitted(true)
    //  setSelectedList([])

      navigate("/user/my-jobs")
    }).catch((error) => {
     console.log("raw error: ",error)
     
     const errors = error.response?.data?.errors
     const errorsCustomized = errors.reduce((acc, error) => {
      const field = error.field;
      const message = error.defaultMessage;

      if(acc[field]) {
        acc[field].push("  ")
        acc[field].push(message)
      } else {
        acc[field] = [message]
      }

      return acc;
     }, {})

     console.log("Final Customized: ",errorsCustomized)

     setErrObj(errorsCustomized)

    //  toast.error("Couldn't Perform Update Operation! Something went wrong :/")
     setError({
       errors:error,
       isError: true
     })
    })
    
    // console.log("Submit button trigerred...",data)
 }

  const handleSelected = (selectedItems) => {
    // console.log(selectedItems)
    const selectedSkills = selectedItems.map(({skillId: id, skillName: name}) => ({id, name}))
    // console.log("selected skills: ",selectedSkills)
    // setSelectedList(selectedItems)
    setData((prevState) => ({
      ...prevState,
      requiredSkills: selectedSkills
    }))
    console.log(data)
  }

  
  return (
    <Base>
        <Container>
           <Row className="mt-4 mb-4">
             <Col sm={{size:6, offset:3}}>
                <Card color="dark" inverse>
                <CardHeader>
                  <h3>Update Job</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={submitForm}>
                    {/* Title field */}
                    <FormGroup>
                      <Label for="title">Enter Title</Label>
                      <Input 
                        type="text" 
                        id="title" 
                        placeholder="title" 
                        onChange={(e) => handleChange(e, 'title')}
                        value={data.title}
                        invalid={ errObj?.name ? true:false }
                      />
                      <FormFeedback>
                        {errObj.name}
                      </FormFeedback>
                    </FormGroup>

                    {/* Salary field */}
                    <FormGroup>
                      <Label for="ctc">Enter Salary</Label>
                      <Input 
                        type="text" 
                        id="ctc" 
                        placeholder="ctc" 
                        onChange={(e) => handleChange(e, 'ctc')}
                        value={data.ctc}
                        invalid={ errObj?.ctc ? true : false }
                      />
                      <FormFeedback>
                        { errObj.ctc }
                      </FormFeedback>
                    </FormGroup>
                    {/* Location field */}
                    <FormGroup>
                      <Label for="location">Enter Location</Label>
                      <Input 
                        type="text" 
                        id="location" 
                        placeholder="location" 
                        onChange={(e) => handleChange(e, 'location')}
                        value={data.location}
                        invalid={ errObj?.location ? true : false }
                      />
                      <FormFeedback>
                        { errObj.location }
                      </FormFeedback>
                    </FormGroup>
                    {/* Skills field */}
                    <FormGroup>
                      <Label for="skills">Add Skills</Label>
                      <Multiselect
                        options={skills}
                        // selectedValues={data.requiredSkills}
                        displayValue="skillName"
                        style={{option: {color: 'black'}}}
                        onSelect={handleSelected}
                        onRemove={handleSelected}
                      />
                    </FormGroup>
                      <Container className="text-center">
                        <Button color="dark">Update</Button>
                        <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                      </Container>
                  </Form>
                </CardBody>
              </Card>
             </Col>
           </Row>
         </Container>
    </Base>
  )
}
export default UpdateJob