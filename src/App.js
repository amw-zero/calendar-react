import React, { useState } from 'react';
import './App.css';
import { Row, Empty, Form, Input, Button, Card, DatePicker } from 'antd';
import commands, { makeCalendarShell, makeServer } from 'calendar-behavior/mod.mjs'

let server = makeServer({
  async addEvent(name, date) {
    return fetch("/events", { 
      method: "POST", 
      body: JSON.stringify({ name, date }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});

let calendarShell = makeCalendarShell(server);

function App() {
  const [shell, setShell] = useState(calendarShell);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  async function execute(cmd) {
    await cmd();
    setShell(Object.assign({}, shell));
  }

  return (
    <div className="App">
      <Row>
        <Card size="small">
          <Form layout="inline">
            <Form.Item label="Event name">
              <Input name="name-input" type="test" value={name} onChange={(event) => {
                setName(event.target.value);
              }}>
              </Input>              
            </Form.Item>
            <Form.Item label="Event date">
              <DatePicker onChange={(date, dateString) => {
                setDate(dateString)              
              }}>
              </DatePicker>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => {
                execute(() => commands.addEvent(shell, name, date));
              }}>
                Add event
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>

      { Object.keys(shell.events).length > 0 ? null : <Empty description="Add events"></Empty> }

      <Row>
        { Object.entries(shell.events).map(([date, events]) => {
          return <Card title={date} size="small">
              { events.map(e => <p>{e.name}</p>)}
            </Card>
        })}
      </Row>                

    </div>
  );
}

export default App;
