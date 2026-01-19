import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Nytt: Todo-lista som en array av objekt
  const [todos, setTodos] = useState([]);
  
  // Nytt state för inputen som ska bli nya todos
  const [newTodo, setNewTodo] = useState('');

  // Funktion för att lägga till todo
  const addTodo = () => {
    if (newTodo.trim() === '') return; // Ignorera tomma todos
    
    // Skapar ett nytt todo-objekt med id och text
    const todo = {
      id: Date.now(), // Enkel unik id (i verkligheten kan man använda uuid)
      text: newTodo,
      completed: false
    };
    
    // Lägger till i arrayen utan att mutera den gamla (immutable)
    setTodos(prevTodos => [...prevTodos, todo]);
    
    // Rensa input-fältet
    setNewTodo('');
  };

  // Funktion för att ta bort en todo
  const deleteTodo = (idToDelete) => {
    setTodos(prevTodos => 
      prevTodos.filter(todo => todo.id !== idToDelete)
    );
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Dynamic Counter & Todo</h1>
      
      {/* Räknaren – behåll som den är */}
      <p>Nuvarande värde: {count}</p>
      <button 
        onClick={() => setCount(prev => prev + 1)}
        style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem', marginRight: '1rem' }}
      >
        Öka
      </button>
      <button 
        onClick={() => setCount(prev => prev - 1)}
        style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem' }}
      >
        Minska
      </button>

      {/* Den gamla text-inputen – vi behåller den som demo */}
      <div style={{ margin: '2rem 0' }}>
        <label htmlFor="textInput">Skriv något (demo):</label>
        <input 
          id="textInput"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: '0.5rem', marginLeft: '1rem', fontSize: '1rem' }}
        />
        <p>Du skrev: {text}</p>
      </div>

      {/* NYTT: Todo-sektion */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Todo Lista</h2>
        
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <input 
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Lägg till ny todo..."
            style={{ 
              flex: 1, 
              padding: '0.6rem', 
              fontSize: '1rem' 
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTodo();
            }}
          />
          <button 
            onClick={addTodo}
            style={{ 
              padding: '0.6rem 1.2rem', 
              marginLeft: '0.5rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Lägg till
          </button>
        </div>

        {/* Rendera listan */}
        {todos.length === 0 ? (
          <p style={{ color: '#777' }}>Inga todos än... lägg till något!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map((todo) => (
              <li 
                key={todo.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.8rem',
                  margin: '0.5rem 0',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                  color: "black"
                }}
              >
                <span>{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Ta bort
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}