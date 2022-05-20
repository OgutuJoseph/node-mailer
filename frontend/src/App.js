import { useState } from "react";
import './App.css';
import { Formik } from 'formik';
import { DialogActions, FormControl, MenuItem, Box, Select, InputLabel, TextField, Button, Dialog, DialogContent, CircularProgress, Grid } from '@mui/material'

function App() {

  //handle invoice data objects
  const [invoiceData, setInvoiceData] = useState([{ ledger_id: '', price: '', quantity: '', total_price: '' }])
  const handleInvoiceData = (i, e) => {
    const newInvoiceData = [...invoiceData];
    if (e.target.name === 'item') {
      newInvoiceData[i][e.target.name] = (e.target.value);
    } else { newInvoiceData[i][e.target.name] = e.target.value; }
    // newInvoiceData[i].credit_account_id = creditAccount;
    setInvoiceData(newInvoiceData);
  }

  const addFormFields = () => {
    setInvoiceData([...invoiceData, { ledger_id: '', price: '', quantity: '', total_price: '' }])
  }

  const removeFormFields = (i) => {
    const newInvoiceData = [...invoiceData];
    newInvoiceData.splice(i, 1);
    setInvoiceData(newInvoiceData)
  }

  return (
    <div className="App">
      <div className="container">
        <Formik
          initialValues={{
            reference: '',
            customer_name: '',
            customer_email: '',
            description: '',
            invoice_date: '',
          }}
          onSubmit={async values => {
            values = {
              ...values,
              invoiceData: invoiceData
            };
            console.log('values: ', values); 
            const response = await fetch("http://localhost:3001/send", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ values }),
            })
            .then((res) => res.json())
            .then(async (res) => {
                const resData = await res;
                console.log(resData);
                if (resData.status === "success") {
                alert("Message Sent");
                } else if (resData.status === "fail") {
                alert("Message failed to send");
                }
            })
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <br /><br />
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <TextField error={Boolean(touched.reference && errors.reference)} fullWidth helperText={touched.reference && errors.reference} label="Reference" name="reference" size="small" required onBlur={handleBlur} onChange={handleChange} type="text" value={values.reference} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <TextField error={Boolean(touched.customer_name && errors.customer_name)} fullWidth helperText={touched.customer_name && errors.customer_name} label="Customer Name" name="customer_name" size="small" required onBlur={handleBlur} onChange={handleChange} type="text" value={values.customer_name} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <TextField error={Boolean(touched.customer_email && errors.customer_email)} fullWidth helperText={touched.customer_email && errors.customer_email} label="Customer Email" name="customer_email" size="small" required onBlur={handleBlur} onChange={handleChange} type="email" value={values.customer_email} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <TextField error={Boolean(touched.invoice_date && errors.invoice_date)} fullWidth helperText={touched.invoice_date && errors.invoice_date} name="invoice_date" size="small" required onBlur={handleBlur} onChange={handleChange} type="date" value={values.invoice_date} variant="outlined" />
                  </Grid>
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField error={Boolean(touched.description && errors.description)} fullWidth helperText={touched.description && errors.description} label="Description" name="description" size="small" required onBlur={handleBlur} onChange={handleChange} type="text" value={values.description} variant="outlined" />
                </Grid>
              </DialogContent>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    {invoiceData.map((invoice, index) => (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={index}>
                        <TextField fullWidth label="Item" name="ledger_id" size="small" required onBlur={handleBlur} onChange={e => handleInvoiceData(index, e)} type="number" value={invoice.ledger_id || ''} variant="outlined" />
                        <TextField fullWidth label="Price" name="price" size="small" required onBlur={handleBlur} onChange={e => handleInvoiceData(index, e)} type="number" value={invoice.price || ''} variant="outlined" />
                        <TextField fullWidth label="Quantity" name="quantity" size="small" required onBlur={handleBlur} onChange={e => handleInvoiceData(index, e)} type="number" value={invoice.quantity || ''} variant="outlined" />
                        <TextField fullWidth label="Total Price" name="total_price" size="small" required onBlur={handleBlur} onChange={e => handleInvoiceData(index, e)} type="number" value={invoice.total_price || ''} variant="outlined" />
                        {
                          index ?
                            <Box>
                              <Button type="button" variant="contained" color="primary" size="small" onClick={() => removeFormFields(index)}>Remove Item</Button>
                            </Box>
                            : null
                        }
                        <hr />
                      </Grid>
                    ))}
                    <div >
                      <Button type="button" variant="contained" color="primary" size="small" onClick={() => addFormFields()}>Add Item</Button>
                    </div>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <div >
                  <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" size="small">Submit</Button>
                </div>
              </DialogActions>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
