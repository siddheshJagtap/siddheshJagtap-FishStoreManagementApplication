import React, { Component } from "react";
import homepageIcon from "../additaments/homePageLogo.jpg";
import { Link } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.loginPage = this.loginPage.bind(this);
  }

  loginPage() {}
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
            <Link
                to={"/login"}
                className="badge badge-dark"
              >
                LOGIN
              </Link>
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
