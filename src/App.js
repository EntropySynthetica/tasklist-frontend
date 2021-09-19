import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import { Button } from "@material-ui/core";
import "./index.css";

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/task`) // Poll This API Endpoint
      .then(results => results.json())    // Take the results and parse the JSON 
      .then(data => {setData(data)  // Take teh results of the JSON parse and put them in the data var. 
                    console.log(data)  // Output data to console for debugging 
      })

  }, [])

  const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiPaper-root": {
        borderRadius: "15px",
        width: "90%",
        boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);"
      }
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <div class="App">
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
              Search: (props) => <SearchIcon />,
              ResetSearch: (props) => <DeleteIcon />
            }}

            // actions={[
            //   {
            //     icon: () => <SaveIcon />,
            //     tooltip: "Save User",
            //     onClick: (event, rowData) => alert("You saved " + rowData.name)
            //   }
            // ]}

            // components={{
            //   Action: (props) => (
            //     <Button
            //       onClick={(event) => props.action.onClick(event, props.data)}
            //       color="primary"
            //       variant="text"
            //       style={{ textTransform: "none" }}
            //       size="small"
            //     >
            //       Save
            //     </Button>
            //   )
            // }}

            options={{
              headerStyle: {
                backgroundColor: "#01579b",
                color: "#FFF"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App