import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from "@material-ui/core/FormControl";
import Spacing from "../Spacing/Spacing";
import ReactChipInput from "../AutoChip/ReactChipSelect";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: "#9ee",
    wrap: "nowrap"
  },
  elementPadding: {
    padding: "15px",
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 10
  },
  container: {
    display: "flex",

    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    marginLeft: 10
  },
  button: {
    margin: theme.spacing.unit * 4
  }
});
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DialogFacultyTable extends React.Component {
  subcategoryNames = [];
  handleClickOpen = faculty => {
    this.setState({ open: true });
    this.setState({ ...faculty });
    this.subcategoryNames = this.props.subcategories.map(subcategory => {
      return subcategory.name;
    });
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleValueChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleDeleteClickOpen = () => {
    // this.setState({ open: false });
    this.setState({ delopen: true });
  };

  handleDeleteClose = () => {
    this.setState({ delopen: false });
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      open: false,
      name: "",
      username: "",
      _id: "",
      email: "",
      phoneNumber: "",
      category: "",
      subcategories: [],
      isInCharge: false,
      inChargeSubcategories: [],
      department: {
        name: "",
        _id: ""
      }
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.delopen}
          onClose={this.handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action once done cannot be undone. Please continue with
              caution.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteClose} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Faculty Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <GridContainer>
                <GridItem
                  xs={6}
                  sm={6}
                  md={6}
                  className={classes.elementPadding}
                >
                  Edit below to update/modify an individual faculty data.
                </GridItem>
                <GridItem
                  xs={2}
                  sm={2}
                  md={2}
                  className={classes.elementPadding}
                >
                  <Typography>Questions Submitted</Typography>
                  <Typography>
                    <h4>
                      <strong>{this.state.email}</strong>
                    </h4>
                  </Typography>
                </GridItem>
                <GridItem
                  xs={2}
                  sm={4}
                  md={4}
                  className={classes.elementPadding}
                >
                  <Button
                    onClick={this.handleDeleteClickOpen}
                    fullWidth
                    color="primary"
                  >
                    Delete Faculty
                  </Button>
                </GridItem>
              </GridContainer>
            </DialogContentText>
            <div className={classes.root}>
              <Spacing />
              <Typography>
                {" "}
                <strong>Basic Info</strong>
              </Typography>
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={4}
                  md={4}
                  className={classes.elementPadding}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    name="name"
                    type="name"
                    onChange={this.handleValueChange}
                    value={this.state.name}
                    fullWidth
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={4}
                  md={4}
                  className={classes.elementPadding}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    name="username"
                    onChange={this.handleValueChange}
                    label="Username"
                    type="name"
                    value={this.state.username}
                    fullWidth
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={4}
                  md={4}
                  className={classes.elementPadding}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    onChange={this.handleValueChange}
                    name="email"
                    label="Email Address"
                    type="email"
                    value={this.state.email}
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6} className={classes.formControl}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="age-simple">Department</InputLabel>
                    <Select
                      onChange={this.handleValueChange}
                      value={this.state.department.name}
                      renderValue={department => {
                        return department;
                      }}
                      inputProps={{
                        name: "department",
                        id: "department"
                      }}
                      fullWidth
                    >
                      {this.props.departments.map(department => {
                        return (
                          <MenuItem key={department._id} value={department}>
                            {department.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={6}
                  md={6}
                  className={classes.elementPadding}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    onChange={this.handleValueChange}
                    id="phoneNumber"
                    label="Phone Number"
                    type="phone"
                    name="phoneNumber"
                    fullWidth
                    value={this.state.phoneNumber}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.elementPadding}
                >
                  <ReactChipInput
                    style={{ zIndex: 0 }}
                    data={this.props.subcategories}
                    getSelectedObjects={this.getSelectedSubcategories}
                    clearChips={this.state.clearSubcategoryChips}
                    onChipsCleared={this.chipsCleared}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogFacultyTable.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  subcategories: PropTypes.array.isRequired,
  departments: PropTypes.array.isRequired
};

export default withStyles(styles)(DialogFacultyTable);
