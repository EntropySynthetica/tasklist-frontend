import React, {useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/task`) // Poll This API Endpoint
      .then(results => results.json())    // Take the results and parse the JSON 
      .then(data => {setData(data)  // Take teh results of the JSON parse and put them in the data var. 
                    console.log(data)  // Output data to console for debugging 
      })

  }, [])

  return (
    <div>
      <ul>
      {(typeof data === 'undefined') ? (<p>Loading...</p>) :   // Display Loading... until the API can grab data. 
        (
          data.map((task, i) => <li key={i}>{task.task_name} / {task.task_desc} / {task.status_name} / </li>)
        )}
      </ul>
    </div>
  )
}

export default App