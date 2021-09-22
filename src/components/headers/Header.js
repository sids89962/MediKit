import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Header() {
    const state = useContext(GlobalState)

    const [isLoggedIn, setIsLoggedIn] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [search, setSearch] = state.productAPI.search


    const logoutUser = async () => {
        try {
            await axios.get('/users/logout')
            localStorage.removeItem('firstLogin')
            setIsAdmin(false)
            setIsLoggedIn(false)
            window.location.href = "/"
        } catch (err) {
            console.log(err)
        }
    }
    const adminRouter = () => {
        return (
            <>
                <li className="nav-item px-lg-3 py-3 py-lg-4">
                    <Link to="/create_product" className="anchor">Create Product</Link>
                </li>
            </>
        )
    }
    const loggedRouter = () => {
        return (
            <>
                <li className="nav-item px-lg-3 py-3 py-lg-4"><Link to="/history" className="anchor">History</Link></li>
                <li className="nav-item px-lg-3 py-3 py-lg-4"><Link to="/" onClick={logoutUser} className="anchor">Logout</Link></li>
            </>
        )
    }
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light " id="mainNav">
                <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg" alt="logo" ></img>
                <h3><Link className="navbar-brand" to="/">{isAdmin ? 'Admin' : 'E-Com'}</Link></h3>
                <form>
                    <input placeholder="search" tye="text" value={search} onChange={e => setSearch(e.target.value.toLowerCase())}/>
                </form>
                <ul className="navbar-nav ml-auto py-4 py-lg-0">
                    <li className="nav-item px-lg-3 py-3 py-lg-4"><Link to="/" className="anchor">{isAdmin ? 'Products' : 'Shop'}</Link></li>
                    {isAdmin && adminRouter()}
                    {
                        isLoggedIn
                            ? loggedRouter()
                            : (<li className="nav-item px-lg-3 py-3 py-lg-4"><Link to="/login" className="anchor">Login || Register </Link></li>)
                    }
                    {
                        isAdmin ? '' :
                            (<Link to="/cart" className="anchor" ><li className="nav-item px-lg-3 py-3 py-lg-4" ><i className="fas fa-shopping-cart mr-4">
                                <span className="badge badge-danger">{cart.length}</span></i></li></Link>)
                    }
                </ul>
            </nav>
        </header>
    )
}
