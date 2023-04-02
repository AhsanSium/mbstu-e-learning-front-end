import React, { Component } from "react";
import Swiper from "react-id-swiper";

class ServiceGridSlider extends Component {
  render() {
    const params = {
      slidesPerView: 3,
      loop: true,
      speed: 1000,
      watchSlidesVisibility: true,
      spaceBetween: 30,
      autoplay: {
        delay: 1000
      },
      // Responsive breakpoints
      breakpoints: {
        1499: {
          slidesPerView: 3
        },

        991: {
          slidesPerView: 2
        },

        767: {
          slidesPerView: 1
        },

        575: {
          slidesPerView: 1
        }
      }
    };
    let data = [
      {
        img: "pxfuel.jpg",
        serviceTitle: "React - The Complete Guide (incl Hooks, Redux)",
        serviceExcerpt:
          "This course will teach you React.js in a practice-oriented way, using all the latest patterns and best practices.",
        serviceUrl: "service-details-left-sidebar"
      },
      {
        img: "pxfuel2.jpg",
        serviceTitle: "The Complete React Native Course",
        serviceExcerpt:
          "This course will get you up and running with React Native quickly, and teach you the core knowledge you need to deeply understand.",
        serviceUrl: "service-details-left-sidebar"
      },
      {
        img: "pxfuel3.jpg",
        serviceTitle: "JavaScript: Understanding the Weird Parts",
        serviceExcerpt:
          "This course is about understanding Javascript concepts behind it, and how it works. Then writing code. That's the proper way to learn code.",
        serviceUrl: "service-details-left-sidebar"
      },
      {
        img: "pxfuel4.jpg",
        serviceTitle: "MongoDB - The Complete Developer Guide",
        serviceExcerpt:
          "Join this bestselling MongoDB course to learn all about this extremely popular database and query language.",
        serviceUrl: "service-details-left-sidebar"
      }
    ];

    let DataList = data.map((val, i) => {
      return (
        <div className="swiper-slide" key={i}>
          <div className="service-grid-item service-grid-item--style2">
            <div className="service-grid-item__image">
              <div className="service-grid-item__image-wrapper">
                <a href={`${process.env.PUBLIC_URL}/${val.serviceUrl}`}>
                  <img
                    src={`assets/img/service/${val.img}`}
                    className="img-fluid"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="service-grid-item__content">
              <h3 className="title">
                <a href={`${process.env.PUBLIC_URL}/${val.serviceUrl}`}>
                  {val.serviceTitle}
                </a>
              </h3>
              <p className="subtitle">{val.serviceExcerpt}</p>
              <a
                href={`${process.env.PUBLIC_URL}/${val.serviceUrl}`}
                className="see-more-link"
              >
                SEE MORE
              </a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        {/*====================  project grid slider area ====================*/}
        <div className="service-slider-title-area grey-bg section-space--inner--top--120 section-space--inner--bottom--285">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title-area text-center">
                  <h2 className="section-title mb-0">
                    Latest Tutorials 
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="service-grid-slider-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="service-slider">
                  <div className="service-slider__container service-slider__container--style2">
                    <Swiper {...params}>{DataList}</Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of project grid slider area  ====================*/}
      </div>
    );
  }
}

export default ServiceGridSlider;
