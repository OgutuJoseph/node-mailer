import { useState } from "react";
import './App.css';

function App() {

  const [mailerState, setMailerState] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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
      <form style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", }} onSubmit={submitEmail}>
        <fieldset style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "50%", }}>
          <legend>React NodeMailer Contact Form</legend>
          <input placeholder="Name" onChange={handleStateChange} name="name" value={mailerState.name} />
          <input placeholder="Email" onChange={handleStateChange} name="email" value={mailerState.email} />
          <textarea placeholder="Message" onChange={handleStateChange} name="message" value={mailerState.message} />
          <button>Send Message</button>
        </fieldset>
    </form>
    </div>
  );
}

export default App;