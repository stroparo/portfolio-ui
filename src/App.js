import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const repositoriesResource = 'repositories';

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get(repositoriesResource).then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post(repositoriesResource, {
      title: `New repository ${Date.now()}`
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const index = repositories.findIndex(repo => repo.id === id);
    if (index < 0) return;

    const response = await api.delete(`${repositoriesResource}/${id}`);
    if (response.status === 204) {
      setRepositories([...(repositories.slice(0, index)), ...(repositories.slice(index + 1))]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <>
            <li key={repository.id}>{repository.title}</li>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
