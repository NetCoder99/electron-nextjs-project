import React from "react";
import { useEffect, useState } from "react";
import Form    from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Datetime from 'react-datetime';
import Select from 'react-select';


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


function ClassDetailsCard({handleReturnClick}) {
  const [classFields, setClassFields] = useState({
    className: "",
    styleNum: "",
    styleName: "",
    dayOfWeekNum: "",
    dayOfWeekName: "",
    startTime: "5:00 PM",
    classDuration: "",
    allowedRanks: [],
    allowedAges: {},
  });

  const handleRankChange = (selectedOptions) => {
    console.log(`handleRankChange: ${selectedOptions} `);    
    //setSelectedFlavors(selectedOptions);
  };

  // -------------------------------------------------------------------------------
  return (
    <div className="row d-flex justify-content-center small">
      <div
        id="frmCreate"
        className="row w-100 d-flex justify-content-center mainForm"
      >
        <h1 className="text-center">Class / Schedule Maintnenance</h1>
        <hr />
          <form className="p-2 w-75" action="/submit-data" method="POST">

          <div className="form-group row">
            <div className="mb-2">
              <a href="#" style={{display: "inline-block"}}
                onClick={(e) => handleReturnClick()}
                className="fw-bold" >Back to search</a>
            </div>
            <label for="staticClassName" class="col-sm-3 col-form-label">
              Class Name
            </label>
            <div class="col-sm-8">
            <Form.Control
                placeholder="Class name"
                defaultValue={classFields.className}
                className={`d-inline-block float-left`}
                size="sm"
              />              
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="inputStyleNum" class="col-sm-3 col-form-label">
              Style Name
            </label>
            <div class="col-sm-6">
            <Form.Select aria-label="Default select example">
              <option value="1">Okinawan Shorin-Ryu</option>
              <option value="2">Chanbara</option>
              <option value="3">Batto-Do Koshiden Ken Ryu</option>
            </Form.Select>
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="inputStyleNum" class="col-sm-3 col-form-label">
              Day of week
            </label>
            <div class="col-sm-6">
            <Form.Select aria-label="Default select example">
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </Form.Select>              
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="inputStartTime" class="col-sm-3 col-form-label">
              Start Time
            </label>
            <div class="col-sm-6">
            <Form.Control
                placeholder="HH:MM AM/PM"
                defaultValue={classFields.startTime}
                className={`d-inline-block float-left`}
                size="sm"
              />                
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="inputClassDuration" class="col-sm-3 col-form-label">
              Class duration (Mins)
            </label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                id="inputClassDuration"
                value="50"
              />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="inputClassDuration" class="col-sm-3 col-form-label">
              Allowed ranks
            </label>
            <div class="col-sm-6">
            <Form.Check
              inline
              type={'checkbox'}
              id={`white`}
              label={`White`}
            />
            <Form.Check
              inline
              type={'checkbox'}
              id={`Orange`}
              label={`Orange`}
            />
            <Form.Check
              inline
              type={'checkbox'}
              id={`Yellow`}
              label={`Yellow`}
            />
            <Form.Check
              inline
              type={'checkbox'}
              id={`Blue`}
              label={`Blue`}
            />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="inputClassDuration" class="col-sm-3 col-form-label">
              Allowed Ages
            </label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                id="inputClassDuration"
                value="50"
              />
            </div>
          </div>

          <div class="mt-4 ms-4">
            <input
              class="btn btn-primary"
              type="save"
              value="Save Class Schedule"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClassDetailsCard;
