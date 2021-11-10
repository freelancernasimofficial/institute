import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import {
  Alert,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  CallOutlined,
  Lock,
  MailOutlined,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [incomingOtp, setIncomingOtp] = useState(false);
  const [registerComplete, setRegisterComplete] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      phone.trim() !== "" &&
      password.trim() !== "" &&
      email.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim()
    ) {
      setLoading(true);
      setTimeout(() => {
        Axios.post("/register", {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          password: password,
        })
          .then((result) => {
            setLoading(false);
            setSuccess(true);
            setFirstName(result.data.firstName);
            setLastName(result.data.lastName);
            setEmail(result.data.email);
            setPhone(result.data.phone);
            setpassword(result.data.password);
            setIncomingOtp(result.data.otp);
            setAlert(
              <Alert
                sx={{ mb: 2 }}
                variant="filled"
                severity="success"
                onClose={() => setAlert(false)}
              >
                {result.data.message}
              </Alert>
            );
            setTimeout(() => {
              setSuccess(false);
              setShowOTPForm(true);
            }, 1000);
          })
          .catch((error) => {
            setLoading(false);
            setSuccess(false);
            setAlert(
              <Alert
                sx={{ mb: 2 }}
                severity="warning"
                onClose={() => setAlert(false)}
              >
                {error?.response?.data?.message}
              </Alert>
            );
          });
      }, 1000);
    }
  };

  const handleOtpVerifySubmit = (e) => {
    e.preventDefault();

    if (otp !== "") {
      if (Number(otp) === Number(incomingOtp)) {
        setLoading(true);

        setTimeout(() => {
          Axios.post("/verifyotp", {
            firstName,
            lastName,
            email,
            phone,
            password,
          })
            .then((result) => {
              setLoading(false);
              setRegisterComplete(true);
              setAlert(
                <Alert
                  onClose={() => setAlert(false)}
                  sx={{ mb: 2 }}
                  severity="success"
                  variant="filled"
                >
                  {result?.data?.message}
                </Alert>
              );
              setSuccess(true);

              setTimeout(() => {
                window.location.href = "/login";
              }, 3000);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
              setSuccess(false);
              setAlert(
                <Alert
                  onClose={() => setAlert(false)}
                  sx={{ mb: 2 }}
                  severity="warning"
                  variant="filled"
                >
                  {error?.response?.data?.message}
                </Alert>
              );
            });
        }, 1000);
      } else {
        setAlert(
          <Alert
            onClose={() => setAlert(false)}
            sx={{ mb: 2 }}
            severity="warning"
            variant="filled"
          >
            Wrong otp code!
          </Alert>
        );
      }
    }
  };

  return showOTPForm === false ? (
    <Container
      maxWidth="sm"
      elevation={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "100",
        pb: 4,
        pt: 4,
      }}
    >
      <Paper elevation={1} sx={{ p: 4 }}>
        <Paper sx={{ p: 2, textAlign: "center", mb:2 }} elevation={0}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
           Register Account
          </Typography>
        </Paper>

        <form
          style={{ width: "100%" }}
          method="post"
          action="#"
          onSubmit={(e) => handleRegisterSubmit(e)}
        >
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} item>
              <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                sx={{
                  label: { fontSize: "1.25rem", color: "text.primary" },
                  mb:2,

                  "input::placeholder": { fontSize: ".9rem" },
                }}
                type="text"
                placeholder="First Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: "text.primary" }} />
                    </InputAdornment>
                  ),
                }}
                autoFocus
                variant="standard"
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                sx={{
                  label: { color: "text.primary", fontSize: "1.25rem" },
                  mb:2,

                  "input::placeholder": { fontSize: ".9rem" },
                }}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: "text.primary" }} />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>

            <Grid xs={12} sm={6} item>
              <TextField
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                sx={{
                  label: { color: "text.primary", fontSize: "1.25rem" },
                  mb:2,

                  "input::placeholder": { fontSize: ".9rem" },
                }}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CallOutlined sx={{ color: "text.primary" }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Phone (11 Digits)"
                variant="standard"
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{
                  label: { color: "text.primary", fontSize: "1.25rem" },
                  mb:2,

                  "input::placeholder": { fontSize: ".9rem" },
                }}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlined sx={{ color: "text.primary" }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Email"
                variant="standard"
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                placeholder="Password"
                value={password}
                sx={{
                  label: { color: "text.primary", fontSize: "1.25rem" },
                  mb:2,
                  "input::placeholder": { fontSize: ".9rem" },
                }}
                type="password"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "text.primary" }} />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                onChange={(e) => setpassword(e.target.value)}
              />
            </Grid>

            {alert && (
              <Grid xs={12} md={12} item>
                {alert}
              </Grid>
            )}

            <Grid item xs={12} md={12}>
              <Button
                sx={{
                  p: 1.5,
                  mb: 3,
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    opacity: 0.9,
                  },
                }}
                elevation={2}
                variant="contained"
                fullWidth
                type="submit"
              >
                {loading ? (
                  <CircularProgress sx={{ color: "text.primary" }} size={25} />
                ) : success ? (
                  <CheckIcon />
                ) : (
                  "Register"
                )}
              </Button>
            </Grid>
          </Grid>
          <Typography
            sx={{ mb: 1, a: { color: "primary.light" } }}
            variant="body2"
          >
            Already have an account? <Link to="/login">Login Here</Link>
          </Typography>

          <Typography sx={{ a: { color: "primary.light" } }} variant="body2">
            Forgot password? <Link to="/register">Reset Here</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  ) : (
    <Container
      maxWidth="xs"
      elevation={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "100",
        pb: 4,
        pt: 4,
      }}
    >
      <Paper elevation={1} sx={{ p: 4 }}>
        <Paper sx={{ p: 2, textAlign: "center", mb: 2 }} elevation={0}>
          <Typography
            variant="h6"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            OTP VERIFICATION
          </Typography>
        </Paper>

        {alert}

        <form
          style={{ width: "100%" }}
          method="post"
          action="#"
          onSubmit={(e) => handleOtpVerifySubmit(e)}
        >
          <Grid container spacing={2}>
            {registerComplete === false && (
              <Grid xs={12} sm={12} item>
                <TextField
                  value={otp}
                  onChange={(e) => setOtp(parseInt(e.target.value.trim()))}
                  fullWidth
                  sx={{
                    label: { color: "text.primary", fontSize: "1.25rem" },
                    mb:2,

                    "input::placeholder": { fontSize: ".9rem" },
                  }}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidOutlined sx={{ color: "text.primary" }} />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Verification Code"
                  variant="standard"
                />
              </Grid>
            )}

            <Grid item xs={12} md={12}>
              {registerComplete === false ? (
                <Button
                  sx={{
                    p: 1.5,
                    mb: 3,
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      opacity: 0.9,
                    },
                  }}
                  elevation={2}
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress
                      sx={{ color: "text.primary" }}
                      size={25}
                    />
                  ) : success ? (
                    <CheckIcon />
                  ) : (
                    "Verify"
                  )}
                </Button>
              ) : (
                <Link to="/login">
                  <Button
                    sx={{
                      p: 1.5,
                      mb: 3,
                      bgcolor: "primary.main",
                      "&:hover": {
                        bgcolor: "primary.dark",
                        opacity: 0.9,
                      },
                    }}
                    elevation={2}
                    variant="contained"
                    fullWidth
                  >
                    GO TO LOGIN PAGE
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>
          <Typography
            sx={{ mb: 1, a: { color: "primary.light" } }}
            variant="body2"
          >
            Already have an account? <Link to="/login">Login Here</Link>
          </Typography>

          <Typography sx={{ a: { color: "primary.light" } }} variant="body2">
            Forgot password? <Link to="/register">Reset Here</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
