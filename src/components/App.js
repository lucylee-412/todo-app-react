import React, { useState } from 'react';
import { Button } from '@mui/material';

import AddTask from './AddTask';

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
        ADD BRAND          
      </Button>
      <AddTask 
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}

export default App;
