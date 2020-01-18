import React, { useState, useEffect } from 'react';
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
    const response = await api.post('/devs', data);

    setLoading(true);
    setDevs([...devs, response.data.dev]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {loading ? (<p>Loading...</p>) : (devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          )))}
        </ul>
      </main>
    </div>
  );
}

export default App;
