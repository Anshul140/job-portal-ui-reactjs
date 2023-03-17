import Base from '../../../components/Base'
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label, Row, Col, FormFeedback } from "reactstrap"
import { createJob, getAllSkills } from '../../../services/user_service'
import { toast } from "react-toastify"
import { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { useNavigate } from 'react-router-dom'

const AddJob = () => {

  const navigate = useNavigate();

  const [skills, setSkills] = useState([])

  const [submitted, setSubmitted] = useState(false)

  const [errObj, setErrObj] = useState({})

  const [error, setError] = useState({
    errors: null
  })

  useEffect(() => {
    if(submitted) {
      setData({...data, requiredSkills:[]})
      setSubmitted(false)
    }
  }, [submitted])

 
  useEffect(() => {
    getAllSkills().then(resp => {
      setSkills(resp)
      // console.log("skills: ", skills)
      // console.log("resp: ", resp)

    }).catch(err => {
      console.log(err)
    })
  }, [])

  const [data, setData] = useState({
    title:'',
    ctc:'',
    location:'',
    requiredSkills:[]
  })



  const handleSelected = (selectedItems) => {
    // if(selectedItems.size() === 0) {
    //   toast.error("Please provide at least one skill required for job!")
    //   return;
    // }
    console.log("selected items: ",selectedItems)
    const selectedSkills = selectedItems.map(({skillId: id, skillName: name}) => ({id, name}))
    // console.log("selected skills: ",selectedSkills)
    // setSelectedList(selectedItems)
    setData((prevState) => ({
      ...prevState,
      requiredSkills: selectedSkills
    }))
    console.log(data)
  }

  const resetData = () => {
    setData({
      title:'',
      ctc:'',
      location:'',
      requiredSkills:[]
    })
  }

  // handle change
  const handleChange = (event, field) => {

    //dynamic setting of properties
    setData({...data, [field]:event.target.value})
    // console.log(data)
  }

  //submitting the form
  const submitForm = (e) => {
    e.preventDefault()

    if(data.requiredSkills.length === 0 && data.ctc !== '' && data.location !== '' && data.title !== '') {
      toast.error("Please provide at least one required skill for the job")
      return
    }
    //call server api for sending data
    console.log("data: ",data)
    createJob(data).then((resp) => {
    //  console.log(resp)
    //  console.log("success log")
     toast.success("Job is added successfully.")
     navigate("/user/my-jobs")
     setData({
      title:'',
      ctc:'',
      location:'',
      requiredSkills:[]
     })
     setSubmitted(true)
    //  setSelectedList([])
    }).catch((error) => {
     console.log(error)
     console.log("error log")


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

     setError({
       errors:error,
       isError: true
     })
    })
    
    // console.log("Submit button trigerred...",data)
 }


  return (
    <Base>
       <Container>
           <Row className="mt-4 mb-4">
             <Col sm={{size:6, offset:3}}>
                <Card color="dark" inverse>
                <CardHeader>
                  <h3>Add New Job</h3>
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
                        invalid={errObj?.title? true: false}
                      />
                      <FormFeedback>{errObj.title}</FormFeedback>
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
                        invalid={errObj?.ctc ? true : false}
                      />

                      <FormFeedback>
                        {errObj.ctc}
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
                        invalid={errObj?.location ? true: false}
                      />

                      <FormFeedback>
                        {errObj.location}
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
                        <Button color="dark">Submit</Button>
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
export default AddJob