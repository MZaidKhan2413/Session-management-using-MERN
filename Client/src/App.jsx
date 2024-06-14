import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import  {UserContext}  from "./UserContext";
import { useEffect, useContext } from "react";
import axios from "axios";

function App() {
  const {user, setUser} = useContext(UserContext);


  useEffect(()=>{
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000/api/users")
   .then((response) => {
    setUser(response.data)
   })
  }, [setUser]);


  return (
    <div className="layout">
      {
        user ? <Home username={user}/> : <Register />
      }
    </div>
  )
}

export default App
