import Collection from "../../components/Collection/Collection"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"

const PageShop: React.FC<{ queryApi: string, queryString: string }> = (props) => {
    return (
        <div>
            <Header />

            <Collection queryAPI={props.queryApi} queryString={props.queryString} />

            <Footer />
        </div>
    )
}

export default PageShop