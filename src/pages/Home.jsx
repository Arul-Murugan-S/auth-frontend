import React, {useEffect, useState} from 'react'
import { Container, Button } from 'react-bootstrap'
import axios from 'axios';
import API_URL from '../../config/global';

// import "../styles/Home.css";

const Home = () => {
  const [resp, setResp] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token) {
      getData(user.token);
    }
  }, []);

  const getData = async (token) => {
    try {
      const configuration = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(`${API_URL}/home`, configuration);
  
      if (response.data === "Invalid Token") {
        alert("Login again");
      } else if (response.data === "Server Busy!") {
        alert("Verify your email id!");
      } else if (response?.status) {
        setResp(response.data);             // (response.status === 200 && response.data.name)
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
        <h1> Welcome to the Website</h1>
        <h3>Hello {resp.name}!</h3>
        <p>Click below to know more...</p>
        <Button variant='primary' type='submit'>Get Started</Button>
    </Container>
  )
}

export default Home