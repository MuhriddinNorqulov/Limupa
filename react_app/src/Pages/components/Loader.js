import {Oval, Bars, RotatingLines} from "react-loader-spinner";
import {useState, useEffect} from "react";

function Loader({size}) {

    return (
        <div style={{marginLeft: '43%',marginTop: '5%', marginBottom: '5%'}}>
            <Oval

                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={1.5}
                color='black'
                secondaryColor='#e1e1e1'
                />

            {/*/>*/}
            {/*<Bars*/}
            {/*    heigth="100"*/}
            {/*    width="100"*/}
            {/*    color="#fed700"*/}

            {/*    ariaLabel="loading-indicator"*/}

            {/*/>*/}
        </div>


    )

}

export default Loader


export function RotatingLoader() {
    return (
        <div style={{marginLeft: '43%',marginTop: '5%', marginBottom: '5%'}}>
            <RotatingLines width="100" strokeWidth="2" />
        </div>
    )
}