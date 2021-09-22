import React,{useState,useEffect,useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import './Orderhistory.css'
export default function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])
    const [isAdmin] = state.userAPI.isAdmin
    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item => {
                if(item._id === params.id) setOrderDetails(item)
             })
        }
    },[params.id, history])

   if(orderDetails.length === 0) return null ;
    return (
        <div className="container">
                <table className="table table-bordered">
                     <thead className="table-dark">
                        <tr>
                            <th scope="col-3"></th>
                            <th scope="col-3">Name</th>
                            <th scope="col-3">Quantity</th>
                            <th scope="col-3">Price</th>
                            
                        </tr>
                    </thead>
            {orderDetails.cart.map(x => 
                
                    <tbody>
                        {
                            <tr>
                                <td className="text-center"><img src={x.image} style={{height:'70px'}}></img></td>
                                <td>{x.name.slice(0,40)}</td>
                                <td>{x.quantity}</td>
                                <td>{x.price}</td>
                            </tr>
                        }
                    </tbody>

                )} </table>
        </div>
    )
}
