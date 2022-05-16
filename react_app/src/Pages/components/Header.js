import {BsCart4, BsHeart } from 'react-icons/bs'
import logo from "../static/images/menu/logo/1.jpg"
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {NavDropdown} from "react-bootstrap";
import {AiOutlineUser} from "react-icons/ai";
import {BsExclamationLg} from 'react-icons/bs'
import {logout} from "../../actions/userAction";
import {AiOutlineLogout, AiOutlineLogin, AiOutlineUserAdd} from 'react-icons/ai'
import SearchBox from "./SearchBox";
import {CgProfile} from 'react-icons/cg'
import '../static/css/material-design-iconic-font.min.css'
import '../static/css/font-awesome.min.css'

import "../static/css/bootstrap.min.css"
import "../static/css/helper.css"
import '../static/css/style.css'
import "../static/css/responsive.css"
import '../main.css'

function Header() {
    const cart = useSelector(state => state.cart)
    const wishlist = useSelector(state => state.wishlist)
    const {cartItems} = cart
    const {wishlistItems} = wishlist
    const cart_total = cartItems.reduce((acc, item) => acc + item.qty, 0)
    const wishlist_total = wishlistItems.reduce((acc, item) => acc + 1, 0)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const [navLink, setNavLink] = useState([]);


    return(
        <>
            <header>

                <div className="header-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3 col-md-4">
                                <div className="header-top-left">
                                    <ul className="phone-wrap">
                                        <li><span>Telephone Enquiry:</span><a href="#">(+123) 123 321 345</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-9 col-md-8">
                                <div className="header-top-right">
                                    <ul className="ht-menu">

                                        <li>
                                            <div className="ht-setting-trigger"><span>Setting</span></div>

                                        </li>

                                        <li>
                                            <span className="currency-selector-wrapper">Currency :</span>
                                            <div className="ht-currency-trigger"><span>USD $</span></div>

                                        </li>

                                        <li>
                                            <span className="language-selector-wrapper">Language :</span>
                                            <div className="ht-language-trigger"><span>English</span></div>

                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3">
                                <div className="logo pb-sm-30 pb-xs-30">
                                    <Link to='/'>
                                        <img src={logo} alt="Logo" />
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
                                
                                <SearchBox />

                                <div className="header-middle-right">
                                    <ul className="hm-menu">
                                        <li className="hm-wishlist">


                                            <NavDropdown className='user_info'
                                                         title={<span>
                                                 <span
                                                     className="cart-item-count wishlist-item-count">{userInfo ?
                                                        userInfo.name.charAt(0)
                                                        :
                                                        <BsExclamationLg fontSize='10px'/>
                                                     }
                                                 </span>
                                                <AiOutlineUser fontSize='26px' className='nav-icon'/>
                                            </span>}>
                                                {userInfo ?
                                                    <>
                                                        <div className='dropdown-item'>
                                                            <Link to='/profile'>
                                                                <CgProfile className='user_options'/>profile
                                                            </Link>
                                                        </div>
                                                        <hr/>
                                                        <div className='dropdown-item' onClick={logoutHandler}>
                                                            <AiOutlineLogout className='user_options'  />logout
                                                        </div>

                                                    </>
                                                    : <>

                                                            <div className='dropdown-item'>
                                                                <Link to='/login'>
                                                                    <AiOutlineLogin className='user_options' />login
                                                                </Link>
                                                            </div>

                                                        <div className='dropdown-item'>
                                                            <Link to='/signup'>
                                                                <AiOutlineUserAdd className='user_options'  />sign up
                                                            </Link>
                                                        </div>

                                                    </>
                                                }
                                            </NavDropdown>

                                        </li>

                                        <li className="hm-wishlist">
                                            <Link to='/wishlist'>
                                                <span className="cart-item-count wishlist-item-count">{wishlist_total}</span>
                                                <BsHeart className='nav-icon' />
                                            </Link>
                                        </li>

                                        <li className="hm-wishlist">
                                            <Link to={'/cart'}>
                                                <span className="cart-item-count wishlist-item-count">{cart_total}</span>
                                                <BsCart4 fontSize='26px' className='nav-icon' />
                                            </Link>

                                        </li>

                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="header-bottom header-sticky d-none d-lg-block d-xl-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">

                                <div className="hb-menu">
                                    <nav>
                                        <ul>

                                            <li><Link to='/cart'>Shopping Cart</Link></li>
                                            <li><Link to='/profile'>My Profile</Link></li>
                                            <li><Link to='/login'>Login</Link></li>
                                            <li><Link to='/signup'>Sign Up</Link></li>
                                        </ul>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="mobile-menu-area d-lg-none d-xl-none col-12">
                    <div className="container">
                        <div className="row">
                            <div className="mobile-menu">
                            </div>
                        </div>
                    </div>
                </div>

            </header>
        </>


    )
}

export default Header