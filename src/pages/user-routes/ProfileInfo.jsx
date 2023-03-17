import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap";
import { getCurrentUserDetails } from "../../auth";
import { uploadResume } from "../../services/user_service";
import Base from "../../components/Base";
import userProfile from '../../assets/images/user-profile.jpg'
import { Link } from "react-router-dom";

const ProfileInfo = () => {

  const user = getCurrentUserDetails()

  const userView = () => {
    return (
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <Card>
            <CardBody>
              <h3>MY PROFILE</h3>
              <Container className="text-center my-5">
                <img className="img-fluid" style={{maxWidth: '250px', maxHeight:'250px'}} src={userProfile} alt="user-profile" />
              </Container>
              <Table responsive striped hover bordered={true} className="text-center">
                <tbody>
                  <tr>
                    <td>
                      JOB-KART ID
                    </td>
                    <td>
                      {user.id}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      USER NAME
                    </td>
                    <td>
                      {user.name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      USER EMAIL
                    </td>
                    <td>
                      {user.email}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      USER ORGANISATION
                    </td>
                    <td>
                      {user.company}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      USER SKILLS
                    </td>
                    <td>
                      {user.skills.map(skill => (
                        <span className="mx-1 px-1 py-1" style={{background: 'rgb(86 89 94)', color:'white'}} key={skill.skillId}>{skill.skillName}</span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Container className="text-center">
              <Button color='primary' tag={Link} to={`/user/update-profile/${user.id}`}>
                Update
              </Button>
              <Button className="mx-2" color='primary' tag={Link} to={`/user/my-resume`}>
                View-Resume
              </Button>
              </Container>
            </CardBody>
          </Card>
        
        </Col>
      </Row>
    )
  }

  return (
    <Base>
      {userView()}
    </Base>
  )
}
export default ProfileInfo