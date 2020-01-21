import React, { useState, useEffect } from 'react';
// import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data.devs);
      setLoading(false);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    setLoading(true);
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data.dev]);
    // setTimeout(setDevs([...devs, response.data.dev]), 20000);
    setLoading(false);
  }

  function handleDeleteDev(dev) {
    setLoading(true);
    setTimeout(console.log("esperando..."), 20000);
    console.log(`> id dev to del: ${dev._id}`);
    // const response = await api.delete(`/devs/${dev._id}`);
    // console.log(response);
    setDevs(devs.filter( d => d._id !== dev._id));
    setLoading(false);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {loading ? (<SyncLoader size={"10px"} color={"#7d40e7"}></SyncLoader>) : (devs.map(dev => (
            <DevItem key={dev._id} dev={dev} handleDeleteDev={handleDeleteDev}/>
          )))}
        </ul>
      </main>
    </div>
  );
}

export default App;
