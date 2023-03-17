import Base from "../components/Base"
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label, Row, Col } from "reactstrap"
import { useState } from "react"
import { toast } from "react-toastify"
import { loginUser } from "../services/user_service"
import { doLogin } from "../auth"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail]=useState({
    email:'',
    password:''
  })

   
  const handleChange = (e, field) => {
    let actualValue = e.target.value
    setLoginDetail({
      ...loginDetail,
      [field]:actualValue
    })
  } 

  const handleReset = () => {
    setLoginDetail({
      email:'',
      password:''
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // console.log(loginDetail)
    
    //validation
    if(loginDetail.email.trim() === '') {
      toast.error("Email cannot be empty!");
      return;
    }

    if(loginDetail.password.trim() === '') {
      toast.error("Password cannot be empty!");
      return;
    }

    // submit the data to server to generate token
    loginUser(loginDetail).then((resp) => {
      console.log("successful login")
      

      //save the data to localStorage 
      doLogin(resp, () => {
        console.log("login detail is saved to localStorage")

        //redirect to user dashboard page
        navigate("/")

      })


      toast.success("Login Successful")
    }).catch(err => {
      console.log(err)
      if(err.response?.status == 400 || 
         err.response?.status == 404 ||
         err.response?.status == 401
      ) {
        toast.error("Invalid credentials!")
      }else {
        toast.error("Something went wrong on server!")
      }
    })

  }

  return (
    <Base>
      <Container>
        <Row className="mt-4 mb-4">
          <Col sm={{size:6, offset:3}}>
              <Card color="dark" inverse>
              <CardHeader>
                <h3>Login Form</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      value={loginDetail.email}
                      placeholder="email" 
                      onChange={(e)=> handleChange(e, 'email')}
                    />
                  </FormGroup>
                  {/* Password field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input 
                      type="password" 
                      id="password" 
                      value={loginDetail.password}
                      placeholder="password" 
                      onChange={(e)=> handleChange(e, 'password')}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="dark">Login</Button>
                    <Button onClick={handleReset} color="secondary" type="reset" className="ms-2">Reset</Button>
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
  export default Login