import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import React from "react";

const DataTable = (props) => {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table sx={{ td: { p: 2,fontWeight:'400' } }}>
        <TableHead sx={{ position: "sticky", top: 0}}>
          <TableRow sx={{ textTransform: "uppercase"}}>
            {props.headers.map((header, index) => (
              <TableCell
                sx={{ border: "none", color: "text.white" }}
                key={index}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            bgcolor: "background.paper",
            "tr td": {
              color: "text.secondary",

              borderBottom: "1px solid #ffffff0f",
             
            },
          }}
        >
          {props.children}
        </TableBody>
        {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={5}
            rowsPerPage={3}
            page={1}
            onPageChange={()=>alert('hi')}
            onRowsPerPageChange={()=>alert('hi')}
          /> */}
      </Table>
    </TableContainer>
  );
};

export default DataTable;
