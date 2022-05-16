import img1 from '../../static/images/banner/2_1.jpg'
import img2 from '../../static/images/banner/2_2.jpg'
import img3 from '../../static/images/banner/1_5.jpg'

function Banner() {
    return(
        <div className="container">
            {/*<div className="li-static-banner pt-20 pt-sm-30">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-lg-4 col-md-4 text-center">*/}
            {/*                <div className="single-banner pb-xs-30">*/}
            {/*                    <a href="#">*/}
            {/*                        <img src={img1} alt="Li's Static Banner" />*/}
            {/*                    </a>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-lg-4 col-md-4 text-center">*/}
            {/*                <div className="single-banner pb-xs-30">*/}
            {/*                    <a href="#">*/}
            {/*                        <img src={img2} alt="Li's Static Banner" />*/}
            {/*                    </a>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-lg-4 col-md-4 text-center">*/}
            {/*                <div className="single-banner">*/}
            {/*                    <a href="#">*/}
            {/*                        <img src={img3} alt="Li's Static Banner" />*/}
            {/*                    </a>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="li-banner-2 pt-15">
                <div className="row">

                    <div className="col-lg-6 col-md-6">
                        <div className="single-banner">
                            <a href="#">
                                <img src={img1} alt="Li's Static Banner" />
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-banner pt-xs-30">
                            <a href="#">
                                <img src={img2} alt="Li's Static Banner" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Banner