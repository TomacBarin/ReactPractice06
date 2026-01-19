import { useState } from "react";

export default function App() {
  // Första state
  // Count är värdet, setCount är funktionen för att ändra ävrdet
  // useSatet(0) betyder att vi börjar med värdet 0

  const [count, setCount] = useState(0);


  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>My Dynamic Counter</h1>
      <p>Nuvarande värde: {count}</p>

      <button
      onClick={() => setCount(count + 1)}
      style={{ 
          padding: '0.8rem 1.5rem',
          fontSize: '1.1rem',
          marginRight: '1rem'
        }}
      >Öka</button>

      <button 
        onClick={() => setCount(count - 1)}
        style={{ 
          padding: '0.8rem 1.5rem',
          fontSize: '1.1rem'
        }}
      >
        Minska
      </button>
    
    </div>
  )
}