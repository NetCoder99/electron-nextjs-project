import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useRef } from "react";

function ScheduleListCard(scheduleData) {
  const [data,     setData]     = useState(scheduleData);  

  // // -------------------------------------------------------------------------------
  // useEffect(() => {
  //   console.log(`manageClassSchedules useEffect invoked`);
  //   const fetchData = async () => {
  //     console.log(`manageRanks fetching data`);
  //     const response = await window.electronAPI.invokeMain('handleGetClassesByDay');
  //     console.log(`manageRanks fetching response: ${response}`);
  //     setClassesByWeek(response);
  //   };
  //   fetchData();
  //   return () => {};
  // }, []);

  // dayName,
  // classNumByDay,
  // dayNameDisplay,     
  // dayOfWeek, 
  // classStartTime,
  // classFinisTime,
  // classDisplayTime,
  // className

  const buttonStyle = {
    cursor: "pointer",
  };

  // -------------------------------------------------------------------------------
  return (
    <div class="container"> 
      <div className="row">
        <div className="col-md-3">{data.dayNameDisplay}</div>
        <div className="col-md-3">{data.classDisplayTime}</div>
        <div className="col-md-6">{data.className}</div>
      </div>
    </div>
  );
}

export default ScheduleListCard;

