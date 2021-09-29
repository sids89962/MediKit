import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import './Products.css'

export default function Filter({getProducts}) {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productAPI.products
    const [category, setCategory] = state.productAPI.category
   
    // const [search, setSearch] = state.productAPI.search


    const uniqueList = [...new Set(products.map(x => { return x.category }))]

    const handleCategory = (e) => {
            setCategory(e.target.value)      
          
    }


    return (
        <div className="filter_menu">
            <div className="row">
                
                <div class="scrollmenu" id="scrollmenu">
                    <button href="active" className="active" value='' onClick={handleCategory}>All</button>
                    {
                        uniqueList.map(x => (
                             <button onClick={handleCategory} value={x}>{x}</button>
                        ))
                    }

                </div>
             
            </div>
        </div>
    )
}
