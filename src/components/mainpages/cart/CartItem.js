import React from 'react'
import './Cart.css'

export default function CartItem({cart, decrement, increment, removeProduct}) {
    return (
        <div className="container-fluid">
                {    cart.map(x => ( 
                         <div className="row border p-3 cart-item">
                         <div className="col-md-3 text-center cartItems">
                             <img src={x.image} alt={x.name} style={{ height: 70 }} />
                         </div>
                         <div className="col-md-3 text-center cartItems">
                             <span className="cartItem-Text">{x.name.slice(0,20)}</span>
                         </div>
                         <div className="col-md-3 text-center cartItems">
                             <button className=" btn-success" 
                                onClick={() => increment(x._id)}>
                                 <i className="fas fa-plus" ></i></button>

                             <span className="qty">{x.quantity}</span>
                             <button className=" btn-danger" 
                               onClick={() => decrement(x._id)}>
                                   <i className="fas fa-minus"></i></button>
                         </div>
                         <div className="col-md-2 text-center cartItems">
                             <span className="cartItem-Text">$ {x.price}</span>
                         </div>
                         <div className="col-md-1 text-center cartItems">
                             <span className="cartItem-Text"><i className="fas fa-trash" onClick={() => removeProduct(x._id)}></i></span>
                         </div>
     
                     </div>

                    ))
            }
        </div>
    )
}
