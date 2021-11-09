import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import {
  Alert,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import {
  DONT_HAVE_ACCOUNT,
  LOGIN,
  REGISTER_HERE,
} from "../../Translations/Language";
import { UserContext } from "../../Contexts/AuthContext";

const Login = (props) => {
  const [phoneOrEmail, setphoneorEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const {currentUser} = useContext(UserContext)

  useEffect(() => {
    
      if (currentUser?.auth === true) {
   window.location.href="/"
      }
    
  
  }, [currentUser?.auth]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (phoneOrEmail.trim() !== "" || password.trim() !== "") {
      setLoading(true);
      setTimeout(() => {
        Axios.post("/login", {
          phoneOrEmail: phoneOrEmail,
          password: password,
        })
          .then((res) => {
            console.log(res);
            setLoading(false);
            setSuccess(true);

            setAlert(
              <Alert
                sx={{ mb: 2 }}
                severity="success"
                variant="filled"
                onClose={() => setAlert(false)}
              >
                Login Successful!
              </Alert>
            );
            setTimeout(() => {
            window.location.href = "/";
            }, 1000);
          })
          .catch((error) => {
            setLoading(false);
            setSuccess(false);
            setAlert(
              <Alert
                sx={{ mb: 2 }}
                severity="warning"
                variant="filled"
                onClose={() => setAlert(false)}
              >
                {error?.response?.data?.message}
              </Alert>
            );
          });
      }, 1000);
    }
  };

  return (
    <Container
      maxWidth="xs"
      elevation={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        pb: 4,
        pt: 4,
      }}
    >
      <Paper elevation={1} sx={{ p: 4 }}>
        <Paper sx={{ p: 2, textAlign: "center", mb: 4 }} elevation={0}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {LOGIN}
          </Typography>
        </Paper>

        <form method="post" action="#" onSubmit={(e) => handleLoginSubmit(e)}>
          <TextField
            onChange={(e) => setphoneorEmail(e.target.value)}
            fullWidth
            sx={{
              label: { fontSize: "1.25rem" },
              mb: 4,
            }}
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            autoFocus
            placeholder="Email or Phone"
            variant="standard"
          />
          <TextField
            sx={{
              label: { color: "text.secondary", fontSize: "1.25rem" },
              mb: 4,
            }}
            type="password"
            fullWidth
            placeholder="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            variant="standard"
            onChange={(e) => setpassword(e.target.value)}
          />

          {alert}

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
              "LOGIN"
            )}
          </Button>
          <Typography
            sx={{ mb: 1, a: { color: "primary.light" } }}
            variant="body2"
          >
            {DONT_HAVE_ACCOUNT} <Link to="/register">{REGISTER_HERE}</Link>
          </Typography>

          <Typography sx={{ a: { color: "primary.light" } }} variant="body2">
            Forgot password? <Link to="/register">Reset Here</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
