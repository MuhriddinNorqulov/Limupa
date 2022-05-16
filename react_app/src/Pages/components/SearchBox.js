import {useState} from "react";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";


function SearchBox() {
    const navigate = useNavigate()
    const location = useLocation()

    const [q, setQ] = useState('')
    const submitHandler = (e) => {

        e.preventDefault()



        navigate({
            pathname: '/search',
            search: `?q=${q}`
        })
        setQ('')


    }


    return (
        <form onSubmit={submitHandler} className="hm-searchbox">

            <input
                value={q}
                type="text"
                placeholder="Enter your search key ..."
                onChange={(e) => setQ(e.target.value)}
            />
            <button className="li-btn" type="submit"><i className="fa fa-search"></i></button>
        </form>
    )
}

export default SearchBox