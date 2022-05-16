import {Link} from "react-router-dom";


function Breadcrumb({slug}) {
    return (
        <div className="breadcrumb-area">
            <div className="container">
                <div className="breadcrumb-content">
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li className="active">{slug}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb