import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label, Row, Col, FormFeedback } from "reactstrap"
import Base from "../components/Base"
import {getAllSkills, signUp} from '../services/user_service'
import { toast } from "react-toastify"
import Multiselect from 'multiselect-react-dropdown'
import { useNavigate } from "react-router-dom"


const Signup = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    name:'',
    email:'',
    password:'',
    company:'',
    contactNumber:'',
    role:'recruiter',
    skills:[]
  })
  const [skills, setSkills] = useState([])

  const [errObj, setErrObj] = useState({})

  useEffect(() => {
    getAllSkills().then(resp => {
      setSkills(resp)
      console.log("skills: ", skills)
      console.log("resp: ", resp)

    }).catch(err => {
      console.log(err)
    })
  }, [])

  const handleSelected = (selectedItems) => {
    // console.log(selectedItems)
    const selectedSkills = selectedItems.map(({skillId: id, skillName: name}) => ({id, name}))
    // console.log("selected skills: ",selectedSkills)
    // setSelectedList(selectedItems)
    setData((prevState) => ({
      ...prevState,
      skills: selectedSkills
    }))
    console.log(data)
  }

  const selectRoles = [{
    value: 'recruiter',
    label: 'Recruiter'
  }, {
    value: 'candidate',
    label: 'Job Seeker'
  }]
  
  const [error, setError] = useState({
    errors:{},
    isError:false
  })

  // resetting the form
  const resetData = () => {
    setData({
      name:'',
      email:'',
      password:'',
      company:'',
      contactNumber:'',
      role:'',
      skills:[]
    })
  }

  //submitting the form
  const submitForm = (e) => {
     e.preventDefault()

     //call server api for sending data
     signUp(data).then((resp) => {
      console.log(resp)
      console.log("success log")
      toast.success("User registered successfully. You can login now...")
      setData({
        name:'',
        email:'',
        password:'',
        company:'',
        contactNumber:'',
        role:'',
        skills:[]
      })
      navigate("/login")
     }).catch((error) => {
      // console.log("Raw error: ",error)

      if(error.message === 'Network Error') {
        toast.error("Something went wrong on server! Please try later")
        return
      }  

      // console.log("error log")

      // console.log("Exact errors separated: ",error.response?.data?.errors)

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

      // console.log("Final Customized: ",errorsCustomized)

      setErrObj(errorsCustomized)

      setError({
        errors:error,
        isError: true
      })
     })
  }

  // handle change
  const handleChange = (event, field) => {

    //dynamic setting of properties
    console.log(field, event.target.value)
    setData({...data, [field]:event.target.value})
  }

    return (
      <Base>
         <Container>
           <Row className="mt-4 mb-4">
             <Col sm={{size:6, offset:3}}>
                <Card color="dark" inverse>
                <CardHeader>
                  <h3>Registration Form</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={submitForm}>
                    {/* Name field */}
                    <FormGroup>
                      <Label for="name">Enter Name</Label>
                      <Input 
                        type="text" 
                        id="name" 
                        placeholder="name" 
                        onChange={(e) => handleChange(e, 'name')}
                        value={data.name}
                        // invalid={ error.errors?.response?.data?.errors ? true:false }
                        invalid = {errObj?.name ? true: false}
                      />

                      <FormFeedback>
                        {errObj.name}
                      </FormFeedback>
                    </FormGroup>

                    {/* Email field */}
                    <FormGroup>
                      <Label for="email">Enter Email</Label>
                      <Input 
                        type="email" 
                        id="email" 
                        placeholder="email" 
                        onChange={(e) => handleChange(e, 'email')}
                        value={data.email}
                        invalid={errObj?.email ? true: false}
                      />

                      <FormFeedback>
                        {errObj.email}
                      </FormFeedback>
                    </FormGroup>
                    {/* Password field */}
                    <FormGroup>
                      <Label for="password">Enter Password</Label>
                      <Input 
                        type="password" 
                        id="password" 
                        placeholder="password" 
                        onChange={(e) => handleChange(e, 'password')}
                        value={data.password}
                        invalid={errObj?.password ? true: false}
                      />

                      <FormFeedback>
                        {errObj.password}
                      </FormFeedback>
                    </FormGroup>
                    {/* Company field */}
                    <FormGroup>
                      <Label for="company">Enter Company</Label>
                      <Input 
                        type='text' 
                        id="company" 
                        placeholder="company" 
                        onChange={(e) => handleChange(e, 'company')}
                        value={data.company}
                        invalid={errObj?.company ? true: false}
                      />

                      <FormFeedback>
                        {errObj.company}
                      </FormFeedback>
                    </FormGroup>
                    {/* Contact field */}
                    <FormGroup>
                      <Label for="contactNumber">Enter Contact Number</Label>
                      <Input 
                        type='text' 
                        id="contactNumber" 
                        placeholder="contact" 
                        onChange={(e) => handleChange(e, 'contactNumber')}
                        value={data.contactNumber}
                        invalid={errObj?.contactNumber ? true: false}
                      />

                      <FormFeedback>
                        {errObj.contactNumber}
                      </FormFeedback>
                    </FormGroup>
                    {/* Skills field */}
                    <FormGroup>
                      <Label for="skills">Add Skills</Label>
                      <Multiselect
                        options={skills}
                        // value={selectedList}
                        displayValue="skillName"
                        style={{option: {color: 'black'}}}
                        onSelect={handleSelected}
                        onRemove={handleSelected}
                      />
                    </FormGroup>
                    <FormGroup>
                        <Label for="role">
                          Select Role
                        </Label>
                        <Input
                          id="role"
                          name="role"
                          type="select"
                          onChange={(e) => handleChange(e, 'role')}
                          value={data.role}
                        >
                          {
                            selectRoles.map((role) => {
                              return <option value={role.value}>{role.label}</option>
                            })
                          }
                        </Input>
                      </FormGroup>

                      <Container className="text-center">
                        <Button color="dark">Register</Button>
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
  export default Signup

  /*
0: 
arguments: (3) [{…}, 2147483647, 2]
bindingFailure: false
code: "Size"
codes: (4) ['Size.registrationRequest.name', 'Size.name', 'Size.java.lang.String', 'Size']
defaultMessage: "Name must be of at least 2 characters"
field: "name"
objectName: "registrationRequest"
rejectedValue: ""
[[Prototype]]: Object
1: 
arguments: (3) [{…}, 30, 2]
bindingFailure: false
code: "Size"
codes: (4) ['Size.registrationRequest.company', 'Size.company', 'Size.java.lang.String', 'Size']
defaultMessage: "Company name must be between 2 to 30 characters"
field: "company"
objectName: "registrationRequest"
rejectedValue: ""
  */