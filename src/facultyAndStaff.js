import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core/styles";

const styles = () => ({
  side: {
    margin: 0,
    padding: 0,
    width: '200px',
    backgroundColor : '#f1f1f1',
    position: 'fixed',
    height: '100%',
  },
  content: {
    marginLeft: '200px',
    padding: '1px 16px',
    height: '1000px',
  }
});

// const styles = theme => ({
//   sideB: {
//     float: left,
//   },
// });


class Students extends Component {
  toStudent(id) {
    this.props.history.push(
      {
        pathname: '/studentComp',
        data: {id}
      }
    );
  }

  options = {
    title: "Faculty and Staff",
    dimensions: {
      datatable: {
        width: "100%",
        height: "80%"
      },
      row: {
        height: "60px"
      }
    },
    keyColumn: "facultystaff",
    font: "Arial",
    data: {
      columns: [
        {
          id: "facultystaff",
          label: "Faculty/Staff",
          colSize: "150px",
          editable: false
        },
        {
          id: "clickButton",
          label: "View",
          colSize: "20px",
          editable: false
        }
      ],
      rows: [
        {
          facultystaff: "Ty Roberts",
          id: 'troberts7',
          
        },
      ]
    },
    features: {
      canEdit: false,
      canDelete: false,
      canPrint: true,
      canDownload: true,
      canSearch: true,
      canRefreshRows: true,
      canOrderColumns: true,
      canSaveUserConfiguration: true,
      userConfiguration: {
        columnsOrder: ["facultystaff"],
        copyToClipboard: true
      },
      rowsPerPage: {
        available: [10, 25, 50, 100],
        selected: 50
      },
    }
  };
  actionsRow = ({ type, payload }) => {
    console.log(type);
    console.log(payload);
  };

  refreshRows = () => {
    const { rows } = this.options.data;
    const randomRows = Math.floor(Math.random() * rows.length) + 1;
    const randomTime = Math.floor(Math.random() * 4000) + 1000;
    const randomResolve = Math.floor(Math.random() * 10) + 1;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (randomResolve > 3) {
          resolve(chunk(rows, randomRows)[0]);
        }
        reject(new Error("err"));
      }, randomTime);
    });
  };

  onClick2  = (e, item) => {
    window.alert(JSON.stringify(item, null, 2));
  };


  render() {
    const { classes } = this.props;

    return (
      <Container>
        <div className={classes.side}>
          <Sidebar />
        </div>
        <div className={classes.content}>
          <Datatable
            options={this.options}
            refreshRows={this.refreshRows}
            actions={this.actionsRow}
          />
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Students);
