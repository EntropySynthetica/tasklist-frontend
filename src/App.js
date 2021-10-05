import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
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
    window.location.reload(); // Relaod the site on delete
}

function newTaskviaAPI(data) {
    fetch(`${process.env.REACT_APP_API_URL}/api/newtask`, {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify({
            task_name: data.task_name,
            task_desc: data.task_desc,
        })
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    window.location.reload();
}

function updateTaskviaAPI(data) {
    fetch(`${process.env.REACT_APP_API_URL}/api/task/${data.task_id}`, {
        "method": "PUT",
        "headers": { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Origin": "http://localhost",
        },
        "body": JSON.stringify({
            task_name: data.task_name,
            task_desc: data.task_desc,
            username: "2",
            status_name : "2",
            priority_name : "1",
        })
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    // window.location.reload();
}

function App() {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/task`) // Poll This API Endpoint
            .then(results => results.json())    // Take the results and parse the JSON 
            .then(data => {
                setData(data)  // Take the results of the JSON parse and put them in the data var. 
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

                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    console.log("onRowAdd", newData);
                                    newTaskviaAPI(newData);
                                    resolve();
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    console.log("onRowUpdate", newData);
                                    updateTaskviaAPI(newData);
                                    resolve();
                                }),
                            onRowDelete: (rowData) => 
                                new Promise((resolve) => {
                                    console.log("onRowDelete", rowData);
                                    deleteTaskviaAPI(rowData);
                                    resolve();
                                }),
                        }}

                        actions={[
                            {
                                icon: 'refresh',
                                tooltip: 'Refresh Data',
                                isFreeAction: true,
                                onClick: () => alert("null"),
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
        </div>
    )
}

export default App