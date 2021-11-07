import { createTheme } from "@mui/material/styles";


export const DarkColors = {
  mode: "dark",
  background: {
    default: "#18191a",
    paper: "#18191a",
  },
  primary: {
    main: "#303f9f",
    dark: "#002984",
    light: "#757de8",
  },
  secondary: {
    main: "#f44336",
    dark: "#ba000d",
    light: "#ff7961",
  },
};

const DarkTheme = createTheme({
  //font family

  typography: {
    fontFamily: [
      // "Roboto",
      "Poppins",
      "Noto Serif Bengali",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 14,
    htmlFontSize: 14,
    h6: {
      fontSize: ".900rem",
      color: "white",
    },
    subtitle1: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: ".850rem",
      lineHeight: "22px",
    },
    subtitle2: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: ".730rem",
      fontWeight: "400",
    },
    body1: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: ".850rem",
    },
    body2: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: ".875rem",
      lineHeight: "25px",
    },
  },

  //default css for components
  components: {
    MuiCard: {
      styleOverrides: {
        root: {},
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "15px",
        },
        title: {
          color: "#fff",
          fontSize: ".950rem",
          fontWeight: 500,
          a: { "&:hover": { textDecoration: "underline" } },
        },
        subheader: {
          color: "#ffffffff1a",
          fontSize: ".8375rem",
          fontFamily: "Poppins",
          a: { "&:hover": { textDecoration: "underline" } },
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          svg: {
            fontsize: "24px !important",
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "15px",
          flexWrap: "wrap",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:before": {
            borderBottomColor: "rgb(255 255 255 / 7%)",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid",
          borderBottomColor: "rgb(255 255 255 / 7%)",
        },
        MuiButtonBase: {
          background: "white",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          tr: {
            th: {
              fontWeight: "600",
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: ".875rem",
          color: "#ffffff",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "500",
          color: "#fff",
          fontSize: ".750rem",
          margin: "5px",
          padding: "5px 10px",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontWeight: "500",
          color: "#fff",
          fontSize: ".750rem",
          margin: "5px",
          padding: "7px 10px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          padding: "inherit",
          minWidth: "inherit",
          maxWidth: "inherit",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          background: "transparent",
          fontSize: 15,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: "2px solid white",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          width: 40,
          minWidth: "inherit",
        },
      },
    },
    MuiCollapse: {
      styleOverrides: {
        root: {
          svg: { fontSize: "20px" },
        },
      },
    },
  },

  palette: {
    mode: "dark",
    background: {
      default: "#18191a",
      paper: "#18191a",
    },
    primary: {
      main: "#303f9f",
      dark: "#002984",
      light: "#757de8",
    },
    secondary: {
      main: "#f44336",
      dark: "#ba000d",
      light: "#ff7961",
    },
  },
});

export default DarkTheme;
