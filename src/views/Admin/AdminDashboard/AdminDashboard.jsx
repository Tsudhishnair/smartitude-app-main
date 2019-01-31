import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/People";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Button from "components/CustomButtons/Button.jsx";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              {/* <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Take a Test</h4>
                <p className={classes.cardCategoryWhite}>
                  Choose your desired test type below
            </p>
              </CardHeader> */}
              <CardBody>
                <h3 className={classes.cardTitle}>Dashboard</h3>
                <p className={classes.cardCategory}>
                  Choose your desired settings from below
            </p>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={4}>
                    <Card style={{ background: "linear-gradient(60deg, #66bb6a, #43a047)", height: '180px' }}>

                      <CardBody >
                        <h4 className={classes.cardTitleWhite}>Student Management</h4>
                        <p className={classes.cardCategoryWhite}>
                          Add, Remove and Manage Students 
                </p>
                      </CardBody>
                      <CardFooter >
                        <Icon style={{ color: "white" }}>school</Icon>
                        <Button round color="success" style={{ marginLeft: 'auto', }}>Manage</Button>
                      </CardFooter>

                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={6} md={4}>
                    <Card style={{ background: "linear-gradient(60deg, #26c6da, #00acc1)", height: '180px' }}>
                      <CardBody >
                        <h4 className={classes.cardTitleWhite}>Notification</h4>
                        <p className={classes.cardCategoryWhite}>
                          Send Notifications for students and faculty and Manage them
                </p>
                      </CardBody>
                      <CardFooter >
                        <Icon style={{ color: "white" }}>notifications</Icon>
                        <Button round color="info" style={{ background: "transparent", marginLeft: 'auto', }}>Message</Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={4}>
                    <Card style={{ background: "linear-gradient(60deg, #ef5350, #e53935)", height: '180px' }}>
                      <CardBody >
                        <h4 className={classes.cardTitleWhite}>Quiz Management</h4>
                        <p className={classes.cardCategoryWhite}>
                          Assign quizes to students and manage them
                </p>
                      </CardBody>
                      <CardFooter >
                        <Icon style={{ color: "white" }}>done_all</Icon>
                        <Button round color="danger" style={{ background: "transparent", marginLeft: 'auto', }}>Assign</Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Top Rankers</h4>
                <p className={classes.cardCategoryWhite}>
                  Top rankers on 15th January, 2019
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Score", "Class"]}
                  tableData={[
                    ["1", "Dakota Rice", "8.7", "S7 EC A"],
                    ["2", "Minerva Hooper", "8.65", "S7 CS A"],
                    ["3", "Sage Rodriguez", "7.4", "S7 IT"],
                    ["4", "Philip Chaney", "7.33", "S7 IT"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
