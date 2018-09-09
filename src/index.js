import React, { Placeholder, PureComponent, Fragment } from "react";
import ReactDOM from "react-dom";
import { coreContributorListJSON } from "../api/data";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { unstable_scheduleWork } from "schedule";
import {
  unstable_track as track,
  unstable_wrap as wrap
} from "schedule/tracking";
import UserPage from "./UserPage";
import "./styles.css";

const styles = {
  table: {
    border: "1px solid #ccc"
  },
  cell: {
    fontSize: 14,
    borderBottom: "1px solid #ccc",
    padding: "4px 15px",
    cursor: "pointer"
  }
};

const ContributorListPage = ({ onUserClick }) => (
  <Fragment>
    <h1>React Core Team</h1>
    <Table className={styles.table}>
      <TableBody>
        {coreContributorListJSON.map((user, i) => (
          <ContributorListItem
            key={user.id}
            onClick={() => onUserClick(user.id)}
            user={user}
          />
        ))}
      </TableBody>
    </Table>
  </Fragment>
);

const ContributorListItem = ({ onClick, user }) => (
  <TableRow key={user.id}>
    <TableCell scope="row">{user.name}</TableCell>
  </TableRow>
);

class Apps extends React.Component {
  state = {
    currentId: null,
    showDetails: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.showDetail !== this.state.showDetail ||
      (prevState.currentId !== this.state.currentId && this.state.showDetail)
    ) {
      window.scrollTo(0, 0);
    }
  }

  handleUserClick = id => {
    track(`View ${id}`, performance.now(), () => {
      track(`View ${id} (high-pri)`, performance.now(), () =>
        this.setState({
          currentId: id
        })
      );
      unstable_scheduleWork(
        wrap(() =>
          track(`View ${id} (low-pri)`, performance.now(), () =>
            this.setState({
              showDetail: true
            })
          )
        )
      );
    });
  };

  handleBackClick = () =>
    track("View list", performance.now(), () =>
      this.setState({
        currentId: null,
        showDetail: false
      })
    );
  renderList = () => {
    return <ContributorListPage onUserClick={this.handleUserClick} />;
  };
  renderDetail(id) {
    return (
      <div>
        <button
          onClick={this.handleBackClick}
          style={{
            display: "block",
            marginBottom: "1rem"
          }}
        >
          Return to list
        </button>
        <UserPage id={id} />
      </div>
    );
  }
  render() {
    const { currentId, showDetail } = this.state;
    return showDetail ? this.renderDetail(currentId) : this.renderList();
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Apps />, rootElement);
