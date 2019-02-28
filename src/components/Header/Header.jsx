import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import { AppBar, Toolbar, IconButton, Hidden } from "@material-ui/core";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import Button from "components/CustomButtons/Button.jsx";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";
import { Query } from "../../../node_modules/react-apollo";
import gql from "graphql-tag";

function Header({ ...props }) {
  function makeBrand() {
    var name;
    props.routes.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }

  const { classes, color } = props;

  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });

  const adminInfo = gql`
    {
      me {
        _id
        name
      }
    }
  `;

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
          <div>
            <Query query={adminInfo}>
              {({ data, loading, error }) => {
                return (
                  <Button
                    color="transparent"
                    href="#"
                    className={classes.title}
                  >
                    {!loading ? `You are logged in as: ${data.me.name}` : ""}
                  </Button>
                );
              }}
            </Query>
          </div>
        </div>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
