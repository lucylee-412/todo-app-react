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
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [task, setTask] = useState({
    description: description,
    status: "in-progress",
    priority: priority
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

  // POST request on form submission
  const onSubmit = async (e) => {
    await axios.post('http://localhost:3000/tasks', task)
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
                  label="Description"
                  name="description"
                  onChange={e => {
                    setDescription(e.target.value);
                    console.log(task);
                    setTask(prevState => {
                      return {...task, [e.target.name]: e.target.value}
                    })
                  }}
                />
                
                <br /><br />

                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Priority
                  </InputLabel>
                  <NativeSelect
                    defaultValue={'medium'}
                    inputProps={{
                      name: 'priority',
                      id: 'uncontrolled-native',
                    }}
                    onChange={e => {
                      setPriority(e.target.value);
                      setTask(prevState => {
                        return {...task, [e.target.name]: e.target.value}
                      })
                    }}
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
              form="taskForm"
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