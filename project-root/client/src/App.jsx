import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.join())
      .then(setData);
  }, []);

  return (
    <div>
      <h1>Data from Flask:</h1>
        <ul>{data.map(([id, name]) => <li key={id}>{name}</li>)}</ul>
    </div>
  );
}

export default App
