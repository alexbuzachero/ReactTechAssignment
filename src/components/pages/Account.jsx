import React, { Component } from "react";
import Main from "../templates/Main";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";
import "./Account.css";

// Object that will be passed to load the Account header
const headerProps = {
  icon: "users",
  title: "Accounts",
  subtitle: "Select one account to display the full user information."
};

const baseUrl = "https://dev.presscentric.com/test";

export default class Account extends Component {
  state = {
    userlist: [],
    usernames: [],
    account: [],
    displayData: [],
    showResults: false
  };

  // Loading the users list from API in the userlist State
  componentWillMount() {
    axios
      .get(`https://cors-anywhere.herokuapp.com/${baseUrl}/accounts`)
      .then(response => {
        if (!response.data.errmsg) {
          this.setState({ userlist: response.data });
          const unames = [];

          //Loading the username state to load the dropdown user list
          this.state.userlist.forEach(function(u) {
            unames.push({ key: u.id, text: u.name, value: u.name });
          });
          this.setState({
            usernames: unames
          });
        } else {
          console.log("resgister operation failed");
        }
      })
      .catch(error => {
        console.log("register error: ");
        console.log(error);
      });
  }

  // Delete function that is called by the delete button
  deleteUSer(user) {
    axios
      .delete(
        `https://cors-anywhere.herokuapp.com/${baseUrl}/accounts/${
          this.state.account.id
        }`
      )
      .then(response => {
        if (!response.data.errmsg) {
          alert(`The user "${this.state.account.nameFirst}" was Deleted!!!`);
          // console.log(`Deleted: ${this.state.account.id}`);

          // Cleaning the account state after delete
          this.setState({ account: [] });
          // Setting the showResuts state to false to hide the user details screen
          this.setState({ showResults: false });
        } else {
          console.log("resgister operation failed");
        }
      })
      .catch(error => {
        console.log("register error: ");
        console.log(error);
      });
  }

  // Function to load the displayData state with the full user info
  loadUserInfo = (event, data) => {
    // Getting the user key selected in the dropdown menu
    const { value } = data;
    const { key } = data.options.find(o => o.value === value);
    // Setting the showResuts state to true to show the user details screen
    this.setState({ showResults: true });

    const url = `https://cors-anywhere.herokuapp.com/${baseUrl}/accounts/${key}`;
    axios.get(url).then(response => {
      this.setState({ account: response.data });
      let userInfo = [];
      userInfo.push(
        <div>
          <p className="h5 mb-4 mt-4 text-center">Account Details:</p>
          <div className="mt-2 border bg-light rounded detailsClass">
            <p>
              <b>First Name:</b> {this.state.account.nameFirst}
            </p>
            <p>
              {" "}
              <b>Last Name:</b> {this.state.account.nameLast}
            </p>
            <p>
              {" "}
              <b>Email:</b> {this.state.account.email}
            </p>
            <p>
              {" "}
              <b>Gender:</b>{" "}
              {/* Using the if statement to replace the Male/Male text to the respective icon */}
              <i
                className={
                  this.state.account.gender === "Male"
                    ? "fa fa-male"
                    : "fa fa-female"
                }
              />
            </p>
            <p>
              {" "}
              <b>Ip:</b> {this.state.account.ip}
            </p>
          </div>
          <div className="col-12 d-flex justify-content-center mt-4">
            <button
              className="btn btn-danger"
              onClick={e => this.deleteUSer(e)}
            >
              Delete
            </button>
          </div>
        </div>
      );
      this.setState({ displayData: userInfo });
    });
  };

  // Render Function to render the search dropdown Menu
  renderForm() {
    return (
      <Dropdown
        placeholder="Enter Username"
        fluid
        search
        selection
        onChange={this.loadUserInfo}
        options={this.state.usernames}
      />
    );
  }

  // Render the use list from the displayData state
  renderUserList() {
    return (
      <div
        // Using the if statement to show or hide the user details screen
        className={
          this.state.showResults ? "container-fluid" : "container-fluid d-none"
        }
      >
        {this.state.displayData}
      </div>
    );
  }
  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderUserList()}
      </Main>
    );
  }
}
