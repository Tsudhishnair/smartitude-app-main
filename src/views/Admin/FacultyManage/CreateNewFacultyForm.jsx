import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import ChipInput from 'material-ui-chip-input';

const styles = theme =>
  ({
    elementPadding: { padding: '15px' },
    container: {
      display: 'flex',
      flexGrow: 1,
    },
    root:
      {
        flexGrow: 1,
        marginLeft: 10
      },
    formControl: {
      margin: theme.spacing.unit * 2,
      minWidth: 120,
    },
    button: {
      margin: theme.spacing.unit*4,
    },
  });
function CreateNewFacultyForm(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography> <strong>Basic Info</strong></Typography>
      <GridContainer>
              <GridItem xs={12} sm={6} md={6} className={classes.elementPadding}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="name"
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6} className={classes.elementPadding}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  className={classes.elementPadding}
                  label="Email Address"
                  type="email"
                  fullWidth
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6} className={classes.elementPadding}>
                <InputLabel htmlFor="max-width">Department</InputLabel>
                <Select
                  fullWidth
                  label='Department'
                  inputProps={{
                    name: 'dept',
                    id: 'dept',
                  }}
                >
                  <MenuItem value="xs">Information Technology</MenuItem>
                  <MenuItem value="sm">Computer Science</MenuItem>
                  <MenuItem value="md">Mechanical</MenuItem>
                  <MenuItem value="lg">Civil</MenuItem>
                  <MenuItem value="xl">Electrical</MenuItem>
                </Select>
              </GridItem>
              <GridItem xs={12} sm={6} md={6} className={classes.elementPadding}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="phone"
                  label="Phone Number"
                  type="phone"
                  fullWidth
                />
              </GridItem>
            </GridContainer>
            <ChipInput
              defaultValue={['Algebra', 'Motion', 'Quantitative']}
              fullWidth
              className={classes.elementPadding}
              label='Sub-Categories'
              placeholder='Type and press enter to add chips'
            />
    </div>
  )

}
export default withStyles(styles)(CreateNewFacultyForm);