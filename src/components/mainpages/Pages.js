import React, { useContext } from 'react'
import {Switch , Route} from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './products/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/not_Found/NotFound'
import CreateProduct from './createProduct/CreateProduct'

import {GlobalState} from '../../GlobalState'
import Orderhistory from './history/Orderhistory'
import OrderDetails from './history/OrderDetails'

export default function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" excat component={DetailProduct} />

            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register}/>
            <Route path="/cart" exact component={Cart}/>
            <Route path="/history" exact component={isLogged ? Orderhistory : NotFound} />
            <Route path="/history/:id" exact component= {isLogged ? OrderDetails : NotFound}/>
            <Route path="*" component={NotFound} exact/>

        </Switch>
    )
}
