import { useState , useEffect} from "react";
import { getRequest, postRequest } from "../actions/connection";

function AdminLogin() {
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(null);

    const login = async () => {
        await postRequest("/user/login", values)
            .then(() => {
                window.location.href = process.env.ADMIN_URL;
            })
            .catch(() => {
                
            })

    }
    return (
        <>
            <input onInput={(e) => setEmail(e.target.value)} type="email"></input>
            <input onInput={(e) => setPassword(e.target.value)}  type="password"></input>
            <input type="submit">Login</input>
        </>
    );
}

export default AdminLogin