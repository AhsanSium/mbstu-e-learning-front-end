import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
class ServiceTabExample extends Component {
  render() {
    /* service tab menu */
    let serviceTabMenuData = [
      { iconName: "flaticon-002-welding", tabMenuName: "Web Development" },
      {
        iconName: "flaticon-004-walkie-talkie",
        tabMenuName: "Mobile Apps"
      },
      { iconName: "flaticon-015-cart", tabMenuName: "Programming Languages" },
      { iconName: "flaticon-010-tank-1", tabMenuName: "Database" }
    ];

    let serviceTabMenuDatalist = serviceTabMenuData.map((val, i) => {
      return (
        <Tab key={i}>
          {" "}
          <span className="icon">
            <i className={val.iconName} />
          </span>{" "}
          <span className="text">{val.tabMenuName}</span>
        </Tab>
      );
    });

    /* service tab content */

    let serviceTabContentData = [
      {
        bgUrl: "pxfuel.jpg",
        contentTitle: "Modern React with Redux",
        contentDesc:
          "This course will teach you React.js in a practice-oriented way, using  Redux system and all the latest patterns and best practices.",
        serviceLink: "service-details-left-sidebar"
      },
      {
        bgUrl: "service-tab1.jpg",
        contentTitle: "The Complete React Native Course",
        contentDesc:
          "This course will get you up and running with React Native quickly, and teach you the core knowledge you need to deeply understand.",
        serviceLink: "service-details-left-sidebar"
      },
      {
        bgUrl: "service-tab1.jpg",
        contentTitle: "JavaScript: Understanding the Weird Parts",
        contentDesc:
          "This course is about understanding Javascript concepts behind it, and how it works. Then writing code. That's the proper way to learn code.",
        serviceLink: "service-details-left-sidebar"
      },
      {
        bgUrl: "service-tab1.jpg",
        contentTitle: "MongoDB - The Complete Developer Guide",
        contentDesc:
          "Join this bestselling MongoDB course to learn all about this extremely popular database and query language from the ground up, in great detail",
        serviceLink: "service-details-left-sidebar"
      }
    ];

    let serviceTabContentDatalist = serviceTabContentData.map((val, i) => {
      return (
        <TabPanel key={i}>
          <div
            className="service-tab__single-content-wrapper"
            style={{
              backgroundImage: `url(assets/img/backgrounds/${val.bgUrl})`
            }}
          >
            <div className="service-tab__single-content">
              <h3 className="service-tab__title">{val.contentTitle}</h3>
              <p className="service-tab__text">{val.contentDesc}</p>
              <a
                href={`${process.env.PUBLIC_URL}/${val.serviceLink}`}
                className="see-more-link"
              >
                SEE MORE
              </a>
            </div>
          </div>
        </TabPanel>
      );
    });

    return (
      <div>
        {/*====================  service tab area ====================*/}
        <div className="service-tab-area section-space--inner--120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title-area text-center">
                  <h2 className="section-title section-space--bottom--50">
                    Most Viewed Courses 
                  </h2>
                </div>
              </div>
              <div className="col-lg-12">
                {/* service tab wrapper */}

                <div className="service-tab-wrapper">
                  <Tabs>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <TabList>
                          <div className="service-tab__link-wrapper">
                            {serviceTabMenuDatalist}
                          </div>
                        </TabList>
                      </div>

                      <div className="col-md-8">
                        {serviceTabContentDatalist}
                      </div>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of service tab area  ====================*/}
      </div>
    );
  }
}

export default ServiceTabExample;
