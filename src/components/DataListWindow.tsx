import { Component, ChangeEvent } from "react";
import StoreDataService from "../services/storeServices";
import { Link } from "react-router-dom";
import IStoreData from "../interface/IStoreData";
import React from "react";

type Props = {};

type State = {
  data: Array<IStoreData>;
  currentData: IStoreData | null;
  currentIndex: number;
  searchTitle: string;
};

export default class DataListWindow extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveData = this.setActiveData.bind(this);
    this.removeAllData = this.removeAllData.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      data: [],
      currentData: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveData();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveData() {
    StoreDataService.getAll()
      .then((response: any) => {
        this.setState({
          data: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveData();
    this.setState({
      currentData: null,
      currentIndex: -1,
    });
  }

  setActiveData(tutorial: IStoreData, index: number) {
    this.setState({
      currentData: tutorial,
      currentIndex: index,
    });
  }

  removeAllData() {
    StoreDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  removeData(id: string) {
    StoreDataService.delete(id!)
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentData: null,
      currentIndex: -1,
    });

    StoreDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          data: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, data, currentData, currentIndex } = this.state;

    return (
      <div
        className="list row"
        style={{
          backgroundColor: "lightgray",
          padding: "30px",
          borderRadius: "5px",
        }}
      >
        <div className="col-md-8" style={{ marginLeft: "17%" }}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th> Title</th>
              <th> Description</th>
              <th> Shelf/Tank Number</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {data.map((storedata: IStoreData, index: number) => (
              <tr key={storedata.id}>
                <td> {storedata.title}</td>
                <td> {storedata.description}</td>
                <td> {storedata.shelfNumber_tankNumber}</td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="col-md-6" style={{ marginTop: "15px" }}>
          <h4 style={{ marginLeft: "20px" }}>FISH STORE DATA LIST</h4>

          <ul className="list-group">
            {data &&
              data.map((storedata: IStoreData, index: number) => (
                <li
                  className={
                    "list-group-item list-group-item-dark" +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveData(storedata, index)}
                  key={index}
                >
                  {storedata.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllData}
          >
            Delete All
          </button>
        </div>
        <div className="col-md-6">
          {currentData ? (
            <div style={{ backgroundColor: "white", padding: "15px" }}>
              <h4>PRODUCT DETAILS</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentData.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentData.description}
              </div>
              <div>
                <label>
                  <strong>InStock :</strong>
                </label>{" "}
                {currentData.inStock ? "In Stock" : "Out Of Stock"}
              </div>
              <div>
                <label>
                  <strong>Shelf/Tank Number :</strong>
                </label>{" "}
                {currentData.shelfNumber_tankNumber}
              </div>

              <Link
                to={"/storeDataList/" + currentData.id}
                className="badge badge-dark"
              >
                Edit
              </Link>
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={() => this.removeData(currentData.id)}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
