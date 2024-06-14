import { useState, useContext } from "react";
import "./Register.css";
import axios from "axios";
import  {UserContext}  from "../../UserContext";

export default function Register() {
  const {setUser} = useContext(UserContext);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value });
  }

  axios.defaults.withCredentials = true;
  const handleOnSubmit = (e) => {
    e.preventDefault(); 
    axios.post(`https://session-api-tau.vercel.app/api/users/register`, formValues)
    .then((response) => {
      console.log(response);
      setUser(response.data.data);
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleOnSubmit}>
        <span className="heading">Registration Form</span>

        <div className="form-group">
          <input className="form-input" required type="text" name="name" value={formValues.name} onChange={handleOnChange} />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-group">
          <input className="form-input" required type="email" name="email" value={formValues.email} onChange={handleOnChange} />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-group">
          <input className="form-input" required type="password" name="password" value={formValues.password} onChange={handleOnChange} />
          <label htmlFor="password">Password</label>
        </div>

        <button type="submit">SUBMIT</button>
      </form>
    </div>

  );
}
