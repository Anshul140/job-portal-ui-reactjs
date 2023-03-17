import { NavLink as ReactLink, useNavigate } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';

import { useEffect, useState } from 'react';
import { doLogout, getCurrentUserDetails, isLoggedIn, getCurrentUserRole } from '../auth';

const CustomNavbar = (args) => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)
    const role = getCurrentUserRole()
    // console.log("role: ", role)


    useEffect(() => {

      setLogin(isLoggedIn())
      setUser(getCurrentUserDetails())
      // console.log("user: ",user)

    }, [login])

    const toggle = () => setIsOpen(!isOpen);

    const logout = () => {
      doLogout(() => {
        setLogin(false)
        navigate("/")
      })
    }
  
    return (
      <div style={{marginBottom: '5rem'}}>
        <Navbar 
           color='dark'
           dark
           full
           expand='md'
           fixed='top'
           className='px-5'
           
        >
          <NavbarBrand tag={ReactLink} to="/">Job-Kart</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
               {
                 login && (
                  <>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/user/available-jobs">
                        Available Jobs
                      </NavLink>
                    </NavItem>
                  </>
                 )
               }

               {
                 login && role === 'ROLE_RECRUITER' && (
                  <>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/user/add-job">
                        Add Job
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/user/my-jobs">
                        My Jobs
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/user/applied-candidates">
                        Applied Candidates
                      </NavLink>
                    </NavItem>
                  </>
                 )
               }

               {
                 login && role === 'ROLE_CANDIDATE' && (
                   <>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/user/my-applications">
                        My Applications
                      </NavLink>
                    </NavItem>
                   </>
                 )
               }

               {
                 login && (
                  <>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/user/my-resume">
                        My-Resume
                      </NavLink>
                    </NavItem>
                  </>
                 )
               }
              
            </Nav>
            
            {/* move auth to right side of page */}
            <Nav navbar>
              {
                login && (
                  <>
                    <NavItem>
                      <NavLink tag={ReactLink} onClick={logout} to="/">
                        Logout
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/user/profile-info">
                        {user.name}
                      </NavLink>
                    </NavItem>
                  </>
                )
              }

              {
                !login && (
                  <>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/signup">
                        Signup
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/login">
                        Login
                      </NavLink>
                    </NavItem>
                  </>
                )
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
}

export default CustomNavbar