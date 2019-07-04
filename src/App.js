import React, { useState, useEffect } from 'react';

export default function App() {

  const [repositories, setRepositories] = useState([]);

  // substitui o component didMount 
  // carregando os repositorios assim 
  // que abre a pagina
  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/vanessasoutoc/repos')
    const data = await response.json();
    
    setRepositories(data);
  }, [])

  function handleFavorite(id) {
    const newRepository = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    })

    setRepositories(newRepository)
  }

  return (
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      ))}
    </ul>
  );
}