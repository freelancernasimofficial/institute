import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Lock, PlayArrow, PlayCircle, PlaylistPlay } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
} from "@mui/material";
import { useSnackbar } from "notistack";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<PlaylistPlay sx={{ fontSize: "2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "transparent",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function LessonCard({ chapters }) {
  const [expanded, setExpanded] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({});
  const { enqueueSnackbar } = useSnackbar();


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      {chapters?.map((chapter, key) => {
        return (
          <React.Fragment key={key}>
            <Accordion elevation={1}
              sx={{ bgcolor: "background.paper",}}
              key={key}
              expanded={expanded === `panel${key}`}
              onChange={handleChange(`panel${key}`)}
            >
              <AccordionSummary
                sx={{ marginBottom: "0 !important" }}
                aria-controls={`panel${key}d-content`}
                id={`panel${key}d-header`}
              >
                <Box sx={{ p: 0, m: 0 }}>
                  <Typography component="div" variant="h6">
                    {chapter.name}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {chapter.description}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{p:0,borderRadius: 0 }}>
                <Box
                  component={Paper}
                  elevation={0}
                  sx={{
                    bgcolor: "background.default",

                    pt: 0,
                    pb: 0,
                    borderRadius: 0,
                    m: 0,
                  }}
                >
                  <List sx={{ m: 0, p: 0 }}>
                    {chapter?.Videos.map((video, videoKey) => {
                     return key <= 0 ? (
                       <ListItemButton
                         onClick={() => setModalContent(video) + setModal(true)}
                         key={videoKey}
                         sx={{ pl: 3, pr: 3 }}
                       >
                         <ListItemIcon>
                           <PlayCircle />
                         </ListItemIcon>
                         <ListItemText primary={video?.videoTitle} />
                       </ListItemButton>
                     ) : (
                       <ListItemButton
                         onClick={() => enqueueSnackbar('Please buy the course first!',{variant:'warning'})}
                         key={videoKey}
                         sx={{ pl: 2, pr: 2 }}
                       >
                         <ListItemIcon>
                           <Lock />
                         </ListItemIcon>
                         <ListItemText primary={video?.videoTitle} />
                       </ListItemButton>
                     );
                    })}
                  </List>
                </Box>
              </AccordionDetails>
            </Accordion>
        
          </React.Fragment>
        );
      })}
      {modal && (
        <Modal
          open={true}
          onClose={() => setModal(false)}
          onBackdropClick={() => setModal(false) + setModalContent({})}
        >
          <Box
            sx={{
              boxShadow: "none",
              borderRadius: 1,
              position: "absolute",
              margin: 0,
              padding: 0,
              minWidth: "50%",
              left: "50%",
              top: "50%",
              border: "3px solid white",
              transform: "translateX(-50%) translateY(-50%)",
            }}
          >
            <iframe
              style={{ width: "100%", height: 350 }}
              frameBorder="0"
              title={modalContent.videoTitle}
              src={modalContent.iframeUrl}
            ></iframe>
          </Box>
        </Modal>
      )}
    </React.Fragment>
  );
}
