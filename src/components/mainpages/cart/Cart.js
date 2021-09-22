import React , {useContext,useEffect,useState}from 'react'
import { GlobalState } from '../../../GlobalState'

import CartItem from './CartItem'
import CartTotal from './CartTotal'
import axios from 'axios'
import './Cart.css'
export default function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    // const [callback, setCallback] = state.userAPI.callback
    const [total,setTotal] = useState(0)

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev,item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }
        getTotal()
    },[cart])

    const addToCart = async () => {
        await axios.patch('/users/addcart',{cart}, {
            headers : 
             {
                  Authorization : token
             }
        })
    }
    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })
        setCart([...cart])
        addToCart()
    }
    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity  === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        addToCart()
    }
    const removeProduct = id => {
        if(window.confirm("Do you want to delete this product")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index,1)
                }
            })
        }

         setCart([...cart])
         addToCart()
    }
    const checkout = async () =>{
        console.log('request recived')
        await axios.post('/api/payment',{cart},{
            headers: {Authorization:token}
        })
        setCart([])
        addToCart([])
        alert("You have successfully placed an order")
       
    }
    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize:"5rem"}}>Cart Empty</h2>

    return (                    
        <div className="container-fluid cart-page">
            <div className="row">
                <div className="col-md-8 ">
                    <h4>Order</h4>
                    
                    <CartItem cart={cart} 
                        decrement={decrement} 
                        increment={increment}
                        removeProduct={removeProduct}
                    />

                </div>
                <div className="col-md-4">
                
                    
                   <h4>Payment Summary</h4>
                   
                   <div className="cartTotal">
                        <CartTotal total={total} />
                   </div>
                   <button className="btn btn-primary checkout" onClick={() => checkout()}>Checkout</button>
                </div>
            </div>
            </div>
    )
        
   
}
