import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Dialog, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function AddTask({ open, handleClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  // ADD Task form fields
  const [task, setTask] = useState({
    description: '',
    status: 'in-progress',
    priority: 'medium'
  })
  const [submitted, setSubmitted] = useState(false);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // Prepare to POST using form input data
  const handleChange = (e) => {
    setTask(prevState => {
        return {...task, [e.target.name]: e.target.value}
    })
}

  // POST request on form submission
  const onSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/tasks', task)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setSubmitted(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle>
        Add New Task To-Do
      </DialogTitle>
      {submitted === false && (
        <>
          <DialogContent>
            <Box>
              <form id="taskForm" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  required
                  label="Task Description"
                  onChange={handleChange}
                />
                
                <br /><br />

                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Priority
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: 'age',
                      id: 'uncontrolled-native',
                    }}
                    onChange={handleChange}
                  >
                    <option value={'low'}>Low</option>
                    <option value={'medium'}>Medium</option>
                    <option value={'high'}>High</option>
                  </NativeSelect>
                </FormControl>
              </form>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ marginTop: '1rem' }}
              size="small"
              form="brandForm"
              type="submit"
              variant="outlined"
              color="primary"
            >
              ADD NEW TO-DO
            </Button>
            <Button
              style={{ marginTop: '1rem', marginRight: '0.5rem' }}
              size="small"
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              CANCEL
            </Button>
          </DialogActions>
        </>
      )}
      {submitted && (
        <>
          <DialogContent>
            <center>
              <h4>Task has been added.</h4>
              <Button
                onClick={() => {
                  setSubmitted(false);
                }}
              >
                ADD ANOTHER TO-DO
              </Button>
            </center>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ marginTop: '1rem', marginRight: '0.5rem' }}
              size="small"
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              CANCEL
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default AddTask;