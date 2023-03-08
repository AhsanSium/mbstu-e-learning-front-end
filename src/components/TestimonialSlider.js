import React, { Component } from "react";
import Swiper from "react-id-swiper";

class TestimonialSlider extends Component {
  render() {
    const params = {
      slidesPerView: 1,
      loop: true,
      speed: 1000,
      effect: "fade",
      autoplay: {
        delay: 2000
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      renderPagenation: () => <div className="swiper-pagination" />
    };
    let data = [
      {
        testimonialImage: "1.jpg",
        testimonialName: "Ahsan Sium",
        testimonialDesignation: "Founder",
        testimonialText:
          "If you are looking to commit to more than just an individual course, then MBSTU E-learning is the best option for you."
      },
      {
        testimonialImage: "3.jpg",
        testimonialName: "Tanvir Ahmed",
        testimonialDesignation: "Engineer",
        testimonialText:
          "We’ve got the solution: world-class training and development programs developed by top universities and companies."
      },
      {
        testimonialImage: "2.jpg",
        testimonialName: "Zakaria Masud",
        testimonialDesignation: "CEO",
        testimonialText:
          "No matter what you are looking to learn, or gain confidence in, MBSTU E-learning has something for you."
      }
    ];

    let DataList = data.map((val, i) => {
      return (
        <div className="swiper-slide testimonial-slider__single-slide" key={i}>
          <div className="author">
            <div className="author__image">
              <img
                src={`assets/img/testimonial/${val.testimonialImage}`}
                alt=""
              />
            </div>
            <div className="author__details">
              <h4 className="name">{val.testimonialName}</h4>
              <div className="designation">{val.testimonialDesignation}</div>
            </div>
          </div>
          <div className="content">{val.testimonialText}</div>
        </div>
      );
    });

    return (
      <div>
        {/*====================  testimonial slider area ====================*/}
        <div className="testimonial-slider-area testimonial-slider-area-bg section-space--inner--120">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="testimonial-slider">
                  <div className="testimonial-slider__container-area">
                    <Swiper {...params}>{DataList}</Swiper>
                    <div className="swiper-pagination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of testimonial slider area  ====================*/}
      </div>
    );
  }
}

export default TestimonialSlider;
