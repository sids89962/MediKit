import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ProductAPI() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      console.log(sort)
        const getProducts = async () => {           
              if(category === ''){
                setLoading(true)
                const res = await axios.get(`/api/products`)
                setProducts(res.data)
                setResult(res.data.length)
                setLoading(false)            
             }else{
                setLoading(true)
                const res = await axios.get(`/api/products?category=${category}`)
                setProducts(res.data)
                setResult(res.data.length)
                setLoading(false)   
             }
            }
        getProducts()
    }, [setProducts,,category])
    return {
        products: [products, setProducts],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult] 

    }
}
