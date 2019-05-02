import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import combineStyles from "components/CombineStyles/CombineStyles.js";
import {
  CardContent,
  Typography,
  Divider,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from "@material-ui/core";

import Spacing from "../../../components/Spacing/Spacing";
import CardFooter from "../../../components/Card/CardFooter";
import CardBody from "../../../components/Card/CardBody";
import Card from "../../../components/Card/Card";

import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import Danger from "components/Typography/Danger.jsx";
import Store from "@material-ui/icons/People";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import green from "@material-ui/core/colors/green";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
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
  },
  radioPrimary: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {}
});

class QuizAnswer extends React.Component {
  constructor(props) {
    super(props);

    //save data received in props
    this.data = this.props.location.state;

    console.log(this.data);
  }

  //jsx for header
  renderHeader = () => {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <p>
                  <Typography variant={"overline"} />
                  <Typography variant={"h5"}>
                    <center>
                      <p>Congratulation</p>
                    </center>
                  </Typography>
                </p>
              </CardContent>
              <CardFooter>
                <p>
                  <strong>Score:</strong>
                  25.5/50
                </p>
                <p>
                  <strong>Negative Marks:</strong>
                  24
                </p>
                <p>
                  <strong>Time Taken:</strong>
                  23.6 mins/30mins
                </p>
                <p>
                  <strong>Current Rank:</strong>
                  6th/150
                </p>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card Green>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>grade</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Current Score</p>
                <h3 className={classes.cardTitle}>4.9/10</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Prepare More
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Ranking</p>
                <h3 className={classes.cardTitle}>420th</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Attempted Quizzes</p>
                <h3 className={classes.cardTitle}>12</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Last one at 11/04/19
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <LocalOffer />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  //create jsx for a single question
  createQuestionPiece = (sectionIndex, questionIndex, classes) => {
    const question = this.data.sections[sectionIndex].questions[questionIndex];

    console.log(question);

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <form>
                  <CardContent>
                    <Typography>
                      Question Number: <b>{questionIndex + 1}</b>
                    </Typography>
                    <p>{question.question}</p>
                    <Divider />
                  </CardContent>
                  <CardBody>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Marked Choice</FormLabel>
                      <RadioGroup
                        aria-label="options"
                        name="option"
                        value={
                          this.data.attemptedSections[sectionIndex]
                            .attemptedQuestions[questionIndex].markedOption
                        }
                        className={classes.group}
                      >
                        <FormControlLabel
                          value={1}
                          control={
                            <Radio
                              classes={{
                                root: classes.radioPrimary,
                                checked: classes.checked
                              }}
                            />
                          }
                          label={question.options[0]}
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label={question.options[1]}
                        />
                        <FormControlLabel
                          value={3}
                          control={<Radio />}
                          label={question.options[2]}
                        />
                        <FormControlLabel
                          value={4}
                          control={<Radio />}
                          label={question.options[3]}
                        />
                      </RadioGroup>
                    </FormControl>
                  </CardBody>
                  <Divider />
                </form>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  <strong>Detailed Answer:</strong>
                  <div>{question.solution}</div>
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Card>
        </GridItem>
      </GridContainer>
    );
  };

  //getting questions
  renderQuestions = classes => {
    let rowCounter = 0,
      columnCounter = 0;

    let container = [];

    while (rowCounter < this.data.sections.length) {
      console.log(this.data.sections);

      container.push(this.createSectionHeader(rowCounter + 1));

      columnCounter = 0;
      while (columnCounter < this.data.sections[rowCounter].questions.length) {
        container.push(
          this.createQuestionPiece(rowCounter, columnCounter, classes)
        );
        columnCounter++;
      }
      rowCounter++;
    }

    return (
      <React.Fragment>
        <Spacing />
        {container}
      </React.Fragment>
    );
  };

  //getting section title
  createSectionHeader = value => {
    return <Typography>Section {value}</Typography>;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem>
            <Typography>
              <h4>{this.data.name}</h4>
            </Typography>
          </GridItem>
        </GridContainer>
        <Spacing />
        {this.renderHeader()}
        {this.renderQuestions(classes)}
      </div>
    );
  }
}

QuizAnswer.propTypes = {
  classes: PropTypes.object.isRequired
};

const combinedStyles = combineStyles(styles, dashboardStyle);

export default withStyles(combinedStyles)(QuizAnswer);
