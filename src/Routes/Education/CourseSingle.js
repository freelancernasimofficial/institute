import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Axios from "axios";
import PageHeader from "../../../Components/Layout/PageHeader";
import Container from "../../../Components/Layout/Container";
import Reacthtmlparser from "react-html-parser";
import BackButton from "../../../components/BackButton";
import FrontAccordion from "../../../components/FrontAccordion";
import { UserContext } from "../../helpers/AuthContext";
import sslcomlogo from "../../assets/images/ssl.png"
const CourseSingle = (props) => {
  const { currentUser } = useContext(UserContext);
  const [course, setcourse] = useState(props.data?.course);
  const [chapters, setChapters] = useState(props.data?.chapters);
  const [howToMessage, setHowToMessage] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(false);
  const [discountWithTransFee, setDiscountWithTransFee] = useState(null);
  

  const location = useLocation();

  useEffect(() => {
    Axios.get(location.pathname, { params: { course: props.data?.course } })
      .then((res) => {
        setcourse(res.data.course);
        setChapters(res.data.chapters);
      })
      .catch((error) => {
        setcourse(null);
        setChapters(null);
      });
    setcourse(props.data?.course);
    setChapters(props.data?.chapters);
  }, [location, props.data?.chapters, props.data?.course]);

  const buyCourseHandle = (e) => {
    e.preventDefault();
    Axios.get("gateway/payment/api", {
      params: { type: "course_payment", courseId: course?.id },
    })
      .then((response) => {
        window.location.replace(response.data.GatewayPageURL);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setDiscountedPrice((course?.price - ((course?.price / 100) * course?.discount).toFixed(2)));
 setDiscountWithTransFee((discountedPrice + (discountedPrice / 100) * 3));
    return () => {
      setDiscountedPrice(null);
      setDiscountWithTransFee(null)
    };

  }, [course?.discount, course?.price, discountedPrice]);

  const buyCourseHandleViaBalance = (e) => {
    e.preventDefault();
    Axios.get("balance/payment/api", {
      params: { courseId: course?.id },
    })
      .then((response) => {
        return (window.location.href =
          "http://localhost:3000/gateway/payment/success");
      })
      .catch((error) => {
        return (window.location.href = `http://localhost:3000/gateway/payment/failed?`);
      });
  };
  return (
    <Container>
      <PageHeader title="Course Overview">
        <div className="d-none d-md-inline d-sm-inline d-lg-inline d-xl-inline">
          <BackButton />
        </div>

        <Link to="/" className="btn btn-primary float-right">
          Buy Now
        </Link>
      </PageHeader>

      {howToMessage === false ? (
        <div className="container-fluid intro-section">
          <div className="row">
            <div className="col-md-12 p-0">
              <div className="card position-relative coursesCard">
                <div className="card-header course-single-header">
                  <div className="course-title">
                    <h6 className="h3">{course?.title}</h6>
                  </div>
                </div>

                <div className="card-body course-meta">
                  <div className="row">
                    <div className="col-md-5">
                      <div
                        className="card position-relative gridCourseCard coursesCard"
                        style={{ height: "inherit" }}
                      >
                        <div
                          style={{ height: "270px" }}
                          className="courseCardTop d-block"
                        >
                          <iframe
                            frameBorder="0"
                            allowFullScreen="1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title="YouTube video player"
                            width="100%"
                            height="270"
                            src="https://www.youtube-nocookie.com/embed/Lsp_pkWYA0M"
                            id="widget2"
                            data-gtm-yt-inspected-1_25="true"
                          ></iframe>
                        </div>
                        <div className="card-header">
                          <Link to={`course/${course?.id}`}>
                            <h6 className="card-title course-grid">
                              {course?.title}
                            </h6>
                          </Link>
                        </div>
                        <div className="card-body courseStatistic text-center  pt-0 pb-0 mt-3 d-flex align-items-center justify-content-around">
                          <div className="courseBadge">
                            <span className="badge badge-primary-light">
                              <i className="fa fa-video-camera"></i>
                            </span>
                            <b className="d-block text-muted mt-2 mb-1">
                              Video Class
                            </b>
                            <h3 className="text-primary">130</h3>
                          </div>
                          <div className="courseBadge">
                            <span className="badge badge-success-light">
                              <i className="fa fa-users text-success"></i>
                            </span>
                            <b className="d-block text-muted mt-2 mb-1">
                              Enrolled Students
                            </b>
                            <h3 className="text-success">1183</h3>
                          </div>
                          <div className="courseBadge">
                            <span className="badge badge-info-light">
                              <i className="fa fa-comments text-info"></i>
                            </span>
                            <b className="d-block text-muted mt-2 mb-1">
                              Class Support
                            </b>
                            <h3 className="text-info">Available</h3>
                          </div>
                        </div>

                        <div className="card-footer coursePriceBox mt-5 d-flex align-items-center justify-content-around">
                          <div className="h5 ml-3 font-weight-normal">
                            <del> &#2547;{Math.floor(course?.price)}</del>{" "}
                            <br />
                            <b className="text-danger">
                              {course?.discount}% OFF!
                            </b>
                          </div>

                          <h3 className="font-weight-bold text-success fs-30">
                            &#2547;
                            {Math.floor(
                              Math.floor(course?.price) -
                                (Math.floor(course?.price) / 100) *
                                  Math.floor(course?.discount)
                            )}
                          </h3>

                          <Link
                            onClick={(e) => setHowToMessage(true)}
                            to="#"
                            className="btn btn-primary p-2"
                          >
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-7">
                      <div className="row">
                        <div className="col-md-12">
                          <h3>Detailed Information</h3>

                          <div className="text-muted pt-3 pb-3">
                            <p>{Reacthtmlparser(course?.overview)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FrontAccordion chapters={chapters} />
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Payment Summary</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="p-5 text-justify">
                      <p>
                        অনলাইন পেমেন্ট করার সময় পেমেন্ট সফল ভাবে গ্রহণ হয়েছে
                        কিনা এই ব্যপারে আপনাকে একটি নোটিশ দেখানো হবে। বিকাশ /
                        ATM CARD বা নগদ যে কোন মাধ্যম ব্যবহার করে আপনি পেমেন্ট
                        করতে পারবেন। অধীকাংশ মানুষ পেমেন্ট সাবমিট বাটনে ক্লিক
                        করার পরে পুনরায় এই ওয়েবসাইটে ফেরত না আসার আগেই ব্রাউজার
                        কেটে দেন বা রিলোড দেন, এতে করে পেমেন্ট কেটে নেওয়া হবে
                        ঠিকই কিন্তু আপনার ক্রয় টি পেন্ডিং হয়ে থাকবে। আপনি যদি
                        সফল ভাবে ঝামেলা ছাড়া পেমেন্ট করতে চান তাহলে নিচে বাটনে
                        ক্লিক করুন।
                      </p>

                      <p>
                        1. প্রথমে আপনার বিকাশ / নগদ / কার্ড ইত্যাদির তথ্য সঠিক
                        ভাবে পূরণ করতে হবে।
                      </p>
                      <p>
                        2. এরপরে আপনার কাছে এস এস এল কমার্স থেকে একটি মেসেজ
                        পাঠানো হবে। ভেরিফিকেশন কোড টি প্রদান করুন
                      </p>
                      <p>
                        3. ভেরিফিকেশন কোড লিখার পরে কোনফার্ম বাটনে ক্লিক করে
                        মিনিমাম ২০-৩০ সেকেন্ড অপেক্ষা করতে হবে।
                      </p>
                      <p>
                        4. আপনার সবকিছু ঠিকঠাক ভাবে সফল হলে আবার এই ওয়েবসাইটে
                        অটোমেটিক রিডাইরেক্ট হয়ে যাবে
                      </p>
                      <p>5. এবং আপনাকে সাকসেস মেসেজ দেখাবে</p>
                      <p>
                        <b className="text-danger">
                          বিঃদ্রঃ আপনি যদি এই পদ্ধতি তে পেমেন্ট না করতে পারেন,
                          আপনার ক্রয় সফল হবেনা। এর জন্য বিলম্ব হতে পারে। কতৃপক্ষ
                          দায়ী থাকবেনা। সুতরাং, সাকসেস মেসেজ না দেখা পর্যন্ত
                          ব্রাউজার ক্লোজ বা রিফ্রেশ না করার অনুরোধ করা হল।
                          ধন্যবাদ
                        </b>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="fs-16 text-muted">Course Price</h6>
                      </div>
                      <div className="balanceAccount">
                        <h6 className="fs-16 text-muted">
                          &#2547;{course?.price}
                        </h6>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="fs-16 text-muted">
                          Discount ({course?.discount}%)
                        </h6>
                      </div>
                      <div className="balanceAccount">
                        <h6 className="fs-16 text-danger">
                          -&#2547;
                          {((course?.price / 100) * course?.discount).toFixed(
                            2
                          )}
                        </h6>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="fs-16 text-muted">Transaction Fee</h6>
                      </div>
                      <div className="balanceAccount">
                        <h6 className="fs-16 text-muted">3%</h6>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="fs-16 text-dark">Payment Total</h6>
                      </div>
                      <div className="balanceAccount">
                        <h6 className="fs-16 text-dark">
                          &#2547;{discountWithTransFee.toFixed(2)}
                        </h6>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="d-block text-center mt-7">
                      <div>
                        <h6 className="fs-16 mt-3 mb-3 text-muted text-uppercase">
                          Current Balance:
                        </h6>
                      </div>
                      <div className="balanceAccount">
                        {discountedPrice > currentUser?.currentBalance ? (
                          <h6 className="fs-20 text-danger">
                            &#2547;{currentUser?.currentBalance}
                          </h6>
                        ) : (
                          <h6 className="fs-20 text-success">
                            &#2547;{currentUser?.currentBalance}
                          </h6>
                        )}
                      </div>
                    </div>

                    <div className="d-block mt-3">
                      {discountedPrice > currentUser?.currentBalance ? (
                        <div>
                          <div
                            className="text-danger"
                            style={{
                              lineHeight: "20px",
                              fontWeight: "bold",
                              background: "#ef4b4b59",
                              padding: "15px",
                              borderRadius: "3px",
                            }}
                          >
                            Your current balance does not cover the price. You
                            can still pay with the &nbsp;
                            <span className="text-dark">
                              direct ONLINE payment method
                            </span>
                            &nbsp; BKASH / ROCKET / ATM CARD etc
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="ssl-verification-logo mt-7">
                      <img src={sslcomlogo} alt="ssl verification logo" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="d-flex align-items-center justify-content-end">
                  {discountedPrice > currentUser?.currentBalance ? (
                    <div>
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="btn disabled btn-primary mr-3"
                      >
                        Pay From Balance
                      </button>
                      <button
                        onClick={(e) => buyCourseHandle(e)}
                        className="btn btn-success mr-3"
                      >
                        Pay Online
                      </button>
                      <button
                        onClick={() => setHowToMessage(false)}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={(e) => buyCourseHandleViaBalance(e)}
                        className="btn btn-primary mr-3"
                      >
                        Pay From Balance
                      </button>
                      <button
                        onClick={(e) => buyCourseHandle(e)}
                        className="btn btn-success mr-3"
                      >
                        Pay Online
                      </button>
                      <button
                        onClick={() => setHowToMessage(false)}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CourseSingle;
