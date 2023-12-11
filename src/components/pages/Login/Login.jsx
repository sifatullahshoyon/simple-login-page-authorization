import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "../../../firebase/firebase.config";

const auth = getAuth(app);
// console.log(auth)

const Login = () => {
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [inputType, setInputType] = useState("password");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    // firebase Login
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        emailVarifacition(result.user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });

    const emailVarifacition = (user) => {
      sendEmailVerification(user).then((result) => {
        alert("Email verification sent!");
        console.log(result);
      });
    };
  };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleProvider = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleGithubProvider = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleVisibleBtn = () => {
    setVisible(!visible);
    setInputType(visible ? "password" : "Text");
  };

  const emailVarifacition = (user) => {
    sendEmailVerification(user).then((result) => {
      alert("Email verification sent!");
      // ...
    });
  };

  return (
    <div className="container py-4">
      <p className="text-dander">{error}</p>
      <div className="d-flex my-5 align-items-center">
        <div className="w-50">
          <Form onSubmit={handleSubmit} className="w-75">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={inputType}
                name="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <button
              onClick={() => setVisible(handleVisibleBtn)}
              className="btn btn-info"
            >
              visible
            </button>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <p className="my-2 fs-5">
              <small>
                Aren't You New To This WebSite . Please{" "}
                <Link to="/registers">Sign In</Link>
              </small>
            </p>
            <div className="w-25">
              <img
                src="/assets/google-btn.png"
                alt=""
                className="img-fluid"
                onClick={handleGoogleProvider}
              />
            </div>
            <div className="w-25">
              <img
                src="/assets/github-btn.png"
                alt=""
                className="img-fluid"
                onClick={handleGithubProvider}
              />
            </div>
          </Form>
        </div>
        <div className="w-50 d-flex justify-content-end ">
          <img src="/assets/login.png" className="img-fluid" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
