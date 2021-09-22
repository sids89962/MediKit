import React,{useState, useContext} from 'react'
import { GlobalState } from '../GlobalState'

export default function CategoryAPI() {
    const state = useState(GlobalState)
   
    const [products] = state.productAPI.products
    console.log(products)
    const [categories, setCategories] = useState([])
    

    return{
        category: [categories, setCategories]
    }
}
