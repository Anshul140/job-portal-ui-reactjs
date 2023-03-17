import { useParams, useNavigate } from "react-router-dom"
import { getCurrentUserDetails, getCurrentUserToken } from "../../auth";
import Base from "../../components/Base"
import { updateProfile, getAllSkills } from "../../services/user_service";
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label, Row, Col, FormFeedback } from "reactstrap"
import { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import {toast} from 'react-toastify'

const UpdateProfile = () => {

  const navigate = useNavigate();
  const {userId} = useParams();  
  const user = getCurrentUserDetails()
  const [errObj, setErrObj] = useState({})
  
  const [data, setData] = useState({
    name:'',
    company:'',
    contactNumber:'',
    skills:[]
  })
  const [skills, setSkills] = useState([])

  useEffect(() => {
    getAllSkills().then(resp => {
      setSkills(resp)
      console.log("skills: ", skills)
      console.log("resp: ", resp)

    }).catch(err => {
      console.log(err)
    })

    setData(user)
  }, [])

  const handleSelected = (selectedItems) => {
    const selectedSkills = selectedItems.map(({skillId: id, skillName: name}) => ({id, name}))
   
    setData((prevState) => ({
      ...prevState,
      skills: selectedSkills
    }))
    console.log(data)
  }
  
  const [error, setError] = useState({
    errors:{},
    isError:false
  })

  // resetting the form
  const resetData = () => {
    setData({
      name:'',
      company:'',
      contactNumber:'',
      skills:[]
    })
  }

  //submitting the form
  const submitForm = (e) => {
     e.preventDefault()

     //data validate
     console.log(data)

     console.log("id: ",userId)
     console.log("data",data)
     //call server api for sending data
     updateProfile(userId, data).then((resp) => {
      console.log(resp)
      console.log("success log")
      toast.success("User updated successfully...")

      const storageData = JSON.parse(localStorage.getItem("data"))
      const token = getCurrentUserToken()
      storageData.userDetails = resp
      storageData.token = token

      localStorage.setItem('data', JSON.stringify(storageData))
      
      setData({
        name:'',
        company:'',
        contactNumber:'',
        skills:[]
      })
      navigate("/user/profile-info")
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
                  <h3>Update Form</h3>
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
                        invalid={ errObj?.name? true: false }
                      />
                      <FormFeedback>
                        {errObj.name}
                      </FormFeedback>
                    </FormGroup>

                    {/* Email field */}
                    {/* <FormGroup>
                      <Label for="email">Enter Email</Label>
                      <Input 
                        type="email" 
                        id="email" 
                        placeholder="email" 
                        onChange={(e) => handleChange(e, 'email')}
                        value={data.email}
                      />
                    </FormGroup>
                     Password field 
                    <FormGroup>
                      <Label for="password">Enter Password</Label>
                      <Input 
                        type="password" 
                        id="password" 
                        placeholder="password" 
                        onChange={(e) => handleChange(e, 'password')}
                        value={data.password}
                      />
                    </FormGroup> */}
                    {/* Company field */}
                    <FormGroup>
                      <Label for="company">Enter Company</Label>
                      <Input 
                        type='text' 
                        id="company" 
                        placeholder="company" 
                        onChange={(e) => handleChange(e, 'company')}
                        value={data.company}
                        invalid={ errObj?.company? true: false}
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
                        invalid={ errObj?.contactNumber ? true: false}
                      />
                      <FormFeedback>
                        { errObj.contactNumber }
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
export default UpdateProfile