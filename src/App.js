import React, {useState, useEffect} from 'react';
import SimpleModal from "./components/modal";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import "./App.css";

function deleteTaskviaAPI(data) {
  fetch(`${process.env.REACT_APP_API_URL}/api/deletetask/${data.task_id}`, {
    "method": "DELETE",
    "headers": {}
  })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
}


function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/task`) // Poll This API Endpoint
      .then(results => results.json())    // Take the results and parse the JSON 
      .then(data => {setData(data)  // Take the results of the JSON parse and put them in the data var. 
                    console.log(data)  // Output data to console for debugging 
      })

  }, [])

  const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiPaper-root": {
        borderRadius: "15px",
        alignItems: "center",
        width: "100%",
        boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);"
      }
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <div className="App">
        <div className={classes.root}>
          <MaterialTable
            columns={[
              { title: "Name", field: "task_name" },
              { title: "Description", field: "task_desc" },
              { title: "Status", field: "status_name" }
            ]}

            data={data}
            title="Task List"
            icons={{
              Clear: (props) => <DeleteIcon />,
              Search: (props) => <SearchIcon />
            }}

            actions={[
              {
                icon: () => (<SaveIcon fontSize="medium" className="SaveIcon" />),
                tooltip: 'Save Task',
                onClick: (event, rowData) => alert("You saved " + rowData.task_id)
              },
              {
                icon: () => (<DeleteIcon fontSize="medium" className="DeleteIcon"/>),
                tooltip: 'Delete Item',
                onClick: (event, rowData) => deleteTaskviaAPI(rowData),
              },
            ]}

            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "#430fb3",
                color: "#FFF"
              }
            }}
          />
        </div>
      </div>
      <div className="Footer">
        <SimpleModal /> <br />
      </div>
    </div>
  )
}

export default App