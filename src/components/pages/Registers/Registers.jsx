import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import app from "../../../firebase/firebase.config";

const auth = getAuth(app);

const Registers = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');
    const [success , setSuccess] = useState('');
    const handleResister = (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        if(!/(?=.{8,}$)/.test(password)){
            setError('Password Should Be 8 character');
            return;
        }
        else if(!/(?=.*?[A-Z])/.test(password)){
            setError('At least one upper case English letter');
            return;
        }
        else if(!/(?=.*?[a-z])/.test(password)){
            setError('At least one lower case English letter');
            return;
        }
        else if(!/(?=.*?[0-9])/.test(password)){
            setError('At least one digit');
            return;
        }
        else if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
            setError('At least one special character');
            return;
        }
        else if(email && password){
            createUserWithEmailAndPassword(auth , email , password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                setSuccess('User Create Successfully');
                setError('');
              })
              .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
                setSuccess('');
              });
        }
        else{
            setError('Please Provide a valid email address and password')
        }

    };
    console.log(email , password)
  return (
    <div className="container my-5">
        <p className="fs-5 text-danger">{error}</p>
        <p className="fs-5 text-success">{success}</p>
      <div className="d-flex align-items-center">
        <Form className="w-50">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required />
            </Form.Group>
          </Row>

          {/* <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" required />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main Street" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Allow Trams & Conditions" />
          </Form.Group>

          <Button onClick={handleResister} variant="primary" type="submit">
            Register
          </Button>

          <p className="my-2 fs-5"><small>Already Have an account? Please <Link to='/login'>Login</Link></small></p>
        </Form>
        <div className="w-50 d-flex justify-content-end">
          <img src="/src/assets/registers.png" className="img-fluid" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Registers;
