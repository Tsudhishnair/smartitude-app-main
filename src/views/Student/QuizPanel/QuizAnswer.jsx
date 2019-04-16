import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {
  Card,
  Button,
  CardContent,
  Typography,
  Divider,
  Fab,
  StepLabel,
  Step,
  Stepper
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio/index";
import RadioGroup from "@material-ui/core/RadioGroup/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import FormControl from "@material-ui/core/FormControl/index";
import FormLabel from "@material-ui/core/FormLabel/index";
import Spacing from "../../../components/Spacing/Spacing";
import CardFooter from "../../../components/Card/CardFooter";
import CardBody from "../../../components/Card/CardBody";
import Timer from "react-compound-timer/build/components/Timer/Timer";

const styles = theme => ({
  root: {
    display: "block",
    margin: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5
  },
  timer: {
    color: "green"
  },
  formControl: {
    margin: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  fab: {
    margin: theme.spacing.unit,
    elevation: 0,
    boxShadow: "none"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ["Logical Reasoning", "Quantitative", "Verbal"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

class QuizAnswer extends React.Component {
  state = {
    value: "option",
    activeStep: 0,
    skipped: new Set()
  };

  //Stepper Functions

  isStepOptional = step => step === 1;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem>
            <Typography>
              <h4>Quiz Name</h4>
            </Typography>
          </GridItem>
          <GridItem />
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <form>
                <CardContent>
                  <Typography>
                    Question Number: <b>XX</b>
                  </Typography>
                  <p>
                    A train 125 m long passes a man, running at 5 km/hr in the
                    same direction in which the train is going, in 10 seconds.
                    The speed of the train is:
                  </p>
                  <Divider />
                </CardContent>
                <CardBody>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Select your correct choice below
                    </FormLabel>
                    <RadioGroup
                      aria-label="options"
                      name="option"
                      className={classes.group}
                      value={this.state.value}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value="option1"
                        control={<Radio />}
                        label="Option 1"
                      />
                      <FormControlLabel
                        value="option2"
                        control={<Radio />}
                        label="Option 2"
                      />
                      <FormControlLabel
                        value="option3"
                        control={<Radio />}
                        label="Option 3"
                      />
                      <FormControlLabel
                        value="option4"
                        control={<Radio />}
                        label="Option 4"
                      />
                    </RadioGroup>
                  </FormControl>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button
                    variant="outlined"
                    color={"secondary"}
                    size={"small"}
                    className={classes.button}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    size={"small"}
                    type={"reset"}
                    className={classes.button}
                  >
                    Clear Selection
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size={"small"}
                    type={"submit"}
                    className={classes.button}
                  >
                    Next
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardContent>
                <p>
                  Time Remaining:{" "}
                  <h4 className={classes.timer}>
                    <b>
                      {" "}
                      <Timer
                        initialTime={60000 * 10 + 60}
                        direction="backward"
                        onStop={() => console.log("onStop hook")}
                      >
                        {() => (
                          <React.Fragment>
                            <Timer.Minutes /> minutes <Timer.Seconds /> seconds
                          </React.Fragment>
                        )}
                      </Timer>
                    </b>
                  </h4>
                </p>
                <Spacing />
                <p>
                  <b>Questions:</b>
                </p>
                <Fab
                  size="small"
                  variant={"outlined"}
                  color="primary"
                  aria-label="Add"
                  className={classes.fab}
                >
                  1
                </Fab>
                <Fab
                  size="small"
                  variant={"outlined"}
                  color="white"
                  aria-label="Add"
                  className={classes.fab}
                >
                  2
                </Fab>
                <Fab
                  size="small"
                  variant={"outlined"}
                  color="white"
                  aria-label="Add"
                  className={classes.fab}
                >
                  3
                </Fab>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outlined"
                  color="primary"
                  size={"small"}
                  type={"submit"}
                  className={classes.button}
                >
                  Finish Quiz
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <Spacing/>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const props = {};
                    const labelProps = {};
                    if (this.isStepSkipped(index)) {
                      props.completed = false;
                    }
                    return (
                      <Step key={label} {...props}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </CardContent>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

QuizAnswer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizAnswer);
