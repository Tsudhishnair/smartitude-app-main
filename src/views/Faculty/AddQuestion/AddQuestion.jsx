import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Select,
  ExpansionPanelActions,
  TextField,
  Typography
} from "@material-ui/core";
import Spacing from "components/Spacing/Spacing";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    minWidth: 120,
    display: "flex",
    flexGrow: 1,
    margin: 0,
    fullWidth: true,
    wrap: "nowrap"
  },
  button: {
    margin: theme.spacing.unit * 4
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      question: "",
      options: [],
      solution: "",
      correctOption: "",
      category: "",
      subCategory: "",
      subcategoryList:[],
      difficulty: ""
    };
  }

  //-----------------------------------------------------------------
  // handle Category List
  handleCategorySelect = event => {
    const categoryDetail = event.target.value;
    console.log(categoryDetail);

    let availableSubcategories = categoryDetail.subcategory;
    this.setState({
      ...this.state,
      [event.target.name]: categoryDetail.category,
      subcategoryList: availableSubcategories,
      subcategories: [],
    });
  };
 //------------------------------------------------------------- 
//--------------------------------------------------------------
  // SubCategory Management
  getSelectedSubcategories = (selectedSubcategories) => {
    const subcategories = selectedSubcategories.map(selectedSubcategory => {
      return selectedSubcategory.value
    })
    this.setState({
      ...this.state,
      subcategories,
    });    
  }
  //-------------------------------------------------------------

  render() {
    const { classes } = this.props;
    //-----------------------------------------------------------
    //Query To Fetch Category and its Coresponsding Sub-Categories 
    const FETCH_FORM_FIELDS = gql`
      {
        categoryDetailsList {
          category {
            _id
            name
          }
          subcategory {
            _id
            name
          }
        }
      }
    `;
    //------------------------------------------------------------

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
            <Typography>
              <strong>Detailed Answer</strong>
            </Typography>
            <GridItem xs={12} sm={12} md={12} className={classes.container}>
              <TextField
                placeholder="Type in your detailed answer"
                multiline={true}
                rows={2}
                label="AnswerDetailed"
                rowsMax={10}
                type="input"
                margin="normal"
                fullWidth
              />
            </GridItem>
          </GridContainer>

          <Spacing />

          <Typography>
            <strong>Other Info</strong>
          </Typography>
          <GridContainer>
            <GridItem xs={12} sm={3} md={3}>
              <InputLabel fullWidth>Correct Option</InputLabel>
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
            </GridItem>

            {/* Category and SubCategory 
            ------------------------------------------------------------------------------- */}
            <Query query={FETCH_FORM_FIELDS}>
              {({ data, loading, error }) => {
                return (
                  <GridContainer>
                    <GridItem xs={12} sm={3} md={3}>
                      <InputLabel htmlFor="age-simple" fullWidth>
                        Category
                      </InputLabel>
                      <Select
                        onChange={this.handleCategorySelect}
                        value={this.state.Category}
                        renderValue={value => {
                          return value;
                        }}
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
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
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
                    </GridItem>
                  </GridContainer>
                );
              }}
            </Query>
            {/* ------------------------------------------------------------------------------- */}

            <GridItem xs={12} sm={3} md={3}>
              <InputLabel htmlFor="age-simple" fullWidth>
                Difficulty
                <TextField id="standard-number" type="number" fullWidth />
              </InputLabel>
            </GridItem>
          </GridContainer>
          <Spacing />
          <ExpansionPanelActions>
            <Button type="reset">Clear</Button>
            <Button color={"primary"} variant={"outlined"} type="submit">
              Submit
            </Button>
          </ExpansionPanelActions>
        </form>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
