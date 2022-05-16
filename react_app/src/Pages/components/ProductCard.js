
import {RiStarFill, RiStarHalfFill, RiStarLine} from 'react-icons/ri'
import {paste} from "@testing-library/user-event/dist/paste";
export function RatingStar({num}) {
    const array = []
    const fill_star = <RiStarFill color='#fed700' />
    const star = <RiStarLine color='#fed700' />
    const star_half = <RiStarHalfFill color='#fed700' />

    for (let i = 1; i <= 5; i++) {
        if (i <= num) {
            array.push(fill_star)
        }
        else {
            if (i - num < 1) {
                array.push(star_half)
            }
            else {
                array.push(star)
            }
        }
    }

    return (
        array.map((item, index) =>{
            return(
                <li key={index}>{item}</li>
            )
        })
    )
}



