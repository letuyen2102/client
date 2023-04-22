/*eslint-disable*/
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const data = [
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/10-800x800.png',
        quantity: 122,
        name: 'THIẾT KẾ RIÊNG'
    },
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/1-800x800.png',
        quantity: 56,
        name: 'ÁO KHOÁC'
    },
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/2-800x800.png',
        quantity: 70,
        name: 'ÁO KIỂU'
    },
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/3-800x800.png',
        quantity: 59,
        name: 'ÁO SƠ MI'
    },
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/4-800x800.png',
        quantity: 86,
        name: 'ÁO VEST'
    },
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/5-800x800.png',
        quantity: 97,
        name: 'CHÂN VÁY'
    },
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/myway-cat-dam-maxi.png',
        quantity: 26,
        name: 'ĐẦM MAXI'
    },
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/myway-cat-dam-om.png',
        quantity: 33,
        name: 'ĐẦM ÔM'
    },
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/8-800x800.png',
        quantity: 233,
        name: 'ĐẦM XÒE'
    },
    {
        image: 'https://mywaymyfashion.com.vn/wp-content/uploads/2022/12/9-800x800.png',
        quantity: 75,
        name: 'QUẦN'
    }
]

export default function SimpleSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };
    return (
        <Slider {...settings}>
            {
                data.map((each, index) => {
                    return <div key={index}>
                        <div style={{ padding: '0px 5px' }}>
                            <Link to=''>
                                <img src={each.image} style={{ width: '100%', height: '100%' }} />
                            </Link>
                        </div>
                        <Link to= '' style={{ fontSize: '14px', letterSpacing: '1.4px', textAlign: 'center' , display : 'block' , fontWeight : '600' }}>{each.name}</Link>
                        <p style={{ fontSize: '12px', textAlign: 'center' }}>{each.quantity}</p>
                    </div>
                })
            }
        </Slider>
    );
}