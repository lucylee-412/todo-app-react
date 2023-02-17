import React, { useState } from 'react';
import { Button } from '@mui/material';

import AddTask from './AddTask';
import Tasks from './Tasks';

const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          marginRight: '16px'
        }}
        onClick={handleOpen}
      >
        ADD TASK      
      </Button>
      <AddTask 
        open={open}
        handleClose={handleClose}
      />
      <Tasks />
    </>
  );
}

export default App;
