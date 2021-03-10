import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Slider from "../image/slider.jpg";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "../logo.svg";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";
import EnquiryForm from "../component/enquiryform";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,

    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(1),
      width: "100px",
    },
  },
  call: {
    flexGrow: 1,
    color: "#fafafa",
    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(1),
      width: "100px",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
    [theme.breakpoints.up("xs")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  image: {
    height: "100px",
    width: "150px",
    marginLeft: theme.spacing(0),
    marginTop: theme.spacing(5),
  },
  enquiryfrom: {
    padding: theme.spacing(1),
  },
  logo: {
    height: "100px",
    [theme.breakpoints.up("xs")]: {
      marginRight: theme.spacing(10),
      width: "150px",
      height: "100px",
    },
  },
  slider: {
    background: `url(${Slider})`,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            className={classes.title}
            variant="h2"
            noWrap
            style={{ cursor: "pointer" }}
          >
            <Link to="Homepage">
              <img src={logo} className={classes.logo} alt="logo" />
            </Link>
          </Typography>
          <Typography className={classes.call}>
            <a href="tel:1234567890">
              <AddIcCallIcon />
              12345678
            </a>
          </Typography>

          <div className={classes.searchenquiry}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.enquiryfrom}>
              <EnquiryForm />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        <div className={classes.slider} onClick={handleDrawerClose}>
          <div className={classes.drawerHeader}>
            <div className={classes.image}>
              <Link to="Homepage">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {[
              "About Us",
              "Popular Course",
              "Student Services",
            ].map((text, index) => (
              <ListItem button key={index}>
                <Link to={text}>
                  <ListItemText primary={text} />
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[
              "Migration Services",
              "Events",
              "Blog",
              "Student Testimonials",
              "FAQs",
              "Admin",
            ].map((text, index) => (
              <ListItem button key={index}>
                <Link to={text}>
                  <ListItemText primary={text} />
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      ></main>
    </div>
  );
}
