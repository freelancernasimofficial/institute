import React, { useState, useEffect } from "react";
import Container from "../../../components/layout/Container";
import PageHeader from "../../../components/layout/PageHeader";
import BackButton from "../../../components/BackButton";
import ChapterAccordion from "./ChapterAccordion";
import Card from "../../../components/Card";

const LessonOverview = (props) => {
  const [data, setData] = useState(false);
  useEffect(() => {
    setData(props.data);
    return () => {
      setData(false);
    };
  }, [props.data]);


  return (
    data && (
      <Container>
        <PageHeader title="Lessons">
          <BackButton />
        </PageHeader>

        <div className="d-none d-md-block d-lg-block d-xl-block d-sm-none">
          <Card>
            <div className="p-9 bg-primary">
              <h1 className="text-center text-light">{data?.Course?.title}</h1>
            </div>
          </Card>
        </div>
        {data?.Course?.Chapters ? (
          <ChapterAccordion course={data.Course} />
        ) : (
          <h1>No Data available</h1>
        )}
      </Container>
    )
  );

};

export default LessonOverview;
