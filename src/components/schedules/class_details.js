import React from "react";
import { useEffect, useState, useRef} from "react";
import Form    from "react-bootstrap/Form";
import Button  from "react-bootstrap/Button";
import { isStartTimeValid, calcClassEndTime } from "./class_validate";

function ClassDetailsCard({editMode, handleReturnClick}) {

  const frmClassNameRef   = useRef(null);  
  const frmClassStartTimeRef = useRef(null);  
  const whiteCheckBoxRef  = useRef(null);
  const orangeCheckBoxRef = useRef(null);
  const yellowCheckBoxRef = useRef(null);
  const blueCheckBoxRef   = useRef(null);
  const greenCheckBoxRef  = useRef(null);
  const purpleCheckBoxRef = useRef(null);
  const brownCheckBoxRef  = useRef(null);
  const blackCheckBoxRef  = useRef(null);
  
  const allowedAgesRef  = useRef(null);
  const allowedAgesLowerRef  = useRef(null);
  const allowedAgesUpperRef  = useRef(null);


  const [classFields, setClassFields] = useState({
    className: "",
    styleNum: "",
    styleName: "",
    dayOfWeekNum: "",
    dayOfWeekName: "",
    startTime: "",
    classDuration: "50",
    allowedRanks: [],
    allowedAges: {},
    saveMessage: "Awaiting Input"
  });

  // -------------------------------------------------------------------------------
  useEffect(() => {
    console.log(`class_details:useEffect :: ${JSON.stringify(editMode)}`);
    const tmpClassFields = { ...classFields };
    tmpClassFields['dayOfWeekNum'] = editMode.dayOfWeek;
    setClassFields(tmpClassFields);
  }, []);  

  const handleSaveClick = async () => {
    //console.log(`handleSaveClick: ${JSON.stringify(studentFields)}`);
    const saveResponse = await window.electronAPI.invokeMain(
      "handleSaveClassDetails",
      classFields
    );
    console.log(`handleSaveClick saveResponse: ${JSON.stringify(saveResponse)}`);
    setClassFields(saveResponse);
    // if (saveResponse.focusField) {
    //   inputRefs.current[saveResponse.focusField].focus();
    // }
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const handleClassNameBlur = (event) => {
    console.log(`handleClassNameBlur: ${event.target.id} : ${event.target.value}: ${frmClassNameRef.current.isInvalid}`);
    const tmpClassFields = { ...classFields };
    tmpClassFields[event.target.id] = event.target.value;
    setClassFields(tmpClassFields);    
    if (event.target.value === null || event.target.value === "") {
      frmClassNameRef.current.className += ' invalid';
    }
    else {
      frmClassNameRef.current.className = frmClassNameRef.current.className.replace(' invalid', '');
    }
  };
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const handleStyleNameChange = (event) => {
    console.log(`handleStyleNameChange: ${event.target.id} : ${event.target.value}`);
    const tmpClassFields = { ...classFields };
    tmpClassFields[event.target.id] = event.target.value;
    setClassFields(tmpClassFields);    
  };
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const handleRankAllowedChange = (event) => {
    console.log(`handleRankChange: ${event.target.id} : ${event.target.checked} `);
    if (event.target.id === "all") {
      setAllRankCheckBoxes(event.target.checked);
    }
    const rankArray = gatherBeltRanks();
    console.log(`handleRankChange: rankArray : ${JSON.stringify(rankArray)}`);
    const tmpClassFields = { ...classFields };
    tmpClassFields['allowedRanks'] = rankArray;
    setClassFields(tmpClassFields);    
  };
  function gatherBeltRanks() {
    let rankArray = [];
    if (whiteCheckBoxRef.current.checked)  {rankArray.push(1);}
    if (orangeCheckBoxRef.current.checked) {rankArray.push(2);}
    if (yellowCheckBoxRef.current.checked) {rankArray.push(3);}
    if (blueCheckBoxRef.current.checked)   {rankArray.push(4);}
    if (greenCheckBoxRef.current.checked)  {rankArray.push(5);}
    if (purpleCheckBoxRef.current.checked) {rankArray.push(6);}
    if (brownCheckBoxRef.current.checked)  {rankArray.push(7);}
    if (blackCheckBoxRef.current.checked)  {rankArray.push(8);}
    return rankArray;
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const handleClassStartTimeBlur = (event) => {
    console.log(`handleClassStartTimeBlur: ${event.target.id} : ${event.target.value}: ${frmClassStartTimeRef.current.isInvalid}`);
    const startTimeValid = isStartTimeValid(event.target.value);
    console.log(`handleClassStartTimeBlur:startTimeValid: ${JSON.stringify(startTimeValid)}`);
    const tmpClassFields = { ...classFields };
    tmpClassFields[event.target.id] = event.target.value;
    setClassFields(tmpClassFields);    
    if (startTimeValid['status']) {
      frmClassStartTimeRef.current.className = frmClassStartTimeRef.current.className.replace(' invalid', '');
    }
    else {
      frmClassStartTimeRef.current.className += ' invalid';
    }
  };
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const handleClassDurationBlur = (event) => {
    console.log(`handleClassDurationBlur: ${event.target.id} : ${event.target.value}: ${frmClassStartTimeRef.current.isInvalid}`);
    const tmpClassFields = { ...classFields };
    tmpClassFields[event.target.id] = event.target.value;
    setClassFields(tmpClassFields);    
    const classEndtime = calcClassEndTime(classFields.startTime, classFields.classDuration);
  };
  // const handleClassDurationKeyDown = (event) => {
  //   console.log(`handleClassDurationKeyDown: ${event.target.id} : ${event.target.value}: ${frmClassStartTimeRef.current.isInvalid}`);
  //   //event
  //   const tmpClassFields = { ...classFields };
  //   tmpClassFields[event.target.id] = event.target.value;
  //   setClassFields(tmpClassFields);    
  // };

  

  const handleAllowedAgesAnyChange = (event) => {
    console.log(`handleAllowedAgesAnyChange: ${event.target.id} : ${event.target.checked}`);
  };

  function capsAllWords(sentence) {
    const sentenceProper = sentence 
      .split(" ") 
      .map(([ firstLetter, ...otherLetters ]) => `${firstLetter.toUpperCase()}${otherLetters.join("")}`)
      .join(" ");
    return sentenceProper;
  }

  function setAllRankCheckBoxes(checked) {
    whiteCheckBoxRef.current.checked  = checked;
    orangeCheckBoxRef.current.checked = checked;
    yellowCheckBoxRef.current.checked = checked;
    blueCheckBoxRef.current.checked   = checked;
    greenCheckBoxRef.current.checked  = checked;
    purpleCheckBoxRef.current.checked  = checked;
    brownCheckBoxRef.current.checked  = checked;
    blackCheckBoxRef.current.checked  = checked;
  }


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
            <label class="col-sm-3 col-form-label">
              Class Name
            </label>
            <div class="col-sm-6">
            <Form.Control
                id="className"
                ref={frmClassNameRef}
                placeholder="Class name"
                defaultValue={classFields.className}
                className={`d-inline-block float-left`}
                size="sm"
                onBlur={(e) => handleClassNameBlur(e)}
              />              
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="inputStyleNum" class="col-sm-3 col-form-label">
              Style Name
            </label>
            <div class="col-sm-6">
            <Form.Select 
              aria-label="Default select example" 
              id="styleNum"
              onChange={(e) => handleStyleNameChange(e)}
              defaultValue={'1'}
            >
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
            <Form.Select 
              aria-label="Default select example"
              value={classFields.dayOfWeekNum}
              disabled={true}>
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
                id="startTime"
                ref={frmClassStartTimeRef}
                placeholder="HH:MM AM/PM"
                className={`d-inline-block float-left`}
                size="sm"
                onBlur={(e) => handleClassStartTimeBlur(e)}
              />                
            </div>
          </div>

          <div class="form-group row mt-2">
            <label class="col-sm-3 col-form-label">
              Class duration (Mins)
            </label>
            <div class="col-sm-1">
              <Form.Control
                id="classDuration"
                placeholder="50"
                defaultValue={classFields.classDuration}
                className={`d-inline-block float-left`}
                size="sm"
                type="text"
                onBlur={(e) => handleClassDurationBlur(e)}
                maxLength="3"
              />       
            </div>
            <label class="col-sm-3 col-form-label">
                Minutes
              </label>
          </div>

          <div class="form-group row mt-2">
            <label for="inputClassDuration" class="col-sm-3 col-form-label">
              Allowed ranks
            </label>
            <div class="col-sm-6">
            <Form.Check
              style={{width: "5rem"}}
              inline
              type={'checkbox'}
              id={`white`}
              label={`White`}
              onChange={(e) => handleRankAllowedChange(e)}
              ref={whiteCheckBoxRef}
            />
            <Form.Check
              style={{width: "5rem"}}
              inline
              type={'checkbox'}
              id={`Orange`}
              label={`Orange`}
              onChange={(e) => handleRankAllowedChange(e)}
              ref={orangeCheckBoxRef}
            />
            <Form.Check
              style={{width: "5rem"}}
              inline
              type={'checkbox'}
              id={`Yellow`}
              label={`Yellow`}
              onChange={(e) => handleRankAllowedChange(e)}
              ref={yellowCheckBoxRef}
            />
            <Form.Check
              style={{width: "5rem"}}
              inline
              type={'checkbox'}
              id={`Blue`}
              label={`Blue`}
              onChange={(e) => handleRankAllowedChange(e)}
              ref={blueCheckBoxRef}
            />
            <Form.Check
              style={{width: "5rem"}}
              inline
              type={'checkbox'}
              id={`green`}
              label={`Green`}
              onChange={(e) => handleRankAllowedChange(e)}
              ref={greenCheckBoxRef}
            />
            <Form.Check
              style={{width: "5rem"}}
              inline
              type={'checkbox'}
              id={`purple`}
              label={`Purple`}
              onChange={(e) => handleRankAllowedChange(e)}
              ref={purpleCheckBoxRef}
            />
            <Form.Check
              style={{width: "5rem"}}
              inline
              type={'checkbox'}
              id={`brown`}
              label={`Brown`}
              onChange={(e) => handleRankAllowedChange(e)}
              ref={brownCheckBoxRef}
            />
            <Form.Check
              style={{width: "5rem"}}
              inline
              type={'checkbox'}
              id={`black`}
              label={`Black`}
              onChange={(e) => handleRankAllowedChange(e)}
              ref={blackCheckBoxRef}
            />
            <Form.Check
              style={{width: "5rem"}}
              inline
              type={'checkbox'}
              id={`all`}
              label={`All`}
              onChange={(e) => handleRankAllowedChange(e)}
            />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="inputClassDuration" class="col-sm-3 col-form-label">
              Allowed Ages
            </label>
            <div class="col-sm-6">
            <Form.Control
                style={{}}
                placeholder="Any age"
                defaultValue={classFields.allowedAges}
                className={`d-inline-block float-left `}
                size="sm"
                type="number"
              />                

              {/* <Form.Check
                style={{width: "4rem"}}
                inline
                type={'checkbox'}
                id={`allowedAgesChk`}
                label={`Any`}
                onChange={(e) => handleAllowedAgesAnyChange(e)}
                ref={blackCheckBoxRef}
              />
              <label for="inputClassDuration" class="col-form-label me-2">
                Min
              </label>
              <Form.Control
                inline
                style={{width: "3rem"}}
                placeholder="4"
                defaultValue={classFields.allowedAges}
                className={`d-inline-block float-left `}
                size="sm"
                type="number"
              />                
              <label for="inputClassDuration" class="col-form-label ms-4 me-2">
                Max
              </label>
              <Form.Control
                inline
                style={{width: "3rem"}}
                placeholder="99"
                defaultValue={classFields.allowedAges}
                className={`d-inline-block float-left`}
                size="sm"
                type="number"
              />                 */}
            </div>
          </div>


  {/* const allowedAgesLowerRef  = useRef(null);
  const allowedAgesUpperRef  = useRef(null); */}

          <div class="mt-4 ms-4">
          <Button
            variant="success"
            className="smaller-input"
            style={{ width: "9rem" }}
            size="sm"
            onClick={(e) => handleSaveClick()}
          >Save Class Schedule
          </Button>            
          <Form.Label
            // {`d-inline-block float-left ${studentFields.middleNameClass}`}
          className={`fw-bold ms-3 h6 ${classFields.saveResult}`}
          >
          {classFields.saveMessage}
          </Form.Label>          
        </div>
        </form>
      </div>
    </div>
  );
}

export default ClassDetailsCard;
