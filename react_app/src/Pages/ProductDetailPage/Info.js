

function Info() {
    return (
        <>
            <div className="product-additional-info pt-25">

                <div className="product-social-sharing pt-25">
                    <ul>
                        <li className="facebook"><a href="#"><i className="fa fa-facebook"></i>Facebook</a>
                        </li>
                        <li className="twitter"><a href="#"><i className="fa fa-twitter"></i>Twitter</a>
                        </li>
                        <li className="google-plus"><a href="#"><i
                            className="fa fa-google-plus"></i>Google +</a></li>
                        <li className="instagram"><a href="#"><i
                            className="fa fa-instagram"></i>Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="block-reassurance">
                <ul>
                    <li>
                        <div className="reassurance-item">
                            <div className="reassurance-icon">
                                <i className="fa fa-check-square-o"></i>
                            </div>
                            <p>Security policy (edit with Customer reassurance module)</p>
                        </div>
                    </li>
                    <li>
                        <div className="reassurance-item">
                            <div className="reassurance-icon">
                                <i className="fa fa-truck"></i>
                            </div>
                            <p>Delivery policy (edit with Customer reassurance module)</p>
                        </div>
                    </li>
                    <li>
                        <div className="reassurance-item">
                            <div className="reassurance-icon">
                                <i className="fa fa-exchange"></i>
                            </div>
                            <p> Return policy (edit with Customer reassurance module)</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Info