import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { useHistory, useParams } from 'react-router-dom'
import './createProduct.css'
const intialState = {
    name: '',
    category: '',
    description: '',
    price: '',
    image: ''

}

export default function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(intialState)
    const [loading, setLoading] = useState(false)
   
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

   

    const history = useHistory()
    const param = useParams()


    const [products] = state.productAPI.products
    const uniqueList = [...new Set(products.map(x => { return x.category }))]
    const [onEdit, setOnEdit] = useState(false)


    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) setProduct(product)
            })
            
        }else{
            setProduct(intialState)

        }

    },[param.id, products])
  
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isAdmin) return ("You are not an admin")

        try {
         
            if (onEdit) {
            
                await axios.put(`/api/products/${product._id}`, { ...product }, {
                    headers: { Authorization: token }

                })
            } else {
                await axios.post('/api/products', { ...product }, {
                    headers: { Authorization: token }
                })
            }
            setProduct(intialState)
            history.push("/")
        } catch (err) {
          alert(err.response.data.msg)
        }

    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className="createProductForm">
                            <h4>Create Your Product</h4>
                            <div className="form-row">
                                <div className="form-group col-md-6">

                                    <input type="name" className="form-control" id="exampleInputname1" aria-describedby="nameHelp" placeholder="Enter name" name="name" value={product.name}
                                        onChange={handleChangeInput} 
                                       />
                                </div>
                                <div className="form-group col-md-6">

                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Image UrL" name="image"
                                        value={product.image}
                                        onChange={handleChangeInput} />

                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <input type="name" className="form-control" id="exampleInputname1" aria-describedby="nameHelp" placeholder="Price" name="price"
                                        value={product.price}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="col-md-6">
                                    <select name="category" value={product.category} onChange={handleChangeInput} className="form-select" >
                                        <option value="">Please select a category</option>
                                        {
                                            uniqueList.map(category => (
                                                <option value={category}>
                                                    {category}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="form-row mb-2">
                                <textarea placeholder="Enter description" className="form-control" value={product.description}
                                    name="description" row="5"
                                    onChange={handleChangeInput}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">{onEdit ? "Update" : "Create"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
