import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

import Loading from '../utils/loading/Loading'

import axios from 'axios'
import Filter from './Filter'
import './Products.css'
import ProductItem from '../utils/ProductItem'

export default function Products() {

    const state = useContext(GlobalState)
    const [products,setProducts] = state.productAPI.products
  
    const [token] = state.token
    const [loading, setLoading] = useState(false)
    const [sort, setSort] = state.productAPI.sort    
    const [category] = state.productAPI.category

    

    const deleteProduct = async (product) => {
        try {
            setLoading(true)
            const destroy = axios.delete(`/api/products/${product._id}`, {
                headers: { Authorization: token }
            })
            await destroy
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleSort = (e) =>{
        setSort(e.target.value)
    }
 
    return (


        <div className="row">

            {/* filter-sidebar */}
            <div className="col-md-2  pl-4">       
            </div>
            <div className="col-md-8 d-flex main">
                    <Filter />	
                
                <span style={{fontSize:'14px',fontWeight:'500'}}> >> All >> {category}</span>
                   <form > <select className="form-select" onChange={handleSort} value={sort}>
                        <option style={{ display: 'none' }}>Sort by Price</option>
                        <option value="lowest">Low to High</option>
                        <option value="highest">High to Low</option>
                    </select>
                </form>
                <div className="productList d-flex">
                   
                     {products.length === 0 && <Loading />}
                        {
                            products.map(product =>
                                <ProductItem product={product} />
                            )
                        }
                    
                </div>
            </div>
            
        </div>
    )
}
