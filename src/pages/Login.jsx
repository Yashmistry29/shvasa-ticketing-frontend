import React, { useEffect, useState } from 'react'
import { CssTextField } from "../components/FormElements/TextfieldForm";
import { loginForm } from "../utils/initialValue";
import { validateSignin } from "../utils/FormValidation";
import { sendRequest } from '../utils/HelpersMethod';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [data, setData] = useState(loginForm);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignin(data);
    const isValid = Object.keys(validationErrors).length === 0;
    // console.log(validationErrors, isValid, data);
    setErrors(validationErrors);
    if (isValid) {
      // console.log(data);
      sendRequest("/api/support-agents/agentLogin", "POST", data)
        .then(res => {
          // console.log(res)
          if (res.success) {
            toast.success(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            localStorage.setItem("Authenticated", true);
            localStorage.setItem('AgentId', res.data);
            navigate("/dashboard", { replace: true });
          }
          else {
            toast.error(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        }).catch((err) => {
          console.log(err);
        });
    }
    else {
      console.log(errors);
      toast.error("Invalid Credentials");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('Authenticated');
    if (token)
      navigate('/dashboard', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="mv5 pv3 mw8 flex-column w-40 items-center center">
        <div className="w-60-l w-70-m w-100 center tc">
          <p
            className='f1-l f2-m f3 tc title-font'
            style={{ color: "#2e1065" }}
          >Login for Agent</p>
        </div>
        <div className="w-80 center lsv">
          <CssTextField
            name="email"
            label="Email"
            size='small'
            variant="outlined"
            margin="dense"
            value={data.email}
            onChange={handleChange}
            {...(errors.email && { error: true, helperText: errors.email })}
            autoFocus
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <CssTextField
            name="password"
            label="Password"
            variant="outlined"
            size='small'
            type="password"
            margin="dense"
            value={data.password}
            onChange={handleChange}
            {...(errors.password && { error: true, helperText: errors.password })}
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
        </div>
        <div className="flex justify-center pa3">
          <p
            className="link pointer tc bg-dark-blue white dim dib w3 w5-l w4-m pa2 br2"
            onClick={handleSubmit}
          >Login</p>
        </div>
        <div className="flex justify-center items-center">
          {/* <a href="/forgot_password" className="f6 link dim black db pa2">Forgot Password?</a> */}
          <a href="/signup" className="f6 link dim black db pa2" >Create New Account</a>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login