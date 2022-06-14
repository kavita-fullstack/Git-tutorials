import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from './Cards';
import "./style.css";
import axios from "axios";

function InfiniteCarouse() {

  const [no, setno] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get("https://jobapp.freedynamicdns.org/users").then(res => {

      console.log(res.data);
      console.log(res.data.length);
      setno(res.data.length);
      setData(res.data);
    })
  }, [])

  let infiniteScrolling = true;

  if(no<6){
     infiniteScrolling = false;
  }

  var settings = {
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],

    //pauseOnHover: true,
    autoplay: true,
    //lazyLoad: true,
    cssEase: "linear",
    autoplaySpeed: 2000,
    infinite: infiniteScrolling,
    //centerMode: true,
    speed: 800,
    slidesToShow: 6,
    //arrows:true,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings} arrows={true}>
        {data.map((val) => {
          return (
            <Cards name={val.username}
              exp={!val.experience ? null : val.experience}
              skills={val.technologies == undefined ? "" : val.technologies.map((j) => j.technology).join(", ")}
              img={val.photo == undefined ? "" : `https://jobapp.freedynamicdns.org${val.photo.url}`}
            />
          )
        })}
      </Slider>
    </div>
  );
}

export default InfiniteCarouse;