import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const onSignUp = e => {
    e.preventDefault();
    const registeredInfo = {
      name: name,
      email: email,
      password: password
    }
    axios.post('http://localhost:4000/api/signup', registeredInfo).then(response => {
      if(response.status === 200) {
        alert('You have been signed up successfully')
        setName('')
        setEmail('')
        setPassword('')
      }
      else {
        alert('Something went wrong')
      }
    }).catch(error => {
      alert(error.message)
    })
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <h4>Sign In</h4>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="col-md-2 text-center">
          <h4>OR</h4>
        </div>
        <div className="col-md-5">
        <h4>Sign Up</h4>
          <Form onSubmit={onSignUp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Type a Password" value={password} onChange={e => setPassword(e.target.value)} required/>
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default App
