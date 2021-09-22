import axios from 'axios';
import React,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })

    const onChangeInput = e => {
        const {name,value} = e.target;
        setUser({...user, [name]:value})
    }
    const registerSubmit = async e=>{
        e.preventDefault()
        try{
            await axios.post('/users/register',{...user})
            localStorage.setItem('firstLogin',true)
            window.location.href = "/";
        }catch(err){
            alert(err.response.data.msg)
        }
    }
    return (
        <div>
              <div className="login-container container">
                   
                        <form className="form" onSubmit={registerSubmit}>
                            {/* {error && <p className="error">{error}</p>} */}
                            <p>Register</p>
                            <input type="text" placeholder="Name"  name="name" required 
                            value={user.name}
                            onChange={onChangeInput}  />
                            <input type="email" placeholder="Email"  name="email" required 
                            value={user.email}
                            onChange={onChangeInput} autoComplete='Off' />
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                               value={user.password}
                               onChange={onChangeInput}                            
                                                           />
                            <button className="submit" type="submit" >
                                Register
                            </button>
                            <Link to="/login" className="anchor authswitch">Already have an account?</Link>
                        </form>
                    
                </div>
        </div>
    )
}
