import React,{useState} from 'react'

function AddEmploye(props) {
  //declear THE  state variable
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  //write a function handler
  async function handleSubmit(event) {
    //prevent the default behaveiour
    event.preventDefault();
    //prepare the data to be sent to the server
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      password: password,
    };
    //  send the data to the server
    try {
      const response = await fetch("http://localhost:4000/add-employe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

 
  return (
    <div>
      <h1>Add employee</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First name:</label>
        <br />
        <input
          type="text"
          id="fname"
          name="fname"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <br />

        <label htmlFor="lname">Last name:</label>
        <br />
        <input
          type="text"
          id="lname"
          name="lname"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <br />

        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
        />
        <br />

        <label htmlFor="password">password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        <input type="Submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddEmploye