import React, { Component } from "react";
import homepageIcon from "../additaments/homePageLogo.jpg";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.registrationPage = this.registrationPage.bind(this);
    this.loginPage = this.loginPage.bind(this);
  }

  registrationPage() {
    this.props.history.push("/add-technician");
  }

  loginPage() {
    this.props.history.push("/login");
  }
  render() {
    return (
      <div>
        <div className="homepagebuttons">
          <button
            style={{ margin: "10px 0 10px 10px" }}
            className="btn btn-primary"
            onClick={this.loginPage}
          >
            {" "}
            LOGIN
          </button>
          <h2>FISH STORE MANAGEMENT HOMEPAGE</h2>
        </div>

        <div className="homepage">
          <img
            src={homepageIcon}
            widht="400px"
            height="300px"
            alt="HOMEPAGE"
            style={{ marginLeft: "75%" }}
          />
        </div>
      </div>
    );
  }
}

export default HomePage;
