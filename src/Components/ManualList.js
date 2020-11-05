import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";

import "./ManualList.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class ManualList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      mixerData: [],
      extruderData: [],
      workFlowData: [],
      searchValue: "",
      loading: false,
      gridOptions: {
        columnDefs: [
          {
            headerName: "",
            field: "",
            width: 50,
            hide: false,
            checkboxSelection: true,
            cellStyle: { "justify-content": "flex-center" },
          },
          {
            headerName: "Po Number",
            field: "posordernumber",
            width: 110,
          },
          { headerName: " Product Code", field: "customercode", width: 120 },
          {
            headerName: "Description",
            field: "finishedgooddescription",
            width: 300,
          },
          { headerName: "Order Qty", field: "orderquantity", width: 100 },
          {
            headerName: "Mixer",
            field: "Mixer",
            width: 80,
            Cell: (props) => {
              return (
                <DropdownButton
                  id="dropdown-basic-button"
                  variant="light"
                  title="MX03"
                >
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
              );
            },
          },
          {
            headerName: "Extruder",
            field: "Extruder",
            width: 100,
            cellRenderer: this.CustomCombobox,
          },
          { headerName: "Work Flow", field: "workflow", width: 100 },
          {
            headerName: "RM Available Date",
            field: "rawmaterialavailabledate",
            width: 130,
          },
          {
            headerName: "FG End Date",
            field: "totalcommitmentdate",
            width: 130,
          },
          {
            headerName: "Last Fail Reason",
            field: "Fail.LastFailReason",
            width: 200,
          },
          {
            setQuickFilter: function (params) {
              return params.value.name;
            },
          },
        ],
        defaultColDef: {
          flex: 1,
          editable: true,
        },
        rowData: this.createRowData(),
        components: {
          boldRenderer: function (params) {
            return "<b>" + params.value.name + "</b>";
          },
        },
      },
    };
  }
  CustomCombobox = () => {
    return (
      <select>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option selected value="coconut">
          Coconut
        </option>
        <option value="mango">Mango</option>
      </select>
    );
  };

  onChange = (e) => {
    this.setState(
      {
        searchValue: e.target.value,
      },
      () => {
        this.gridOptions.setQuickFilter(this.state.searchValue);
        console.log("123 ", this.state.columnDefs);
      }
    );
  };
  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://uical-test-v1.eu-de.mybluemix.net/api/schedule/manual/v1")
      .then((response) => response.json())
      .then((res) => {
        console.log("data", res);
        this.setState({ rowData: res.lstdata });
        this.setState({ mixerData: res.mixlst });
        this.setState({ extruderData: res.extlst });
      });
  }
  onFilterTextBoxChanged = () => {
    this.state.gridOptions.api.getQuickFilterText(
      document.getElementById("filter-text-box").value
    );
  };
  onRefreshData = () => {
    this.setState({
      rowData: this.res.lstdata,
    });
  };
  createRowData = () => {
    var rowData = [];
    for (var i = 0; i < 100; i++) {
      // create sample row item
      var rowItem = {
        // is is simple
        posordernumber: "11" + Math.floor(Math.random() * 10000),
        // but b, c, d and e are all complex objects
        customercode: {
          name: "32" + Math.floor(Math.random() * 10000),
        },
        orderquantity: {
          name: "cc" + Math.floor(Math.random() * 10000),
        },
      };
      rowData.push(rowItem);
    }
    return rowData;
  };
  render() {
    return (
      <>
        <div className="manualList__Header">
          <div className="manualList__Left">
            <h3>Manual List({this.state.rowData.length})</h3>
            <div>
              <Button variant="link" onClick={this.onRefreshData}>
                <RefreshIcon /> Refresh
              </Button>
            </div>
            <div className="ManualList__Search">
              <SearchIcon />
              <input
                type="text"
                id="filter-text-box"
                value={this.state.value}
                onChange={this.onChange}
                placeholder="Filter..."
              />
            </div>
          </div>
          <div className="manualList__Right">
            <Button variant="light">Reset</Button>
            <Button variant="primary">Schedule</Button>
          </div>
        </div>
        <div className="ag-theme-alpine">
          <AgGridReact
            rowData={this.state.rowData}
            columnDefs={this.state.gridOptions.columnDefs}
            rowSelection="multiple"
          />
        </div>
      </>
    );
  }
}

export default ManualList;
