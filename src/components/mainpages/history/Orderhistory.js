import React,{useContext, useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loading from '../utils/loading/Loading'


export default function Orderhistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] =  state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    
    
    useEffect(() => {
        if(token){
            
            const getHistory = async () => { 
                                   
                    if(isAdmin){   
                      
                        const res = await axios.get('/api/payment' , {
                            headers: {Authorization : token}
                        })                       
                        setHistory(res.data)
                    }else{  
                         
                        const res = await axios.get('/users/history' , {
                            headers: {Authorization : token}
                        })                    
                        setHistory(res.data)
                    }                                                         
                }  
            getHistory()
        }
    },[token,isAdmin, setHistory])

    const setStatus = async (id) => {
        try{
                console.log(id)
        }catch(err){
            console.log(err)
        }
    }
   
    return (
        <div className="container">
            {history.length ===0 && <Loading></Loading>}
            <h4 className="p3 mb-4 text-center">History</h4>
            <div className="row">
           <marquee scrollamount="20"> <h4 className="text-center">You have made {history.length} orders yet</h4></marquee>

            </div>
            
            <div className="history-page">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Payment Id</th>
                            <th scope="col">Date of Purchase</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            history.map(items => (
                                <tr key={items._id} >
                                    <td>{items._id}</td>
                                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                    <td className="text-center">
                                       
                                    {isAdmin ? 
                                       <select className="form-select" value={items.status} onChange={() => setStatus(items._id)}>
                                        <option value="Approved">Approved</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Delievered">Delievered</option>
                                        <option value="Cancelled">Cancelled</option>
                                   </select>
                                     : 
                                      items.status  
                                    }
                                     
                                     
                       
                                    </td>
                                    <td><Link to={`/history/${items._id}`}>View</Link></td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
