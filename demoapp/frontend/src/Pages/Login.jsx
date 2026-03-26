import React,{useState} from 'react'

function Login(props) {
  //declear THE  state variable
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  //write a function handler
  async function handleSubmit(event) {
    //prevent the default behaveiour
    event.preventDefault();
    //prepare the data to be sent to the server
    const data = {
     
      email: emailAddress,
      password: password,
    };
    //  send the data to the server
    try {
      const response = await fetch("http://localhost:4000/login", {
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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

export default Login