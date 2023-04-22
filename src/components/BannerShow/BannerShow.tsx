/*eslint-disable*/
import React from "react"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const divStyle = {
    backgroundSize: 'contain',
    paddingTop : '50%',
    backgroundRepeat : 'no-repeat'
}
const slideImages = [
    {
        url: 'https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/slider_2.jpg?1677145527006'
    },
    {
        url: 'https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/slider_3.jpg?1677145527006'
    },
    {
        url: 'https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/slider_4.jpg?1677145527006'
    },
];
const BannerShow: React.FC = (props) => {
    return (
        <div className="slide-container">
            <Slide duration={5000} arrows={false}>
                {slideImages.map((slideImage, index) => (
                    <div key={index} style ={{width : '100%'}}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}

export default BannerShow