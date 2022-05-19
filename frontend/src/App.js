import { useState } from "react";
import './App.css';

function App() {

  const [mailerState, setMailerState] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    reference: "",
    amount_due: "",
    invoice_date: "",
    due_date: "",
    item: "",
    quantity: "",
    price: "",
    total_price: "",
  });

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.address]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.reference]: e.target.value,
      [e.target.amount_due]: e.target.value,
      [e.target.invoice_date]: e.target.value,
      [e.target.due_date]: e.target.value,
      [e.target.item]: e.target.value,
      [e.target.quantity]: e.target.value,
      [e.target.price]: e.target.value,
      [e.target.total_price]: e.target.value,
    }));
  }

  const submitEmail = async (e) => {
    e.preventDefault();
    console.log({ mailerState });
    const response = await fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mailerState }),
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
      .then(() => {
        setMailerState({
          email: "",
          name: "",
          message: "",
        });
      });
  };

  return (
    <div className="App">
      <div className="container">
        <form style={{ height: "100vh", justifyContent: "center", alignItems: "center", }} onSubmit={submitEmail}>
          <div className="col-sm-12">
            <div>
              <h2>Bill To:</h2>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Customer:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Customer Name" onChange={handleStateChange} name="name" value={mailerState.name} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Address:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Address" onChange={handleStateChange} name="address" value={mailerState.address} />
                  </div>
                </div>
              </div>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Phone:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Phone" onChange={handleStateChange} name="phone" value={mailerState.phone} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Email:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Email" onChange={handleStateChange} name="email" value={mailerState.email} />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <h2>Invoice:</h2>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Invoice Number:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Invoice Number" onChange={handleStateChange} name="reference" value={mailerState.reference} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Amount Due:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Amount Due" onChange={handleStateChange} name="amount_due" value={mailerState.amount_due} />
                  </div>
                </div>
              </div>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Invoice Date:</label>
                    <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Invoice Date" onChange={handleStateChange} name="invoice_date" value={mailerState.invoice_date} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Payment Due:</label>
                    <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Customer Name" onChange={handleStateChange} name="due_date" value={mailerState.due_date} />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <h2>Invoice Details:</h2>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Item:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Item" onChange={handleStateChange} name="item" value={mailerState.item} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Quantity:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Quantity" onChange={handleStateChange} name="quantity" value={mailerState.quantity} />
                  </div>
                </div>
              </div>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Price:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Price" onChange={handleStateChange} name="price" value={mailerState.price} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Total:</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Total Price" onChange={handleStateChange} name="total_price" value={mailerState.total_price} />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <button>Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
