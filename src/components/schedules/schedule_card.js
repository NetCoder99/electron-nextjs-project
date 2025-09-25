import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button     from 'react-bootstrap/Button';
import Form       from 'react-bootstrap/Form';
import ListGroup  from 'react-bootstrap/ListGroup';
import Card       from 'react-bootstrap/Card';
import { useState, useEffect, useRef } from "react";

function ScheduleListCard(props) {
  const [dailyClasses,    setDailyClasses]    = useState(null)  
  //#dayOfWeekProps, handleAddClassClick
  useEffect(() => {
    console.log(`ScheduleListCard useEffect invoked: ${JSON.stringify(props.dayOfWeekProps)}`);
    const fetchData = async () => {
      console.log(`ScheduleListCard fetching data: ${props.dayOfWeekProps.dayOfWeek}`);
      const response = await window.electronAPI.invokeMain('handleGetClassesByDay', props.dayOfWeekProps);
      response.forEach(classEntry => console.log(`classEntry: ${JSON.stringify(classEntry)}`));
      setDailyClasses(response);
    };
    fetchData();
    return () => {};
  }, [props.dayOfWeekProps]);

  // -------------------------------------------------------------------------------
  return (
    <Card  >
      <Card.Body>
        <ul>
          <li>
            <div>
            </div>
          </li>
        </ul>
        <ListGroup variant="left">
          {dailyClasses && dailyClasses.map((item, index) => (
          <ListGroup.Item className='text-start' key={index}>
              <Form.Label column sm={3}>{item.dayNameDisplay}</Form.Label>
              <Form.Label column sm={4}>{item.classDisplayTime}</Form.Label>
              <Form.Label column sm={5}>{item.className}</Form.Label>
          </ListGroup.Item>
        ))}
        </ListGroup>
        <Button
          className='text-start'
          variant="link" 
          size="sm"
          style={{ fontSize: "14px", padding: "1px" }}
          onClick={(e) => props.handleAddClassClick(props.dayOfWeekProps.dayOfWeek)}>
        Add class
        </Button>
      </Card.Body>
    </Card>

  );
}

export default ScheduleListCard;

