import { Card, CardContent, CardHeader, Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PageLoader from "../../../Components/PageLoader";
import ProfileCard from "../../../Components/ProfileCard";
import useFetch from "../../../Hooks/useFetch";
const Friends = ({ userId }) => {
  const { data,status,refetch } = useFetch(`/user/${userId}/friends`);
 
 if (status === "LOADING") return <PageLoader />;
  return (
    <React.Fragment>
      <Card 
        elevation={0}
        component={Paper}
      >
        <CardHeader
          sx={{ bgcolor: "transparent",m:1,mb:0 }}
          title="Friends"
          subheader={`${data.count} Friends`}
        />
        <CardContent sx={{ bgcolor: "transparent", }}>
          <Grid container spacing={3}>
            {data.rows?.map((friend, key) => {
              return (
                <Grid key={key} item xs={12} sm={6} md={6} lg={3} xl={3}>
                  {Number(friend.User.id) === Number(userId) ? (
                    <ProfileCard
                      currentProfileId={userId}
                      refetch={refetch}
                      user={friend.RequestBy}
                    />
                  ) : (
                    <ProfileCard
                      currentProfileId={userId}
                      refetch={refetch}
                      user={friend.User}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default React.memo(Friends);
