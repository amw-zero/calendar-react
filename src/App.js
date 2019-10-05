import React, { useState } from 'react';
import './App.css';
import commands, { makeCalendarShell } from 'calendar-behavior/mod.mjs'

let calendarShell = makeCalendarShell();

function App() {
  const [shell, setShell] = useState(calendarShell);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        
        <label htmlFor="name-input">Enter a name</label>
        <input name="name-input" type="test" value={name} onChange={(event) => {
          setName(event.target.value);
        }}></input>

        <label htmlFor="date-input">Enter a date</label>        
        <input name="date-input" type="text" value={date} onChange={(event) =>
          setDate(event.target.value)
        }></input>

        <button onClick={() => {
          commands.addEvent(shell, name, date);
          setShell(Object.assign({}, shell));
        }}>Create event</button>

        { Object.entries(shell.events).map(([date, events]) => {
          return <span><p>{ date }</p><p>{ name }</p></span>
        })}

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
