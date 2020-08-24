import "./styles.css";
import React, { useState, useEffect } from "react";

import api from './services/api'


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },
  []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'https://github.com/rocketseat-education',
      techs: ['Node.js', 'ReactJS']
    });

    const project = response.data;
    setRepositories([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repsitory => (
          <li key={repsitory.id}>
            {repsitory.title}

            <button onClick={() => handleRemoveRepository(repsitory.id)}>
              Remover
            </button>
          </li>
        ) )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
