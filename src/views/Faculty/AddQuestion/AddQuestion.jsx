import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "../QuestionManage/QuizForm";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

const styles = theme => ({
  formroot: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    display: "flex",
    flexGrow: 1
  },
  root: {
    display: "flex",
    flexWrap: "nowrap",
    autoWidth: true
  },
  date_root: {
    marginTop: theme.spacing.unit * 2,
    display: "flex",
    flexWrap: "nowrap",
    autoWidth: true
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    minWidth: 120,
    display: "flex",
    flexGrow: 1,
    margin: 0,
    fullWidth: true,
    wrap: 'nowrap'
  },
  button: {
    margin: theme.spacing.unit * 4
  }
});

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form autoComplete="off" autoWidth={true}>
          <Typography>
            <strong>Enter Question Below:</strong>
          </Typography>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} className={classes.container}>
              <TextField
                placeholder="Type in your question here"
                multiline={true}
                rows={2}
                label="Question"
                rowsMax={10}
                type="input"
                margin="normal"
                fullWidth
              />
            </GridItem>
          </GridContainer>
          <Typography>
            <strong>Options: </strong>
          </Typography>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} className={classes.container}>
              <TextField
                id="option1"
                label="Option 1"
                multiline={true}
                type="number"
                placeholder="Type in your option 1 here"
                margin="normal"
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.container}>
              <TextField
                id="option2"
                label="Option 2"
                multiline={true}
                type="number"
                placeholder="Type in your option 2 here"
                margin="normal"
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.container}>
              <TextField
                id="option3"
                label="Option 3"
                multiline={true}
                type="number"
                placeholder="Type in your option 3 here"
                margin="normal"
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.container}>
              <TextField
                id="option4"
                label="Option 4"
                multiline={true}
                type="number"
                placeholder="Type in your option 4 here"
                margin="normal"
                fullWidth
              />
            </GridItem>
          </GridContainer>
          <Typography>
            <strong>Other Info</strong>
          </Typography>
          <GridContainer>
            <GridItem xs={12} sm={3} md={3}>
              <FormControl className={classes.formControl} >
                <InputLabel fullWidth>
                  Correct Option
                </InputLabel>
                <Select
                  inputProps={{
                    name: "age",
                    id: "age-simple"
                  }}
                  fullWidth
                  autoWidth={true}
                >
                  <MenuItem value={10}>Option 1</MenuItem>
                  <MenuItem value={20}>Option 2</MenuItem>
                  <MenuItem value={30}>Option 3</MenuItem>
                  <MenuItem value={30}>Option 4</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple" fullWidth>
                  Category
                </InputLabel>
                <Select
                  inputProps={{
                    name: "age",
                    id: "age-simple"
                  }}
                  fullWidth
                  autoWidth={true}
                >
                  <MenuItem value="">
                    <em>All Category</em>
                  </MenuItem>
                  <MenuItem value={10}>Category 1</MenuItem>
                  <MenuItem value={20}>Category 2</MenuItem>
                  <MenuItem value={30}>Category 3</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple" fullWidth>
                  Sub Category
                </InputLabel>
                <Select
                  inputProps={{
                    name: "age",
                    id: "age-simple"
                  }}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>All Category</em>
                  </MenuItem>
                  <MenuItem value={10}>Category 1</MenuItem>
                  <MenuItem value={20}>Category 2</MenuItem>
                  <MenuItem value={30}>Category 3</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={2} md={2}>
              <TextField
                id="standard-number"
                label="No. Of Quest."
                type="number"
                fullWidth
                margin="normal"
              />
            </GridItem>
            <GridItem xs={12} sm={2} md={2}>
              <TextField
                id="standard-number"
                label="Time Limit (min)"
                type="number"
                fullWidth
                margin="normal"
              />
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);