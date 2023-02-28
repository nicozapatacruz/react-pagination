import "./App.css";
import { useState, useEffect } from "react";
const API_URL = "https://api.instantwebtools.net/v1/passenger";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}?page=${page}&size=10`)
      .then((response) => response.json())
      .then((fetchData) => {
        setData(fetchData);
        setIsLoading(false);
      });
  }, [page]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Passengers</h1>
      <div>
        {data.data.map((passenger, i) => {
          return (
            <ul key={i}>
              <li>Passenger Name: {passenger.name}</li>
              <li>Number of trips: {passenger.trips}</li>
            </ul>
          );
        })}
      </div>
      <div>
        <button onClick={() => setPage(1)}>First Page</button>
        <button onClick={() => (page > 1 ? setPage(page - 1) : null)}>Previous Page</button>
        <button onClick={() => (page < 10 ? setPage(page + 1) : null)}>Next Page</button>
        <button onClick={() => setPage(10)}>Last Page</button>
      </div>
    </div>
  );
}

export default App;
