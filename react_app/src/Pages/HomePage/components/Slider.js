import banner1 from '../../static/images/banner/3_1.jpg'
import banner2 from '../../static/images/banner/3_2.jpg'
import slider1 from '../../static/images/slider/4.jpg'
import slider2 from '../../static/images/slider/5.jpg'
import slider3 from '../../static/images/slider/6.jpg'
import {Carousel, Image} from "react-bootstrap";

function Slider() {
    return (
        <>
            <div className="slider-with-banner">
                <div className="container">
                    <div className="row">
                        {/*<div className="col-lg-3 col-md-4">*/}
                        {/*    <div className="category-menu category-menu-2">*/}
                        {/*        <div className="category-heading">*/}
                        {/*            <h2 className="categories-toggle"><span>categories</span></h2>*/}
                        {/*        </div>*/}
                        {/*        <div id="cate-toggle" className="category-menu-list">*/}
                        {/*            <ul>*/}
                        {/*                <li className="right-menu"><a href="shop-left-sidebar.html">Laptops</a>*/}
                        {/*                    <ul className="cat-mega-menu">*/}
                        {/*                        <li className="right-menu cat-mega-title">*/}
                        {/*                            <a href="shop-left-sidebar.html">Prime Video</a>*/}
                        {/*                            <ul>*/}
                        {/*                                <li><a href="#">All Videos</a></li>*/}
                        {/*                                <li><a href="#">Blouses</a></li>*/}
                        {/*                                <li><a href="#">Evening Dresses</a></li>*/}
                        {/*                                <li><a href="#">Summer Dresses</a></li>*/}
                        {/*                                <li><a href="#">T-shirts</a></li>*/}
                        {/*                                <li><a href="#">Rent or Buy</a></li>*/}
                        {/*                                <li><a href="#">Your Watchlist</a></li>*/}
                        {/*                                <li><a href="#">Watch Anywhere</a></li>*/}
                        {/*                                <li><a href="#">Getting Started</a></li>*/}
                        {/*                            </ul>*/}
                        {/*                        </li>*/}
                        {/*                        <li className="right-menu cat-mega-title">*/}
                        {/*                            <a href="shop-left-sidebar.html">Computers</a>*/}
                        {/*                            <ul>*/}
                        {/*                                <li><a href="#">More to Explore</a></li>*/}
                        {/*                                <li><a href="#">TV & Video</a></li>*/}
                        {/*                                <li><a href="#">Audio & Theater</a></li>*/}
                        {/*                                <li><a href="#">Camera, Photo</a></li>*/}
                        {/*                                <li><a href="#">Cell Phones</a></li>*/}
                        {/*                                <li><a href="#">Headphones</a></li>*/}
                        {/*                                <li><a href="#">Video Games</a></li>*/}
                        {/*                                <li><a href="#">Wireless Speakers</a></li>*/}
                        {/*                            </ul>*/}
                        {/*                        </li>*/}
                        {/*                        <li className="right-menu cat-mega-title">*/}
                        {/*                            <a href="shop-left-sidebar.html">Electronics</a>*/}
                        {/*                            <ul>*/}
                        {/*                                <li><a href="#">Amazon HomePage</a></li>*/}
                        {/*                                <li><a href="#">Kitchen & Dining</a></li>*/}
                        {/*                                <li><a href="#">Furniture</a></li>*/}
                        {/*                                <li><a href="#">Bed & Bath</a></li>*/}
                        {/*                                <li><a href="#">Appliances</a></li>*/}
                        {/*                            </ul>*/}
                        {/*                        </li>*/}
                        {/*                    </ul>*/}
                        {/*                </li>*/}
                        {/*                <li className="right-menu"><a href="shop-left-sidebar.html">TV & Audio</a>*/}
                        {/*                    <ul className="cat-mega-menu">*/}
                        {/*                        <li className="right-menu cat-mega-title">*/}
                        {/*                            <a href="shop-left-sidebar.html">Chamcham</a>*/}
                        {/*                            <ul>*/}
                        {/*                                <li><a href="#">Office</a></li>*/}
                        {/*                                <li><a href="#">Gaming</a></li>*/}
                        {/*                                <li><a href="#">Chromebook</a></li>*/}
                        {/*                                <li><a href="#">Refurbished</a></li>*/}
                        {/*                                <li><a href="#">Touchscreen</a></li>*/}
                        {/*                                <li><a href="#">Ultrabooks</a></li>*/}
                        {/*                                <li><a href="#">Netbook</a></li>*/}
                        {/*                            </ul>*/}
                        {/*                        </li>*/}
                        {/*                        <li className="right-menu cat-mega-title">*/}
                        {/*                            <a href="shop-left-sidebar.html">Sanai</a>*/}
                        {/*                            <ul>*/}
                        {/*                                <li><a href="#">Hard Drives</a></li>*/}
                        {/*                                <li><a href="#">Graphic Cards</a></li>*/}
                        {/*                                <li><a href="#">Processors (CPU)</a></li>*/}
                        {/*                                <li><a href="#">Memory</a></li>*/}
                        {/*                                <li><a href="#">Motherboards</a></li>*/}
                        {/*                                <li><a href="#">Fans & Cooling</a></li>*/}
                        {/*                                <li><a href="#">CD/DVD Drives</a></li>*/}
                        {/*                            </ul>*/}
                        {/*                        </li>*/}
                        {/*                        <li className="right-menu cat-mega-title">*/}
                        {/*                            <a href="shop-left-sidebar.html">Meito</a>*/}
                        {/*                            <ul>*/}
                        {/*                                <li><a href="#">Sound Cards</a></li>*/}
                        {/*                                <li><a href="#">Cases & Towers</a></li>*/}
                        {/*                                <li><a href="#">Casual Dresses</a></li>*/}
                        {/*                                <li><a href="#">Evening Dresses</a></li>*/}
                        {/*                                <li><a href="#">T-shirts</a></li>*/}
                        {/*                                <li><a href="#">Tops</a></li>*/}
                        {/*                            </ul>*/}
                        {/*                        </li>*/}
                        {/*                    </ul>*/}
                        {/*                </li>*/}
                        {/*                <li className="right-menu"><a href="shop-left-sidebar.html">Smartphone</a>*/}
                        {/*                    <ul className="cat-mega-menu cat-mega-menu-2">*/}
                        {/*                        <li className="right-menu cat-mega-title">*/}
                        {/*                            <a href="shop-left-sidebar.html">Camera Accessories</a>*/}
                        {/*                            <ul>*/}
                        {/*                                <li><a href="#">Octa Core</a></li>*/}
                        {/*                                <li><a href="#">Quad Core</a></li>*/}
                        {/*                                <li><a href="#">Dual Core</a></li>*/}
                        {/*                                <li><a href="#">7.0 Screen</a></li>*/}
                        {/*                                <li><a href="#">9.0 Screen</a></li>*/}
                        {/*                                <li><a href="#">Bags & Cases</a></li>*/}
                        {/*                            </ul>*/}
                        {/*                        </li>*/}
                        {/*                        <li className="right-menu cat-mega-title">*/}
                        {/*                            <a href="shop-left-sidebar.html">Meito</a>*/}
                        {/*                            <ul>*/}
                        {/*                                <li><a href="#">Batteries</a></li>*/}
                        {/*                                <li><a href="#">Microphones</a></li>*/}
                        {/*                                <li><a href="#">Stabilizers</a></li>*/}
                        {/*                                <li><a href="#">Video Tapes</a></li>*/}
                        {/*                                <li><a href="#">Memory Card Readers</a></li>*/}
                        {/*                                <li><a href="#">Tripods</a></li>*/}
                        {/*                            </ul>*/}
                        {/*                        </li>*/}
                        {/*                    </ul>*/}
                        {/*                </li>*/}
                        {/*                <li><a href="#">Cameras</a></li>*/}
                        {/*                <li><a href="#">Headphone</a></li>*/}
                        {/*                <li><a href="#">Smartwatch</a></li>*/}
                        {/*                <li><a href="#">Out Door Room</a></li>*/}
                        {/*                <li><a href="#">Chamcham</a></li>*/}
                        {/*                <li className="rx-child"><a href="#">Mobile & Tablets</a></li>*/}
                        {/*                <li className="rx-child"><a href="#">Accessories</a></li>*/}
                        {/*                <li className="rx-parent">*/}
                        {/*                    <a className="rx-default">More Categories</a>*/}
                        {/*                    <a className="rx-show">Less Categories</a>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*</div>*/}

                        <div className="col-lg-9 col-md-8">
                           <Image src={slider1} />
                        </div>

                        <div className="col-lg-3 col-md-4 text-center pt-sm-30">
                            <div className="li-banner">
                                <a href="#">
                                    <img src={banner1} alt="" />
                                </a>
                            </div>
                            <div className="li-banner mt-15 mt-sm-30 mt-xs-25 mb-xs-5">
                                <a href="#">
                                    <img src={banner2} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Slider