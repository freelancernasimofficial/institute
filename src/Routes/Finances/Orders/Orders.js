import React, { useState, useEffect, useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../../Components/BackButton";
import PageHeader from "../../../Components/Layout/PageHeader";
import DataTable from "../../../Components/DataTable";
import moment from "moment";
import { Grid,Typography, Button, TableCell, TableRow } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { Box } from "@mui/system";
import ordersReducer from "../../../Reducers/OrdersReducer";
import useFetch from '../../../Hooks/useFetch'
import PageLoader from '../../../Components/PageLoader'
const Orders = ({response,refresh}) => {
  const {data,status} = useFetch('/orders')


  let dataCount = 1;



if(status ==="LOADING") return <PageLoader />;
  return data &&(
    <Box component="div" mb={4}>
      <PageHeader title="Orders">
     
      </PageHeader>
      <DataTable
        title={`Your have Ordered ${data.length} Items`}
        headers={["SN", "Product Name", "date", "status", "Action"]}
      >
        {data.map((value, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{dataCount++}</TableCell>
              <TableCell sx={{ fontWeight: "800" }}>
                {value?.Product?.title}
              </TableCell>

              <TableCell className="">
                {moment(value?.createdAt).fromNow()}
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 14,
                    fontWeight: "800",
                  }}
                  color="success.main"
                >
                  {value?.status}
                </Typography>
              </TableCell>
              <TableCell>
                <Link
                  to={`/financial/transactions/details/${value?.Product?.id}`}
                >
                  <Button variant="outlined" color="info">
                    <Visibility />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </DataTable>
    </Box>
  );
};

export default Orders;
