import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  React.useEffect(async () => {
    try {
        await axios.get("http://localhost:3000/tasks/")
            .then((response) => {
                console.log(response.data)
                setTasks(response.data)
                console.log("Tasks", tasks);
            });
    } catch (error) {
        console.log(error);
    }
  }, [setTasks]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Tasks', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'priority', headerName: 'Priority', width: 130 },
  ];
  
  const rows = [];

  tasks.map(task => {
    rows.push({
      id: task.id,
      description: task.description,
      status: task.status,
      priority: task.priority
    })
    console.log(rows);
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}