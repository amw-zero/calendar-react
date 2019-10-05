import React, { useState } from 'react';
import './App.css';
import { Form, Input, Button, Card } from 'antd';
import commands, { makeCalendarShell } from 'calendar-behavior/mod.mjs'

let calendarShell = makeCalendarShell();
function App() {
  const [shell, setShell] = useState(calendarShell);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  function execute(cmd) {
    cmd();
    setShell(Object.assign({}, shell));
  }

  return (
    <div className="App">
      <Card size="small">
        <Form layout="inline">
          <Form.Item label="Event name">
            <Input name="name-input" type="test" value={name} onChange={(event) => {
              setName(event.target.value);
            }}>
            </Input>              
          </Form.Item>
          <Form.Item label="Event date">
            <Input name="date-input" type="text" value={date} onChange={(event) =>
              setDate(event.target.value)
            }>
            </Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => {
              execute(() => commands.addEvent(shell, name, date));
            }}>
              Create event
            </Button>
          </Form.Item>
        </Form>
      </Card>
      { Object.entries(shell.events).map(([date, events]) => {
        return <span><p>{ date }</p><p>{ name }</p></span>
      })}
    </div>
  );
}

export default App;
