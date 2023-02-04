import { Component, ChangeEvent } from "react";
import StoreDataService from "../services/storeServices";
import IStoreData from "../interface/IStoreData";
import React from "react";
import successIcon from "../additaments/successIcon.png";

type Props = {};

type State = IStoreData & {
  submitted: boolean;
};

export default class AddDataWindow extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeShelfTankNumber = this.onChangeShelfTankNumber.bind(this);
    this.stockToggleHandler = this.stockToggleHandler.bind(this);
    this.saveData = this.saveData.bind(this);
    this.newData = this.newData.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      inStock: false,
      shelfNumber_tankNumber: "",
      submitted: false,
    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value,
    });
  }

  stockToggleHandler(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    this.setState({
      inStock: e.target.value === "true" ? true : false,
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeShelfTankNumber(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      shelfNumber_tankNumber: e.target.value,
    });
  }

  saveData() {
    const data: IStoreData = {
      title: this.state.title,
      description: this.state.description,
      shelfNumber_tankNumber: this.state.shelfNumber_tankNumber,
      inStock: this.state.inStock,
    };

    StoreDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          inStock: response.data.instock,
          shelfNumber_tankNumber: response.data.shelfNumber_tankNumber,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newData() {
    this.setState({
      id: null,
      title: "",
      description: "",
      inStock: false,
      shelfNumber_tankNumber: "",
      submitted: false,
    });
  }

  render() {
    const {
      submitted,
      title,
      description,
      shelfNumber_tankNumber,
    } = this.state;

    return (
      <div
        className="card col-md-6 offset-md-3 offset-md-3"
        style={{ backgroundColor: "lightgray", padding: "30px" }}
      >
        <div className="submit-form">
          {submitted ? (
            <div>
              <img
                src={successIcon}
                width="200px"
                height="200px"
                alt="SUCCESS LOGO"
                style={{ marginLeft: "10px" }}
              />
              <div className="message">
                <h6>DATA STORED SUCCESSFULLY !</h6>
              </div>
              <button
                className="btn btn-info"
                onClick={this.newData}
                style={{ marginLeft: "30px" }}
              >
                Add More Data
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Product Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Product Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Shelf/Tank Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="Shelf/Tank Number"
                  required
                  value={shelfNumber_tankNumber}
                  onChange={this.onChangeShelfTankNumber}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">InStock (Yes/No)</label>
                <div onChange={this.stockToggleHandler}>
                  <input type="radio" value="true" name="gender" /> Yes
                  <input
                    type="radio"
                    value="false"
                    name="gender"
                    defaultChecked
                    style={{ marginLeft: "20px" }}
                  />{" "}
                  No
                </div>
              </div>

              <button
                onClick={this.saveData}
                className="btn btn-info"
                style={{ marginLeft: "50px" }}
              >
                SUBMIT
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
