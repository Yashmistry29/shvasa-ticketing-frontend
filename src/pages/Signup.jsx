import React, { useEffect, useState } from 'react'
import { CssTextField } from "../components/FormElements/TextfieldForm";
import { signupForm } from "../utils/initialValue";
import { validateSignup } from "../utils/FormValidation";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../utils/HelpersMethod';

function Signup() {

  const navigate = useNavigate();
  const [data, setData] = useState(signupForm);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignup(data);
    const isValid = Object.keys(validationErrors).length === 0;
    // console.log(validationErrors, isValid, data);
    setErrors(validationErrors);
    if (isValid) {
      //   // console.log(data);
      sendRequest("/api/support-agents/createAgent", "POST", data)
        .then(res => {
          if (res.success) {
            toast.success(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            navigate("/login", { replace: true });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  useEffect(() => {
    const token = localStorage.getItem('Authenticated');
    if (token)
      navigate('/dashboard', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="mv3 pv2 mw8 flex-column w-40 items-center center">
        <div className="w-60-l w-70-m w-100 center tc">
          <p
            className='f1-l f2-m f3 tc title-font'
            style={{ color: "#2e1065" }}
          >Signup as Agent</p>
        </div>
        <div className="w-80 center lsv">
          <CssTextField
            name="name"
            label="Name"
            variant="outlined"
            size='small'
            margin="dense"
            value={data.name}
            onChange={handleChange}
            {...(errors.name && { error: true, helperText: errors.name })}
            autoFocus
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <CssTextField
            name="email"
            label="Email"
            size='small'
            variant="outlined"
            margin="dense"
            value={data.email}
            onChange={handleChange}
            {...(errors.email && { error: true, helperText: errors.email })}
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

          <CssTextField
            name="phone"
            label="Phone"
            variant="outlined"
            size='small'
            margin="dense"
            value={data.phone}
            onChange={handleChange}
            {...(errors.phone && { error: true, helperText: errors.phone })}
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <CssTextField
            name="description"
            label="Description"
            multiline
            rows={3}
            variant="outlined"
            size='small'
            margin="dense"
            value={data.description}
            onChange={handleChange}
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
        </div>
        <div className="flex justify-center pa3">
          <p
            className="link pointer tc bg-dark-blue white dim dib w3 w5-l w4-m pa2 br2"
            onClick={handleSubmit}
          >Signup</p>
        </div>
        <div className="flex justify-center items-center">
          {/* <a href="/forgot_password" className="f6 link dim black db pa2">Forgot Password?</a> */}
          <a href="/login" className="f6 link dim black db pa2" >Already User? Login</a>
        </div>
      </div>
    </React.Fragment >
  )
}

export default Signup