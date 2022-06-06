import { useState } from "react";
import './App.css';
import axios from 'axios';
import { DialogActions, TextField, Button, Dialog, DialogContent, CircularProgress, Grid, Input } from '@mui/material'

function App() {

  const [userInput, setUser] = useState({
    customer_email: '',
    customer_name: '',
    reference: ''
})
const [file, setFile] = useState(null);

const onInputChange = (e) => {
    e.persist();
    setUser({ ...userInput, [e.target.name]:e.target.value });
    setFile(e.target.files[0])
}

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('file', file)
    data.append('customer_email', userInput.customer_email);
    data.append('customer_names', userInput.customer_names);
    data.append('reference', userInput.reference);

    axios.post('http://localhost:3001/send', data)
            .then((e) => { console.log('Success!') })
            .catch((e) => { console.log('Error!') })
}

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center' }}>Node Mailer</h2>
          <br />
          <div className="container col-8">
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <TextField label="Customer Email" name="customer_email" size="small" required onChange={onInputChange} type="email" value={userInput.customer_email} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <TextField label="Customer Name" name="customer_names" size="small" required onChange={onInputChange} type="text" value={userInput.customer_names} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <TextField label="Reference" name="reference" size="small" required onChange={onInputChange} type="text" value={userInput.reference} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <TextField  name="invoice_date" size="small" required onChange={onInputChange} type="date" variant="outlined" />
                </Grid>
              </Grid>
              <br />
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Input  label="Invoice" size="small" required  onChange={onInputChange} type="file"  variant="outlined" />
              </Grid>
            </DialogContent>
            <DialogActions>
              <div >
                <Button type="submit" variant="contained" color="primary" size="small">Submit</Button>
              </div>
            </DialogActions>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
