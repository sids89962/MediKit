import axios from 'axios'
import {useState, useEffect} from 'react'


export default function UserAPI(token) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart,setCart] = useState([])
    const [history,setHistory] = useState([])
  
    useEffect(() => {
        if(token){
            const getUser = async () => {
                try{
                    const res = await axios.get('/users/infor',{
                        headers: {Authorization :token}
                    })
                   
                    setIsLoggedIn(true)
                    res.data.role ===1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)
                }catch(err){
                    
                    console.log(err)
                }
            }
             getUser()
        }
    },[token])
    


    const addCart = async (product) => {
        if(!isLoggedIn) return alert("Please login to continue shopping")
        
        const check = cart.every(item =>{
            return item._id !== product._id
        })
       try{
        if(check){
            setCart([...cart, {...product, quantity:1 }])

            await axios.patch('/users/addcart' , {
                cart: [...cart, {...product, quantity:1 }]
            }, {
                headers: {Authorization: token}
            })
        }else{
            alert("This product has been added to cart")
        }
        }catch(err)
        {
            console.log(err)
        }
    }   
     return {
         isLogged: [isLoggedIn, setIsLoggedIn],
        isAdmin : [isAdmin, setIsAdmin] ,
        cart: [cart, setCart],
        addCart: addCart,
        history:[history,setHistory]
      
        }

}
