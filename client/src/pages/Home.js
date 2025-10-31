import React, { useEffect, useState } from 'react';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/home')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Smart Fridge — Home</h1>
      {loading && <p>Loading from server...</p>}
      {error && (
        <p style={{ color: 'crimson' }}>Error fetching server data: {error}</p>
      )}
      {data && (
        <div>
          <p>{data.message}</p>
          <small>Server time: {data.time}</small>
        </div>
      )}
    </div>
  );
}

export default Home;
