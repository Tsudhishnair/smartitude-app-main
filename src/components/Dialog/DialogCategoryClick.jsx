import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Spacing from "../Spacing/Spacing";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Typography from "./DialogFacultyTable";
import { Category } from "@material-ui/icons";

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

class DialogCategoryClick extends React.Component {
  state = {
    open: false
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleDialogOpen = () => {
    this.setState({ open: true });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, title, content, positiveAction, negativeAction, action } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">Category</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              {negativeAction ? negativeAction : "CANCEL"}
            </Button>
            <Button onClick={action} color="primary" autoFocus>
              {positiveAction ? positiveAction : "OK"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogCategoryClick.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  positiveAction: PropTypes.string,
  negativeAction: PropTypes.string,
  action: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(DialogCategoryClick);