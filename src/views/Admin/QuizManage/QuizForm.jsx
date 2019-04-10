import React, { Fragment } from "react";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import ReactChipInput from "../../../components/AutoChip/ReactChipSelect";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  TextField,
  withStyles,
  IconButton,
  FormControlLabel,
  Switch,
  Snackbar
} from "@material-ui/core";

import { Delete } from "@material-ui/icons";

import moment from "moment";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

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
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit * 4
  }
});

//Query to access Batch Category and SubCategory details
const ALL_QUERY = gql`
  {
    batches
    categoryDetailsList {
      subcategory {
        _id
        name
      }
      category {
        _id
        name
      }
    }
  }
`;

//mutation to create a quiz
const ADD_QUIZ = gql`
  mutation createAdminQuiz($adminQuizRequest: AdminQuizRequest!) {
    createAdminQuiz(adminQuizRequest: $adminQuizRequest) {
      _id
    }
  }
`;

//constants to handle from & to dates
const DATE_FROM = 1;
const DATE_TO = 2;

class QuizForm extends React.Component {
  //selectedDate --> state to store date
  constructor(props) {
    super(props);

    this.props = props;

    //maintain list of categories
    this.categories = [];

    //maintain list of batches
    this.batches = [];

    //total number of sections in the quiz
    this.numberOfSections = 0;

    //sets the current date for the from & to fields to the current date
    this.currentDate = new Date();

    //used to monitor errors in the system
    this.flag = true;

    this.state = {
      //maintain fields which are common to all sections
      quizCommon: {
        quizName: "",
        batch: "",
        activeFrom: new Date(),
        activeTo: new Date(),
        active: false
      },
      //keeps separate data for separate sections
      quizSectionWise: [
        {
          //selected category
          category: {
            name: ""
          },
          //subcategories selected
          subcategories: [],
          //list of possible subcategories for the category selected
          subcategoryList: [],
          //if true, this clears the chips for subcategory
          clearSubcategoryChips: false,
          //number of questions in the section
          numberOfQuestions: 0,
          //time limit in mins
          timeLimit: 0
        }
      ],
      //maintain error states
      error: {
        //set to true if there is an error in the dates selected
        dates: {
          status: false,
          message: ""
        }
      },
      //snackbar controls
      snackbar: {
        open: false,
        variant: "error",
        message: "",
        duration: 4000
      }
    };
  }

  //set error flag to false
  makeFlagFalse = () => {
    this.flag = false;
  };

  //set error flag to true
  makeFlagTrue = () => {
    this.flag = true;
  };

