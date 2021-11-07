import React, { useState } from "react";
import { useEffect } from "react";
import LoadModal from "../../components/layout/LoadModal";

const ChapterAccordion = (props) => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState(false);
  const [showModalVideo, setShowModalVideo] = useState(false);
  const [chapterVideoUrl, setChapterVideoUrl] = useState("");

  useEffect(() => {
    setData(props.course);
    return () => {
      setData(false);
    };
  }, [props.course]);

  return data && (
    <div className="row p-0 m-0">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Chapters ({data.Chapters.length})</h3>
          </div>
          <div className="card-body">
            <ul className="demo-accordion accordionjs m-0">
              {data.Chapters.length === 0 && <h5>No Lessons Available Yet</h5>}
              {data &&
                data.Chapters.map((value, index) => {
                  return (
                    <li 
                      key={index}
                      className={`acc_section ${
                        active === index ? "acc_active" : ""
                      }`}
                    >
                      <div
                        className="acc_head"
                        onClick={() => setActive(index || 0)}
                      >
                        <h3>
                          {value.name}
                          <span
                            style={{ marginTop: "1px" }}
                            className="badge p-0 bg-default fs-13 font-weight-bold side-badge float-right"
                          >
                            {value.Videos.length}
                          </span>
                        </h3>
                      </div>
                      <div
                        className={`acc_content ${
                          active === index ? "d-block" : "d-none"
                        }`}
                      >
                        <p>{value.description}</p>
                        <div
                          className={`acc_videoList ${
                            active === index
                              ? "animated fadeIn slower"
                              : "animated fadeOut slower"
                          }`}
                        >
                          <ul className="list-group">
                            {value.Videos ? (
                              value.Videos.map((vdo, indx) => {
                                return (
                                  <li
                                    onClick={(e) => {
                                      setShowModalVideo(true);
                                      setChapterVideoUrl(vdo.iframeUrl);
                                    }}
                                    style={{ cursor: "pointer" }}
                                    key={indx}
                                    className="list-group-item "
                                  >
                                    <i
                                      className="fa fa-play"
                                      aria-hidden="true"
                                    ></i>
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <span className="text-muted">
                                      {vdo.videoTitle}
                                    </span>
                                  </li>
                                );
                              })
                            ) : (
                              <h1>No Lesson Available</h1>
                            )}
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <LoadModal
          onCancel={() => {
            setShowModalVideo(false);
          }}
          showModal={showModalVideo}
          header={false}
          footer={false}
        >
          <iframe
            title="Chapter Iframe video"
            width="100%"
            height="300px"
            frameBorder={0}
            src={chapterVideoUrl}
          ></iframe>
        </LoadModal>
      </div>
    </div>
  );
};

export default ChapterAccordion;
