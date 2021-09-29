import axios from 'axios';
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
export default function Login() {
    const [user,setUser] = useState({
        email:'',
        password:''
    })

    const onChangeInput = e => {
        const {name,value} = e.target;
        setUser({...user, [name]:value})
    }
    const loginSubmit = async e=>{
        e.preventDefault()
        try{ 
           
            await axios.post('/users/login',{...user})
           
            localStorage.setItem('firstLogin',true)
            window.location.href = "/";
        }catch(err){
            alert(err.response.data.msg)
        }
    }
   
    return (
        <div>
            
              <div className="login-container container">
                   
                        <form className="form" onSubmit={loginSubmit}>
                            {/* {error && <p className="error">{error}</p>} */}
                            <p>Please Login</p>
                            <input type="email" placeholder="Email"  name="email" required 
                            value={user.email}
                            onChange={onChangeInput}  />
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                               value={user.password}
                               onChange={onChangeInput}                            
                                                           />
                            <button className="submit" type="submit" >
                                Login
                            </button>
                            <Link to="/register" className="anchor authswitch" >Don't have an account?</Link>
                        </form>
                    
                </div>
        </div>
    )
}
