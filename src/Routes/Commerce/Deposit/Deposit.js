import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../../Components/BackButton";
import {
  Card,
  Button,
  Grid,
  Typography,
  CardContent,
  CardActions,
  TextField,
  Alert,
  CardHeader,
} from "@mui/material";
import PageHeader from "../../../Components/Layout/PageHeader";
import sslcomlogo from "../../../Assets/icons/sslcommerze.png";
import { Box } from "@mui/system";
import { PaymentOutlined } from "@mui/icons-material";

const Deposit = (props) => {
  const [amount, setAmount] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [finalAmount, setFinalAmount] = useState(0.0);

  useEffect(() => {
    setFinalAmount(amount - (amount / 100) * 5);
  }, [amount]);
  const handleDeposit = (e) => {
    e.preventDefault();

    if (
      amount !== undefined &&
      amount > 999 &&
      amount !== "" &&
      amount !== null
    ) {
      axios
        .get("/checkout/ssl", {
          params: { type: "deposit", amount: amount },
        })
        .then((response) => {
          window.location.replace(response.data.GatewayPageURL);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (Number(amount) < 999) {
      setAlertMsg("The minimum deposit amount is 1000 BDT");
    } else if (Number(amount) > 999) {
      setAlertMsg("");
    }
  };

  const changeAmount = (e) => {
    setAmount(e.target.value);
    if (Number(amount) > 999) {
      setAlertMsg(false);
    }
  };

  return (
    <>
      <PageHeader title="Balance Deposit">
        <Box
          sx={{
            mt: 1,
            display: "flex",
            align: "center",
            justifyContent: "flex-end",
          }}
        >
          <BackButton />
        </Box>
      </PageHeader>

      <Grid container mt={1} mb={3} spacing={4}>
        <Grid sx={{ position: "relative" }} xs={12} item md={6}>
          <Card>
            <CardHeader title="Calculation" />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "space-between",

                  minHeight: "100%",
                  p: 3,
                  borderRadius: "4px",
                }}
              >
                <Box sx={{ mb: 3, display: "flex", alignItems: "flex-end" }}>
                  <PaymentOutlined
                    sx={{
                      width: 30,
                      height: 30,
                      color: "text.primary",
                      mr: 1,
                      my: 0.5,
                    }}
                  />
                  <TextField
                    sx={{ ml: 2, label: { fontSize: "20px" } }}
                    onChange={(e) => changeAmount(e)}
                    id="input-with-sx"
                    label="Enter Amount"
                    variant="standard"
                    color="primary"
                    value={amount}
                    fullWidth
                    focused
                    type="number"
                  />
                </Box>

                {alertMsg && (
                  <Alert sx={{ mb: 3 }} variant="outlined" severity="warning">
                    {alertMsg}
                  </Alert>
                )}
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <Typography
                      sx={{ fontSize: 16, mb: 4, p: 0 }}
                      color="text.secondary"
                      variant="h6"
                    >
                      Deposit Fee
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      sx={{ fontSize: 16 }}
                      align="right"
                      color="text.secondary"
                      variant="h6"
                    >
                      5%
                    </Typography>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    borderRadius: "3px",
                    color: "text.primary",
                    bgcolor: "primary.main",
                    width: "40%",
                    height: 100,
                    overflow: "hidden",
                    m: "auto",
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">You will get</Typography>
                  <Typography variant="h6">
                    &#2547;{finalAmount.toFixed(2)} BDT
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flexDirection: "column",
                    mt: "auto",
                    p: 0,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                ></Box>
              </Box>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <img
                  style={{
                    border: "1px solid white",
                    borderRadius: "3px",
                  }}
                  src={sslcomlogo}
                  width="100%"
                  alt="ssl verification logo"
                />
              </Box>
            </CardContent>

            <CardActions>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    sx={{ mr: 2, color: "text.primary" }}
                    color="primary"
                    onClick={(e) => handleDeposit(e)}
                    variant="contained"
                  >
                    Deposit
                  </Button>
                  <Link to="/dashboard">
                    <Button
                      sx={{ color: "text.primary" }}
                      color="secondary"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Link>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          sx={{ lineHeight: "30px", color: "text.primary" }}
          xs={12}
          item
          md={6}
        >
          <Card>
            <CardHeader title=" পেমেন্টের নিয়ম!" />
            <CardContent>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontFamily: "'Noto Serif Bengali',sans-serif",
                  color: "text.secondary",
                }}
                variant="p"
                component="p"
              >
                অনলাইন পেমেন্ট করার সময় পেমেন্ট সফল ভাবে গ্রহণ হয়েছে কিনা এই
                ব্যপারে আপনাকে একটি নোটিশ দেখানো হবে। বিকাশ / ATM CARD বা নগদ যে
                কোন মাধ্যম ব্যবহার করে আপনি পেমেন্ট করতে পারবেন। অধীকাংশ মানুষ
                পেমেন্ট সাবমিট বাটনে ক্লিক করার পরে পুনরায় এই ওয়েবসাইটে ফেরত না
                আসার আগেই ব্রাউজার কেটে দেন বা রিলোড দেন, এতে করে পেমেন্ট কেটে
                নেওয়া হবে ঠিকই কিন্তু আপনার ক্রয় টি পেন্ডিং হয়ে থাকবে। আপনি যদি
                সফল ভাবে ঝামেলা ছাড়া পেমেন্ট করতে চান তাহলে নিচে বাটনে ক্লিক
                করুন।
              </Typography>

              <Typography
                sx={{
                  fontWeight: "500",
                  fontFamily: "'Noto Serif Bengali',sans-serif",
                  color: "text.secondary",
                }}
                variant="p"
                component="p"
              >
                1. প্রথমে আপনার বিকাশ / নগদ / কার্ড ইত্যাদির তথ্য সঠিক ভাবে পূরণ
                করতে হবে।
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontFamily: "'Noto Serif Bengali',sans-serif",
                  color: "text.secondary",
                }}
                variant="p"
                component="p"
              >
                2. এরপরে আপনার কাছে এস এস এল কমার্স থেকে একটি মেসেজ পাঠানো হবে।
                ভেরিফিকেশন কোড টি প্রদান করুন
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontFamily: "'Noto Serif Bengali',sans-serif",
                  color: "text.secondary",
                }}
                variant="p"
                component="p"
              >
                3. ভেরিফিকেশন কোড লিখার পরে কোনফার্ম বাটনে ক্লিক করে মিনিমাম
                ২০-৩০ সেকেন্ড অপেক্ষা করতে হবে।
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontFamily: "'Noto Serif Bengali',sans-serif",
                  color: "text.secondary",
                }}
                variant="p"
                component="p"
              >
                4. আপনার সবকিছু ঠিকঠাক ভাবে সফল হলে আবার এই ওয়েবসাইটে অটোমেটিক
                রিডাইরেক্ট হয়ে যাবে
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontFamily: "'Noto Serif Bengali',sans-serif",
                  color: "text.secondary",
                }}
                variant="p"
                component="p"
              >
                5. এবং আপনাকে সাকসেস মেসেজ দেখাবে
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontFamily: "'Noto Serif Bengali',sans-serif",
                  color: "text.warning",
                  mt: 3,
                  fontSize: "18px",
                }}
                variant="p"
                component="p"
              >
                বিঃদ্রঃ আপনি যদি এই পদ্ধতি তে পেমেন্ট না করতে পারেন, আপনার ক্রয়
                সফল হবেনা। এর জন্য বিলম্ব হতে পারে। কতৃপক্ষ দায়ী থাকবেনা।
                সুতরাং, সাকসেস মেসেজ না দেখা পর্যন্ত ব্রাউজার ক্লোজ বা রিফ্রেশ
                না করার অনুরোধ করা হল। ধন্যবাদ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Deposit;
