import axios from "axios";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

export default function Home({username,}) {
    const { user, setUser } = useContext(UserContext);
    axios.defaults.withCredentials = true;
    
    const handleLogOut = () => {
        axios.post(`https://session-management-api.vercel.app/api/users/logout`)
        .then((response) => {
            console.log(response);
            setUser(null);
        }).catch((error) => console.error(error));
    }

    return (
        <section className="home">
            <h1>Session User's Info:</h1>
            <p>Username : {username.name}</p>
            <p>E-mail : {username.email}</p>
            <p>Password : {username.password}</p>
            <button onClick={handleLogOut}>Logout</button>
        </section>
    )
}