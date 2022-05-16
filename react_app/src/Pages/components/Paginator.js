import {Pagination} from "@mui/material";
import {useState, useEffect} from "react";
import {useParams, useNavigate, useLocation} from "react-router";
import {useSearchParams, createSearchParams} from "react-router-dom";


function Paginator({num_pages, current}) {
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const location = useLocation()
    const [params, setParams] = useSearchParams()

    useEffect(() => {
        setPage(Number(current))
    }, []);


    const handleChange = (event, value) => {

        setPage(value)

        const params_object = Object.fromEntries([...params])
        params_object['page'] = value
        // console.log(params_object)

        navigate({
            search: createSearchParams(params_object).toString()
        })
    }


    return (
        <Pagination
            page={page}
            count={num_pages}
            onChange={handleChange}
            color="secondary"/>
    )
}

export default Paginator