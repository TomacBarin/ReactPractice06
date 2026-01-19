import { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Todos laddas från localStorage om det finns, annars tom array
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState('');

  // Spara todos till localStorage varje gång todos ändras
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Beroende-array: körs när todos ändras

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos(prev => [...prev, todo]);
    setNewTodo('');
  };

  const deleteTodo = (idToDelete) => {
    setTodos(prev => prev.filter(todo => todo.id !== idToDelete));
  };

  // NYTT: Toggle completed-status för en todo
  const toggleComplete = (idToToggle) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === idToToggle
          ? { ...todo, completed: !todo.completed } // immutable update av objekt
          : todo
      )
    );
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Dynamic Counter & Todo</h1>
      
      {/* Räknare */}
      <p>Nuvarande värde: {count}</p>
      <button onClick={() => setCount(p => p + 1)} style={{ padding: '0.8rem 1.5rem', marginRight: '1rem' }}>
        Öka
      </button>
      <button onClick={() => setCount(p => p - 1)} style={{ padding: '0.8rem 1.5rem' }}>
        Minska
      </button>

      {/* Demo-text */}
      <div style={{ margin: '2rem 0' }}>
        <label htmlFor="textInput">Skriv något (demo):</label>
        <input
          id="textInput"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ padding: '0.5rem', marginLeft: '1rem', fontSize: '1rem' }}
        />
        <p>Du skrev: {text}</p>
      </div>

      {/* Todo-sektion */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Todo Lista</h2>
        
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="Lägg till ny todo..."
            style={{ flex: 1, padding: '0.6rem', fontSize: '1rem' }}
            onKeyDown={e => { if (e.key === 'Enter') addTodo(); }}
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

        {todos.length === 0 ? (
          <p style={{ color: '#777' }}>Inga todos än... lägg till något!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map(todo => (
              <li
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.8rem',
                  margin: '0.5rem 0',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : 'black',
                  opacity: todo.completed ? 0.7 : 1
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    style={{ marginRight: '1rem', width: '1.2rem', height: '1.2rem' }}
                  />
                  <span>{todo.text}</span>
                </div>
                
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