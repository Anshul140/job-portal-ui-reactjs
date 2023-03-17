import { useParams } from "react-router-dom"
import Base from "../../../components/Base"
import { useState, useEffect } from "react"
import { Viewer } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import axios from "axios"
import { getMyResume, getResumeByUserId, uploadResume } from "../../../services/user_service"
import { getCurrentUserDetails, getCurrentUserToken } from "../../../auth"
import pako from 'pako'
import { BASE_URL } from "../../../services/helper"
import { toast } from "react-toastify"

const CandidateResumeViewer = () => {

  const token = getCurrentUserToken()

  const {candidateId} = useParams();

  const [userName, setUserName] = useState()
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    console.log("inside candidate resume viewer: ",candidateId)
    
    const callOnPageLoad = async () => {
        const response = await fetch(`${BASE_URL}/resume/${candidateId}`, {
            method: 'GET', 
            headers: {
              Authorization: "Bearer "+getCurrentUserToken()
            }
          })
      
          if(response.ok) {
            const blob = await response.blob()
            console.log(response)
            console.log(blob)
            const url = URL.createObjectURL(blob)
            setFileUrl(url)
          } else {
            console.log("No resume found associated with this user")
          }
    }
    callOnPageLoad()
  }, [])
  
  return (
    <Base>
      <Container>
        <Row className="mt-4 mb-4">
          <Col sm={{size:7, offset:3}}>
              <Card color="dark" inverse>
              <CardHeader>
                <h3>Resume</h3>
              </CardHeader>
              <CardBody color="dark" inverse className="mt-2">
                <div>
                  {fileUrl && (
                    <iframe
                      className="mt-3"
                      src={fileUrl}
                      width="700px"
                      height="600"
                      title="Resume"
                    />
                  )}
                  {!fileUrl && (
                    <p>No resume found for this user :/</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  )
}
export default CandidateResumeViewer