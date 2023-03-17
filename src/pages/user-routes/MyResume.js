import { useParams } from "react-router-dom"
import Base from "../../components/Base"
import { useState, useEffect } from "react"
import { Viewer } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import axios from "axios"
import { getMyResume, uploadResume } from "../../services/user_service"
import { getCurrentUserDetails, getCurrentUserToken } from "../../auth"
import { BASE_URL } from "../../services/helper"
import { toast } from "react-toastify"

const MyResume = () => {

  const token = getCurrentUserToken()
  const userId = getCurrentUserDetails().id

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const callOnPageLoad = async () => {
      const response = await fetch(`${BASE_URL}/resume/showMyResume`, {
        method: 'GET', 
        headers: {
          Authorization: "Bearer "+getCurrentUserToken()
        }
      })
  
      if(response.ok) {
        const blob = await response.blob()
        console.log(response)
        const url = URL.createObjectURL(blob)
        setFileUrl(url)
      } else {
        console.log("No resume found associated with this user")
      }
    }

    callOnPageLoad()
  }, [])

  const handleSubmit = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/resume/upload`, {
      method: 'POST', 
      headers: {
        Authorization: "Bearer "+getCurrentUserToken()
      },
      body: formData
    })

    if(response.ok) {
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      toast.success("Resume uploaded successfully")
      setFileUrl(url)
    } else {
      toast.error("Couldn't upload resume! Something went wrong on server")
    }
  }

  const handleUpdate = async (e) => {
    console.log(userId)
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/resume/${userId}`, {
      method: 'PUT', 
      headers: {
        Authorization: "Bearer "+getCurrentUserToken()
      },
      body: formData
    })

    if(response.ok) {
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      toast.success("Resume updated successfully")
      setFileUrl(url)
    } else {
      toast.error("Couldn't update resume! Something went wrong on server")
    }
  }

  const handleDelete = async () => {
    const response = await fetch(`${BASE_URL}/resume/${userId}`, {
      method: 'DELETE', 
      headers: {
        Authorization: "Bearer "+getCurrentUserToken()
      }
    })

    if(response.ok) {
      setFileUrl(null)
      toast.success("Resume Deleted Successfully...");
    } else {
      toast.error("Something went wrong! Couldn't Delete Resume")
    }
  }
  
  
  return (
    <Base>
      <Container>
        <Row className="mt-4 mb-4">
          <Col sm={{size:7, offset:3}}>
              <Card color="dark" inverse>
              <CardHeader className="text-center">
                <h3>My Resume</h3>
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
                  {
                    fileUrl && (
                      <div className="text-center">
                          <input id="fileInput" type="file" accept=".pdf" style={{display: 'none'}} onChange={handleUpdate} />
  
                          <Button className="mt-1" color="primary" onClick={() => document.getElementById('fileInput').click()}>
                            Update
                          </Button>
                          <Button color="danger" className="mx-2 mt-1" onClick={handleDelete}>Delete</Button>
                        </div>
                    )
                  }
                  {!fileUrl && (
                    <div>
                      <p
                        className="font-weight-bold text-center"
                        style={{border: '1px solid red', padding:'1px'}}
                      >Nothing to show. Please upload your resume to view :/</p>
                      <div className="text-center">
                        <input id="fileInput" type="file" accept=".pdf" style={{display: 'none'}} onChange={handleSubmit} />

                        <Button color="primary" onClick={() => document.getElementById('fileInput').click()}>
                          Upload Resume
                        </Button>
                      </div>
                    </div>
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
export default MyResume