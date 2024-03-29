// Import all modules
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Cryptr from 'cryptr'

import { peekPassword } from '../../redux/actions/peekPassword'
import { editPassword, resetMessage } from '../../redux/actions/auth'

// import components
import {default as Alert} from '../alert/MyAlert'

// Import bootstrap component
import { 
  Container,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  FormControl
} from 'react-bootstrap';

// import all components
import Loading from '../loading/Loading'

// import scss
import styled from './style.module.scss';

const cryptr = new Cryptr(process.env.REACT_APP_SECRET)

function FormResetPassword(props) {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const [state, setState] = useState({
    password: null,
    id: null,
    email: null,
    message: null,
  })

  const {resetMessage} = props; 

  React.useEffect(() => {
    setTimeout(() => {
      resetMessage()

      if(props.success) {
        history.push('/login')
      }
    }, 3000)
  }, [resetMessage, props.message, props.success, history])

  React.useEffect(() => {
    setState((currentState) => ({
      ...currentState,
      email: cryptr.decrypt(query.get('email')),
      id: query.get('id'),
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInput = (e, prop) => {
    if(prop === 'password') {
      if (
        e.target.value.length > 15 ||
        e.target.value.length < 5
      ) {
        setState((currentState) => ({
          ...currentState,
          message: 'Password min 5 character and max 15 character',
        }))
      } else if (
        e.target.value.match(/[a-z]/g) === null ||
        e.target.value.match(/\d/g) === null ||
        e.target.value.match(/[A-Z]/g) === null ||
        e.target.value.match(/[^a-z0-9]/gi) === null
      ) {
        setState((currentState) => ({
          ...currentState,
          message: 'Password must include lower case and uppercase letters, numbers and symbol',
        }))
    
      } else {
        setState((currenState) => ({
          ...currenState,
          message: null,
        }))
      }
    } 

    setState(currentState => ({
      ...currentState,
      [prop]: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.editPassword(state.id, state.email, state.password)    
  }
  
  return (
    <Fragment>
      <Col xl={4} lg={5} className={ `d-flex align-items-center` }>
        <Container className={ `${styled.container} py-5` }>
          <Row className={`justify-content-center ${styled.row}`}>
            <Col xl={10} lg={10}>
              <div className={`mb-5`}>
                <p className={`${styled.subtitle} text-break w-100`}>
                  Fill your new password
                </p>
              </div>
              <Alert variant={props.success ? 'success' : 'warning'} message={props.message} />
              <Form onSubmit={handleSubmit}> 
              <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label className="mb-3">Password</Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      type={ props.show ? 'text' : 'password'}
                      className={`${styled.controlSize} ${styled.hideBorderLeft} ${state.password && `is-${!state.message ? 'valid' : 'invalid'}`}`}
                      placeholder="Write your password"
                      value={state.password}
                      onChange={e => handleInput(e, 'password')}
                    />
                    <InputGroup.Prepend>
                      <InputGroup.Text 
                        id="basic-addon2" 
                        className={`${styled.hideAppend} ${state.password && `${!state.message ? `${styled.hideAppendPasswordValid}` : `${styled.hideAppendPasswordInvalid}`}`}`}
                      >
                        {
                          props.show ? (
                            <Fragment>
                              <div onClick={props.showPassword}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5F2EEA" className={`bi bi-eye-slash ${styled.eye}`} viewBox="0 0 16 16">
                                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z"/>
                                </svg>
                              </div>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <div onClick={props.showPassword}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#A0A3BD" className={`bi bi-eye ${styled.eye}`} viewBox="0 0 16 16">
                                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                </svg>
                              </div>     
                            </Fragment>
                          )
                        }
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    {
                      (state.message) && (
                        <div className="invalid-feedback">
                          {state.message}
                        </div>
                      )
                    }
                  </InputGroup>
                </Form.Group>
                <Loading>
                  {
                    !state.message && state.password ? (
                      <Button variant="primary" type="submit" className={`${styled.controlSize} w-100 mt-4`}>
                      Reset now
                    </Button>
                    ) : (
                      <Button variant="primary" disabled type="submit" className={`${styled.controlSize} w-100 mt-4`}>
                        Reset now
                      </Button>
                    )
                  }
                </Loading>
              </Form>
            </Col>
          </Row>
        </Container>
      </Col>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    show: state.redux.showPassword,
    message: state.message.message,
    success: state.message.success
  }
}

const mapDispatchToProps = {
  showPassword: peekPassword,
  editPassword,
  resetMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormResetPassword);