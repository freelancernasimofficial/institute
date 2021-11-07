import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../../Components/BackButton";
import PageHeader from "../../../Components/Layout/PageHeader";
import DataTable from "../../../Components/DataTable";
import moment from "moment";
import { Grid,TableRow,TableCell,Button,Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import useFetch from "../../../Hooks/useFetch";
import PageLoader from "../../../Components/PageLoader";
const Transactions = ({ response, refresh }) => {
  const { data, status } = useFetch("/financial/transactions");

  
if(status==="LOADING") return <PageLoader/>
  let dataCount = 1;
  return (
    <>
      <PageHeader title="Transaction History">
        <Grid justifyContent="end" container spacing={2}>
          <Grid item>
            <BackButton />
          </Grid>
        </Grid>
      </PageHeader>
      <DataTable
        title={`Your have made ${data?.length} Transactions`}
        headers={[
          "Trans ID",
          "Order ID",
          "Type",
          "Amount",
          "Description",
          "Date",
          "Action",
        ]}
      >
        {data &&
          data?.map((value, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{value.transId}</TableCell>
                <TableCell>{value.orderId}</TableCell>
                <TableCell>{value.via}</TableCell>

                {value.type === "debit" ? (
                  <TableCell>-&#2547;{value.amount}</TableCell>
                ) : (
                  <TableCell sx={{ color: "success.main", fontWeight: "800" }}>
                    <Typography variant="span" sx={{ color: "success.main" }}>
                      +&#2547;{value.amount}
                    </Typography>
                  </TableCell>
                )}
                <TableCell>{value.description}</TableCell>
                <TableCell>{moment(value.createdAt).fromNow()}</TableCell>
                <TableCell>
                  <Link to="#">
                    <Button variant="outlined" color="info">
                      <Visibility sx={{ color: "text.primary" }} />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
      </DataTable>
    </>
  );
};

export default Transactions;
