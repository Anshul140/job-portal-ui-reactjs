import { Button, Card, CardBody, CardGroup, CardLink, CardSubtitle, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from "reactstrap"
import Base from "../components/Base"
import jobPortalImg from "../assets/images/job-portal-img.jpg"
import { Link } from "react-router-dom";
import { getCurrentUserRole, isLoggedIn } from "../auth";
import redirect from "../assets/images/redirect.png"

const Home = () => {

  const role = getCurrentUserRole()

  return (
    <Base>
      <Container className="d-flex justify-content-center align-items-center">
           <Row>
             <Col>
             <Card 
              inverse 
              style={{
                width: '28rem',
                height: 
                  isLoggedIn() && role === 'ROLE_CANDIDATE'? '38rem' : (
                  isLoggedIn() && role === 'ROLE_RECRUITER'? '44rem': '30rem'),
                backgroundColor: '#181c2e'
              }}
             >
                <CardBody>
                  <CardTitle className="text-center" tag="h3">
                    {/* <u>Welcome To Job Kart</u> */}
                    Welcome To Job Kart
                  </CardTitle>
                  <hr/>   

                  <img
                    className="px-2" 
                    alt="Card cap"
                    src={jobPortalImg}
                    width="100%"
                    height={isLoggedIn() ? '30%': '80%'}
                  />

                  {isLoggedIn() && role === 'ROLE_CANDIDATE' && (
                      <>
                        <CardSubtitle className="mt-2">
                          <h5 className="text-center">
                            <em>Candidate Portal</em>
                          </h5>
                        </CardSubtitle>
                        <ListGroup>
                          <ListGroupItemHeading className="mt-4" tag="h6"><u>Available features</u>-</ListGroupItemHeading>
                          <ListGroupItem className="mt-2" color="info">
                            <span style={{color: "#0c0e17"}}>Browse All Jobs with Apply option</span>
                            <Link to="/user/available-jobs">
                              <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                            </Link>
                          </ListGroupItem>
                          <ListGroupItem className="mt-2" color="info">
                            <span style={{color: "#0c0e17"}}>View Your Applications with Withdrawal option</span>
                            <Link to="/user/my-applications">
                              <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                            </Link>
                          </ListGroupItem>
                          <ListGroupItem className="mt-2" color="info">
                            <span style={{color: "#0c0e17"}}>Upload Resume</span>
                            <Link to="/user/my-resume">
                              <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                            </Link>
                          </ListGroupItem>
                          <ListGroupItem className="mt-2" color="info">
                            <span style={{color: "#0c0e17"}}>View & Update Profile</span>
                            <Link to="/user/profile-info">
                              <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                            </Link>
                          </ListGroupItem>
                        </ListGroup>
                      </>
                  )} 

                  {isLoggedIn() && role === 'ROLE_RECRUITER' && (
                    <>
                      <CardSubtitle className="mt-1">
                        <h5 className="text-center">
                          <em>Recruiter Portal</em>
                        </h5>
                      </CardSubtitle>
                      <ListGroup>
                        <ListGroupItemHeading className="mt-2" tag="h6"><u>Available features</u>-</ListGroupItemHeading>
                        <ListGroupItem className="mt-2" color="info">
                          <span style={{color: "#0c0e17"}}>Browse All Jobs</span>
                          <Link to="/user/available-jobs">
                            <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem className="mt-2" color="info">
                          <span style={{color: "#0c0e17"}}>Create Job</span>
                          <Link to="/user/add-job">
                            <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem className="mt-2" color="info">
                          <span style={{color: "#0c0e17"}}>View Your Created Jobs</span>
                          <Link to="/user/my-jobs">
                            <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem className="mt-2" color="info">
                          <span style={{color: "#0c0e17"}}>View Candidates List for Your Created Jobs</span>
                          <Link to="/user/applied-candidates">
                            <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem className="mt-2" color="info">
                          <span style={{color: "#0c0e17"}}>Upload Resume</span>
                          <Link to="/user/my-resume">
                            <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem className="mt-2" color="info">
                          <span style={{color: "#0c0e17"}}>View & Update Profile</span>
                          <Link to="/user/profile-info">
                            <img className="mx-2" height="20px" src={redirect} alt="Redirect"/>
                          </Link>
                        </ListGroupItem>
                      </ListGroup>
                    </>
                  )}

                </CardBody>
                {
                  !isLoggedIn() && (
                    <CardBody className="text-center">
                      <CardText
                        className="mb-2 text-center mt-2"
                        tag="h6"
                      >
                        <p style={{color: "#d4d6d4"}}>
                          <em>"One stop solution for Job Seekers and Recruiters"</em>
                        </p>
                      </CardText>
                      <Button color='primary' tag={Link} to={`/signup`}>
                        Register
                      </Button>
                      <Button className="mx-3" color='primary' tag={Link} to={`/login`}>
                        Login
                      </Button>
                    </CardBody>
                  )
                }
              </Card>
             </Col>
           </Row>
      </Container>      
    </Base>
  )
}
export default Home