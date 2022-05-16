import Header from "../components/Header";
import Slider from "./components/Slider";
import Banner from "./components/Banner";
import Products from "../components/Products";
import Footer from "../components/Footer";

function Home() {
    return(

        <>
            <Header />
            {/*<Slider />*/}
            <Banner />
            <Products />
            <br/><br/><br/><br/>
            <Footer />
        </>

    )
}

export default Home