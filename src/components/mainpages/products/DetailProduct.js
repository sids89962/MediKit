import React,{useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import ProductItem from '../utils/ProductItem'

export default function DetailProduct() {
    const params = useParams()
   
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params,products])
    if(detailProduct === 0) return <Loading />;
   
    return (
        <>
        <div className="container">
            <div className="row">
                
                    <div className="col-md-6 product-details">
                    <img src={detailProduct.image} alt=""></img>
                    </div>
                    <div className="col-md-6 product-details-right">
                        <p className="category">{detailProduct.category}</p>
                        <h1>{detailProduct.name}</h1>
                        <div className="rating">
                            <i className="fas fa-star"></i><i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i><i className="fas fa-star"></i>
                            <span> {detailProduct.rating} from 30 reviews</span>
                        </div>
                        <div className="price">
                            <span>$</span><h2 style={{display:'inline-block', fontWeight:'700'}}>{detailProduct.price}</h2>
                        </div>
                        <div className="description">
                            <p>{detailProduct.description}</p>
                        </div>
                        <div className="addToCart" >
                            
                            <button className="btn btn-primary" >Add to Cart</button>
                        </div>

                    </div>

                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-md-12">
                    <h3>Also bought</h3>
                    </div>
                   
                </div>
                <div className="col-md-12 d-flex productList">    
                    {
                        products.slice(0,10).map(product => {
                            return product.category === detailProduct.category ?
                            <ProductItem key={product._id} product={product} /> : null
                            
                        })
                    }

                    
                </div>
        </div>
        </>
    )
}