  // open snackbar with timer
  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
    setTimeout(() => {
      this.setState({
        snackbar: {
          ...this.state.snackbar,
          open: false
        }
      });
    }, this.state.snackbar.duration);
  };

  //close the snackbar
  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  //handle date fields, both from & to, depending on the type passed
  handleDateChange = (date, type) => {
    if (type === DATE_FROM) {
      this.setState(
        prevState => ({
          quizCommon: {
            ...prevState.quizCommon,
            activeFrom: date
          }
        }),
        this.validateDates
      );
    } else if (type === DATE_TO) {
      this.setState(
        prevState => ({
          quizCommon: {
            ...prevState.quizCommon,
            activeTo: date
          }
        }),
        this.validateDates
      );
    }
  };

  //handle the boolean active field
  handleActiveField = event => {
    this.setState(prevState => ({
      quizCommon: {
        ...prevState.quizCommon,
        active: !prevState.quizCommon.active
      }
    }));
  };

  //handle All the function state addition
  handleCommonFieldChanges = event => {
    event.persist();

    this.updateCommonFields(event);
  };

  //update value of fields
  updateCommonFields(event) {
    this.setState(state => ({
      quizCommon: {
        ...state.quizCommon,
        [event.target.name]: event.target.value
      }
    }));
  }

  //Function is for obtaining subcategory corresponding to selected category
  handleCategorySelect = (event, index) => {
    const categoryDetail = event.target.value;
    let availableSubcategories = categoryDetail.subcategory.map(subcategory => {
      return {
        key: subcategory._id,
        label: subcategory.name
      };
    });
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          category: categoryDetail.category,
          subcategoryList: availableSubcategories,
          subcategories: [],
          clearSubcategoryChips: true
        }
      }
    });
  };

  //handle value of time limit field in sections
  handleTimeLimitField = (event, index) => {
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          timeLimit: event.target.value
        }
      }
    });
  };

  //handle value of numberOfQns field in sections
  handleNumberOfQnsField = (event, index) => {
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          numberOfQuestions: event.target.value
        }
      }
    });
  };

  //handleClick function is to add more options into the quiz
  handleClick = () => {
    this.numberOfSections++;

    //create new section in the quizSectionWise object of objects and initialize a view for this
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [this.numberOfSections]: {
          category: {
            name: ""
          },
          subcategories: [],
          subcategoryList: [],
          clearSubcategoryChips: false,
          numberOfQuestions: 0,
          timeLimit: 0
        }
      }
    });
  };

  //handle delete icon click for each section
  handleDeleteClick = index => {
    let tempObj = this.state.quizSectionWise;

    //handle conditions where only one section is presnt
    if (Object.keys(tempObj).length < 2) {
      return;
    } else {
      //if more than one section is present, delete the section where the button was clicked and render new state
      delete tempObj[index];

      this.setState({
        quizSectionWise: {
          ...tempObj
        }
      });
    }
  };

  //called on submit button click
  handleSubmit = mutation => {
    //get data from the states and assign it to new objects to prevent disbehaviour
    const quizCommon = this.state.quizCommon;
    const dateError = this.state.error.dates.status;
    const quizSectionWise = this.state.quizSectionWise;

    //set flag value to true to reset it
    this.makeFlagTrue();

    //validate both common and sectionwise fields in the form
    this.validateCommonFields(quizCommon, dateError);
    this.validateSectionFields(quizSectionWise);

    //if no errors were found
    if (this.flag) {
      //transform quizSectionWise into an array for the mutation
      const sectionRequest = this.transformSections(quizSectionWise);

      console.log(sectionRequest);

      //call mutation & set variables
      mutation({
        variables: {
          adminQuizRequest: {
            name: this.state.quizCommon.quizName,
            description: this.state.quizCommon.description,
            target: this.state.quizCommon.batch,
            active: this.state.quizCommon.active,
            activeFrom: this.state.quizCommon.activeFrom,
            activeTo: this.state.quizCommon.activeTo,
            markPerQuestion: Number(this.state.quizCommon.marksPerQn),
            negativeMarkPerQuestion: Number(
              this.state.quizCommon.negativeMarksPerQn
            ),
            requestedSections: sectionRequest
          }
        }
      })
        .then(res => {
          //on successful completion of the mutation
          // this.setState(
          //   prevState => ({
          //     ...prevState,
          //     snackbar: {
          //       ...prevState.snackbar,
          //       variant: "success",
          //       message: "Quiz added successfully!"
          //     }
          //   }),
          //   () => this.openSnackbar()
          // );
        })
        .catch(err => {
          //if error was returned
          this.setState(
            prevState => ({
              ...prevState,
              snackbar: {
                ...prevState.snackbar,
                variant: "error",
                duration: 10000,
                message: "Error: " + err.graphQLErrors[0].message
              }
            }),
            () => this.openSnackbar()
          );
        });
    } else {
      //if there are errors in the form
      console.log("error in some fields");
    }
  };

  //quizCommon fields check
  validateCommonFields = (quizCommon, dateError) => {
    //null checks
    if (
      !quizCommon.quizName ||
      !quizCommon.description ||
      !quizCommon.batch ||
      dateError
    ) {
      this.makeFlagFalse();
    }
    //marksPerQn field value check
    else if (!quizCommon.marksPerQn || quizCommon.marksPerQn < 1) {
      this.makeFlagFalse();
    }
    //negativeMarksPerQn field value check
    else if (
      !quizCommon.negativeMarksPerQn ||
      quizCommon.negativeMarksPerQn < 1
    ) {
      this.makeFlagFalse();
    }

    //if error was found, show a snackbar
    if (!this.flag) {
      // this.openSnackbar();
    }
  };

  //quizSectionWise fields validation
  validateSectionFields = quizSectionWise => {
    //iterate through the sections
    for (let index in quizSectionWise) {
      //take single item of quizSection and assign it to 'item'
      let item = quizSectionWise[index];

      //null check
      if (
        !item.category.name ||
        !item.timeLimit ||
        item.subcategories.length === 0
      ) {
        this.makeFlagFalse();
      }
      //numberOfQuestions field validator
      else if (!item.numberOfQuestions || item.numberOfQuestions < 1) {
        this.makeFlagFalse();
      }
      //timeLimit field validator
      else if (!item.timeLimit || item.timeLimit < 1) {
        this.makeFlagFalse();
      }
    }

    //if error is present, open a snackbar & show error
    if (!this.flag) {
      // this.openSnackbar();
    }
  };

  //used to transform the quizSectionWise object to array
  transformSections = quizSectionWise => {
    //create temporary object
    let sectionRequest = [];

    for (const index in quizSectionWise) {
      //remove unnecessary fields for mutation
      delete quizSectionWise[index].subcategoryList;
      delete quizSectionWise[index].clearSubcategoryChips;

      //transform fields as required according to mutation specs
      quizSectionWise[index].category = quizSectionWise[index].category._id;
      quizSectionWise[index].timeLimit = Number(
        quizSectionWise[index].timeLimit
      );
      quizSectionWise[index].numberOfQuestions = Number(
        quizSectionWise[index].numberOfQuestions
      );

      //add to sectionRequest after transformation
      sectionRequest.push(quizSectionWise[index]);
    }
    return sectionRequest;
  };

  //used to validate dates
  validateDates = () => {
    if (this.state.quizCommon.activeTo < this.state.quizCommon.activeFrom) {
      this.setState(() => ({
        error: {
          dates: {
            message: "From date is larger than To date",
            status: true
          }
        }
      }));
    } else {
      this.setState(() => ({
        error: {
          dates: {
            status: false,
            message: ""
          }
        }
      }));
    }
  };

  // populate the dropdown used for category
  renderCategoryDropdown = () => {
    if (this.categories) {
      return this.categories.map(categoryDetail => {
        return (
          <MenuItem value={categoryDetail} key={categoryDetail.category._id}>
            {categoryDetail.category.name}
          </MenuItem>
        );
      });
    } else {
      return <Fragment />;
    }
  };

  //populate the dropdown used for batches
  renderBatchDropdown = () => {
    if (this.batches) {
      return this.batches.map(batch => {
        return (
          <MenuItem value={batch} key={batch}>
            {batch}
          </MenuItem>
        );
      });
    } else {
      return <Fragment />;
    }
  };

  //create jsx code for one section
  createSectionPiece = (counter, classes) => {
    let singlePiece;
    let index = counter;

    if (this.state.quizSectionWise[index]) {
      singlePiece = (
        <Fragment>
          <GridItem xs={12} sm={12} md={12} className={classes.formControl}>
            <IconButton onClick={() => this.handleDeleteClick(index)}>
              <Delete />
            </IconButton>
          </GridItem>
          <GridItem xs={12} sm={4} md={4} className={classes.formControl}>
            <FormControl fullWidth>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                onChange={e => this.handleCategorySelect(e, index)}
                value={this.state.quizSectionWise[index].category.name}
                renderValue={value => {
                  return value;
                }}
                inputProps={{
                  name: "category",
                  id: "category"
                }}
                fullWidth
              >
                {this.renderCategoryDropdown()}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={8} md={8} className={classes.elementPadding}>
            <ReactChipInput
              style={{ zIndex: 0 }}
              data={this.state.quizSectionWise[index].subcategoryList}
              label="Sub-Categories"
              hintText="Select sub-categories"
              getSelectedObjects={selectedSubcategories =>
                this.getSelectedSubcategories(selectedSubcategories, index)
              }
              clearChips={
                this.state.quizSectionWise[index].clearSubcategoryChips
              }
              onChipsCleared={() => this.chipsCleared(index)}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={6}>
            <TextField
              id="standard-number"
              label="No. Of Quest."
              type="number"
              fullWidth
              margin="normal"
              value={this.state.quizSectionWise[index].numberOfQuestions}
              onChange={e => this.handleNumberOfQnsField(e, index)}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={6}>
            <TextField
              id="standard-number"
              label="Time Limit (min)"
              type="number"
              fullWidth
              margin="normal"
              value={this.state.quizSectionWise[index].timeLimit}
              onChange={e => this.handleTimeLimitField(e, index)}
            />
          </GridItem>
          <br />
        </Fragment>
      );
    } else {
      singlePiece = <Fragment />;
    }

    return singlePiece;
  };

  //render code for a section
  renderSectionDetails = classes => {
    let counter = 0;

    let sectionContainer = [];
    console.log("section rendered");

    //create section pieces
    while (counter <= this.numberOfSections) {
      let singlePiece = this.createSectionPiece(counter, classes);

      sectionContainer.push(singlePiece);
      counter++;
    }

    return sectionContainer;
  };

  //For Displaying the selected subcategories
  getSelectedSubcategories = (selectedSubcategories, index) => {
    const subcategories = selectedSubcategories.map(selectedSubcategory => {
      return selectedSubcategory.value;
    });

    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          subcategories
        }
      }
    });
  };

  //Function is for clearing the chips
  chipsCleared = index => {
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          clearSubcategoryChips: false
        }
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Query query={ALL_QUERY}>
          {({ data, loading, error }) => {
            if (loading) {
              return <Typography>Loading...</Typography>;
            } else if (error) {
              return <Typography>Error occured!!!</Typography>;
            } else {
              // assign value of common values to lists
              this.categories = data.categoryDetailsList;
              this.batches = data.batches;

              return (
                <div className={classes.root}>
                  <form autoComplete="off" autoWidth={true}>
                    <Typography>
                      <strong>Basic Info</strong>
                    </Typography>
                    <GridContainer>
                      <GridItem
                        xs={12}
                        sm={3}
                        md={3}
                        className={classes.container}
                      >
                        <TextField
                          id="standard-search"
                          label="Quiz Name"
                          type="input"
                          margin="normal"
                          name="quizName"
                          value={this.state.quizCommon.quizName}
                          onChange={this.handleCommonFieldChanges}
                          fullWidth
                        />
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={3}
                        md={3}
                        className={classes.container}
                      >
                        <TextField
                          id="standard-marks"
                          label="+ Marks Per Question"
                          margin="normal"
                          type="number"
                          name="marksPerQn"
                          value={this.state.quizCommon.marksPerQn}
                          onChange={this.handleCommonFieldChanges}
                          fullWidth
                        />
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={3}
                        md={3}
                        className={classes.container}
                      >
                        <TextField
                          id="standard-negative-marks"
                          label="- Marks per Question"
                          margin="normal"
                          type="number"
                          name="negativeMarksPerQn"
                          value={this.state.quizCommon.negativeMarksPerQn}
                          onChange={this.handleCommonFieldChanges}
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={12} sm={3} md={3}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            error={this.state.error.dates.status}
                            helperText={this.state.error.dates.message}
                            className={classes.date_root}
                            minDate={this.currentDate}
                            label="Active From"
                            clearable
                            formatDate={date =>
                              moment(date).format("YYYY-MM-DD")
                            }
                            value={this.state.quizCommon.activeFrom}
                            format="dd/MMM/yyyy"
                            onChange={date =>
                              this.handleDateChange(date, DATE_FROM)
                            }
                          />
                        </MuiPickersUtilsProvider>
                      </GridItem>
                      <GridItem xs={12} sm={3} md={3}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            className={classes.date_root}
                            minDate={this.currentDate}
                            label="Active Till"
                            clearable
                            formatDate={date =>
                              moment(date).format("YYYY-MM-DD")
                            }
                            value={this.state.quizCommon.activeTo}
                            format="dd/MMM/yyyy"
                            onChange={date =>
                              this.handleDateChange(date, DATE_TO)
                            }
                          />
                        </MuiPickersUtilsProvider>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={3}
                        md={3}
                        className={classes.formroot}
                      >
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="batch">Batch</InputLabel>
                          <Select
                            onChange={this.handleCommonFieldChanges}
                            value={this.state.quizCommon.batch}
                            renderValue={value => {
                              return value;
                            }}
                            inputProps={{
                              name: "batch",
                              id: "batch"
                            }}
                            fullWidth
                          >
                            {this.renderBatchDropdown()}
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={3}
                        md={3}
                        className={classes.container}
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              name="active"
                              checked={this.state.quizCommon.active}
                              onChange={e => this.handleActiveField(e)}
                            />
                          }
                          label="Active"
                        />
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.container}
                      >
                        <TextField
                          id="description"
                          label="Quiz Description"
                          margin="normal"
                          type="text"
                          name="description"
                          value={this.state.quizCommon.description}
                          onChange={this.handleCommonFieldChanges}
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <Typography>
                      <strong>Other Info</strong>
                    </Typography>
                    <GridContainer>
                      {this.renderSectionDetails(classes)}
                    </GridContainer>
                    <GridItem xs={12} sm={2} md={2}>
                      <Button
                        fullWidth
                        color="primary"
                        className={classes.button}
                        onClick={this.handleClick}
                      >
                        Add More
                      </Button>
                    </GridItem>
                    <GridItem xs={12} sm={2} md={2}>
                      <Mutation mutation={ADD_QUIZ}>
                        {addQuiz => (
                          <Button
                            fullWidth
                            color="primary"
                            className={classes.button}
                            onClick={() => this.handleSubmit(addQuiz)}
                          >
                            Create Quiz
                          </Button>
                        )}
                      </Mutation>
                    </GridItem>
                  </form>
                </div>
              );
            }
          }}
        </Query>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.snackbar.open}
          autoHideDuration={6000}
        >
          <CustomSnackbar
            onClose={this.closeSnackbar}
            variant={this.state.snackbar.variant}
            message={this.state.snackbar.message}
          />
        </Snackbar>
      </Fragment>
    );
  }
}

// QuizForm.propTypes =

export default withStyles(styles)(QuizForm);
