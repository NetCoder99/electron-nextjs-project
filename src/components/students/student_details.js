import React   from "react";
import { useState, useEffect, useRef } from "react";
import Form    from "react-bootstrap/Form";
import Button  from "react-bootstrap/Button";
import Image   from "react-bootstrap/Image";
import Select  from "react-select";

export default function ManageStudent({ editMode, handleReturnClick, searchData }) {
  console.log(`ManageStudent editMode:   ${JSON.stringify(editMode)}`);
  console.log(`ManageStudent searchData: ${JSON.stringify(searchData)}`);

  const rankOptions = [
    { value: '1', label: 'White Belt'  },
    { value: '2', label: 'Orange Belt' },
    { value: '3', label: 'Yellow Belt' },
    { value: '4', label: 'Blue Belt'   },
    { value: '5', label: 'Green Belt'  },
    { value: '6', label: 'Purple Belt' },
    { value: '7', label: 'Brown Belt'  },
    { value: '8', label: 'Black Belt'  }
  ]  
  // -------------------------------------------------------------------------------
  const inputRefs = useRef({});

  // -------------------------------------------------------------------------------
  const [beltFields,     setBeltFields ]     = useState({ value: '4', label: 'Blue Belt'   });
  const [studentFields,  setStudentFields ]  = useState({});
  const [displayOptions, setDisplayOptions]  = useState({headerMessage: "Student details"});
  const [imageResponse,  setImageResponse ]  = useState({
    status: "",
    message: "Awaiting input...",
    text_style: "h5 text-dark",
    image_src: "/misc_images/RSM_Logo2.jpg",
    image_name: null,
    image_path: null,
    image_string: null,
  });

  // -------------------------------------------------------------------------------
  useEffect(() => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    if (editMode.isCreating) {
      let newDisplayOptions = { ...displayOptions };
      newDisplayOptions.headerMessage = "Creating a new student record.";
      setDisplayOptions(newDisplayOptions);
    } else if (editMode.isEditing) {
      let newDisplayOptions = { ...editMode };
      newDisplayOptions.headerMessage = "Updating a student record.";
      setDisplayOptions(newDisplayOptions);
    }
    setInitialFieldDefs();
  }, []);

  // -------------------------------------------------------------------------------
  async function setInitialFieldDefs() {
    console.log(`setInitialFieldDefs invoked`);
    const passData = {
      'searchFields' : searchData,
      'editMode'     : editMode
    }
    const studentFields = await window.electronAPI.invokeMain(
      "handleStudentSearchClick", passData
    );
    console.log(`studentFieldsDef: ${JSON.stringify(studentFields)}`);
    if (Array.isArray(studentFields)) {
      setStudentFields(studentFields[0]);  
    }
    else {
      setStudentFields(studentFields);
    }
  };

  // -------------------------------------------------------------------------------
  const handleSelectPicture = async (image_src) => {
    console.log(`handleSelectPicture clicked`);
    const response = await window.electronAPI.invokeMain(
      "handleSelectPicture",
      image_src
    );
    const tmpStudentFields = { ...studentFields };
    tmpStudentFields.studentImageName    = response.image_name;
    tmpStudentFields.studentImagePath    = response.image_path;
    tmpStudentFields.studentimageBase64  = response.image_string;
    setStudentFields(tmpStudentFields);
    setImageResponse(response);
  };
  const handleFieldBlur = async (fieldName, value) => {
    console.log(`handleFieldBlur: ${fieldName} :: ${value}`);
    const tmpStudentFields = { ...studentFields };
    tmpStudentFields[fieldName] = value;
    setStudentFields(tmpStudentFields);
  };
  const handleRankChange = (selectedOption) => {
    console.log(`handleRankChange: ${selectedOption.value}`);
    const tmpStudentFields = { ...studentFields };
    tmpStudentFields["currentRank"] = selectedOption.value;
    setStudentFields(tmpStudentFields);
  };  
  const handleSaveClick = async () => {
    //console.log(`handleSaveClick: ${JSON.stringify(studentFields)}`);
    const saveResponse = await window.electronAPI.invokeMain(
      "handleSaveCreate",
      studentFields
    );
    console.log(`handleSaveClick saveResponse`);
    setStudentFields(saveResponse);
    if (saveResponse.focusField) {
      inputRefs.current[saveResponse.focusField].focus();
    }
  };
  const handleBadgeClick = async () => {
    console.log(`handleBadgeClick: ${JSON.stringify(studentFields.badgeNumber)}`);
    const createResponse = await window.electronAPI.invokeMain(
      "handleCreateBadge",
      studentFields
    );
  };

  // -------------------------------------------------------------------------------
  return (
    <div className="row d-flex justify-content-center small">
      <div id="frmCreate" className="row w-100 d-flex justify-content-center mainForm">
        <div>
          <h5 id="studentTitle" className="text-center">
            {displayOptions.headerMessage}
          </h5>
        </div>
        <label id="lblImagePath" hidden>
          Image path
        </label>

        <div className="col-sm-4 text-center  ">

          <div>
            <a href="#" style={{display: "inline-block"}}
               onClick={(e) => handleReturnClick()} >Back to search</a>
          </div>

          <div
            className="text-left d-inline-block"
            style={{ marginTop: "1rem" }}
          >
            <Button
              variant="success"
              className="smaller-input mb-3"
              style={{ width: "12rem" }}
              size="sm"
              onClick={() => handleSelectPicture(imageResponse.image_src)}
            >
              Select Picture
            </Button>
          </div>
          <div style={{ height: "250px" }}>
            <Image
              src={`data:image/${studentFields.studentImageType};base64,${studentFields.studentimageBase64}`}
              rounded
              style={{ height: "250px" }}
            />
          </div>
          <div className="text-center d-inline-block ">
          <div
              className="mt-2 p-1 fw-bold border rounded"
              style={{ backgroundColor: "#D3D3D3", width: "14rem" }}>
              <label>Student:</label>
              <label id="badgeNumberLbl">{studentFields.badgeNumber}</label>
            </div>
            <div
              className="mt-2 p-1 fw-bold border rounded"
              style={{ backgroundColor: "#D3D3D3", width: "14rem" }}>
              <label>Status:&nbsp; </label>
              <label>Active</label>
            </div>
            <div
              className="mt-2 p-1 fw-bold border rounded"
              style={{ backgroundColor: "#D3D3D3", width: "14rem" }}
            >
              <label>Member Since:</label><br></br>
              <label id="memberSinceLbl">01/01/1753</label>
            </div>
          </div>
        </div>

        <div className="col-sm-8 pt-3">
          <div className="col d-flex justify-content-start">
            <div
              className="d-inline-block text-start"
              style={{ width: "11rem" }}
            >
              <label>First Name</label>
              <Form.Control
                placeholder="First Name"
                defaultValue={studentFields.firstName}
                className={`d-inline-block float-left ${studentFields.firstNameClass}`}
                size="sm"
                style={{ width: "11rem" }}
                onBlur={(e) => handleFieldBlur("firstName", e.target.value)}
                ref={(el) => (inputRefs.current['firstName'] = el)}
              />
            </div>
            <div
              className="mb-3 ms-3 d-inline-block text-start"
              style={{ width: "11rem" }}
            >
              <label>Middle Name</label>
              <Form.Control
                placeholder="Middle Name"
                defaultValue={studentFields.middleName}
                className={`d-inline-block float-left ${studentFields.middleNameClass}`}
                size="sm"
                style={{ width: "11rem" }}
                onBlur={(e) => handleFieldBlur("middleName", e.target.value)}
                disabled={true}
              />
            </div>
            <div
              className="mb-3 ms-3 d-inline-block text-start"
              style={{ width: "11rem" }}>
              <label>Last Name</label>
              <Form.Control
                placeholder="Last Name"
                defaultValue={studentFields.lastName}
                className={`d-inline-block float-left ${studentFields.lastNameClass}`}
                size="sm"
                style={{ width: "11rem" }}
                onBlur={(e) => handleFieldBlur("lastName", e.target.value)}
                ref={(el) => (inputRefs.current['lastName'] = el)}
              />
            </div>
          </div>

          <div className="col mb-3 text-start">
            <div>
              <label className="">
                Address<span className="text-muted">(Optional)</span>
              </label>
            </div>
            <div>
            <Form.Control
              placeholder="1234 Main St"
              defaultValue={studentFields.address}
              className=""
              size="sm"
              style={{ width: "35rem" }}
              onBlur={(e) => handleFieldBlur("address", e.target.value)}
              ref={(el) => (inputRefs.current['address'] = el)}
              />
            </div>
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="address2" className="d-block">
              Address 2 <span className="text-muted">(Optional)</span>
            </label>
            <Form.Control
              placeholder="Apartment or suite"
              defaultValue={studentFields.address2}
              className="d-inline-block float-left"
              size="sm"
              style={{ width: "35rem" }}
              onBlur={(e) => handleFieldBlur("address2", e.target.value)}
              ref={(el) => (inputRefs.current['address2'] = el)}
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="city" className=" d-block">
              City<span className="text-muted">(Optional)</span>
            </label>
            <Form.Control
              placeholder="City"
              defaultValue={studentFields.city}
              className="d-inline-block float-left"
              size="sm"
              style={{ width: "35rem" }}
              onBlur={(e) => handleFieldBlur("city", e.target.value)}
              ref={(el) => (inputRefs.current['city'] = el)}
            />
          </div>

          <div className=" text-start">
            <div className="mb-3 d-inline-block w-25">
              <label htmlFor="state">
                State<span className="text-muted">(Opt)</span>
              </label>
              <Form.Control
                placeholder="State"
                defaultValue={studentFields.state}
                className="d-inline-block float-left"
                size="sm"
                onBlur={(e) => handleFieldBlur("state", e.target.value)}
                ref={(el) => (inputRefs.current['state'] = el)}
                />
            </div>
            <div className="mb-3 ms-3 d-inline-block w-25">
              <label htmlFor="zipCode">
                ZipCode<span className="text-muted">(Opt)</span>
              </label>
              <Form.Control
                placeholder="Zip Code"
                defaultValue={studentFields.zip}
                className="d-inline-block float-left"
                size="sm"
                onBlur={(e) => handleFieldBlur("zip", e.target.value)}
                ref={(el) => (inputRefs.current['zip'] = el)}
              />
            </div>
            <div
              className="mb-3 ms-3 w-25 d-inline-block"
              style={{ width: "9rem" }}
            >
              <label htmlFor="birthDate">Birth Date</label>
              <Form.Control
                type="date"
                placeholder="01/01/1753"
                defaultValue={studentFields.birthDate}
                className={`d-inline-block float-left ${studentFields.birthDateClass}`}
                size="sm"
                onBlur={(e) => handleFieldBlur("birthDate", e.target.value)}
                ref={(el) => (inputRefs.current['birthDate'] = el)}
              />
            </div>
          </div>

          <div className=" text-start">
            <div className="mb-3 w-25 d-inline-block">
              <label htmlFor="homePhone">
                Phone<span className="text-muted">(Optional)</span>
              </label>
              <Form.Control
                type="tel"
                placeholder="Phone"
                defaultValue={studentFields.phoneHome}
                className="d-inline-block float-left"
                size="sm"
                onBlur={(e) => handleFieldBlur("phoneHome", e.target.value)}
                ref={(el) => (inputRefs.current['phoneHome'] = el)}
              />
            </div>
            <div className="mb-3 ms-3 w-50 d-inline-block">
              <label htmlFor="email">
                E-Mail<span className="text-muted">(Optional)</span>
              </label>
              <Form.Control
                type="email"
                placeholder="E-Mail"
                defaultValue={studentFields.email}
                className="d-inline-block float-left"
                size="sm"
                onBlur={(e) => handleFieldBlur("email", e.target.value)}
                ref={(el) => (inputRefs.current['email'] = el)}
              />
            </div>
          </div>

          <div className=" text-start">
            <div className="mb-3 w-25 d-inline-block">
              <label htmlFor="currentRank">
                Belt Rank {studentFields.currentRank}<span className="text-muted">(Optional)</span>
              </label>
              <Select 
                menuPlacement = "top"
                className     = "" 
                onChange      = {handleRankChange}
                options       = {rankOptions}
                value  = {rankOptions[studentFields.currentRank-1]}
              />
            </div>
          </div>

          <Button
            variant="success"
            className="smaller-input"
            style={{ width: "7rem" }}
            size="sm"
            onClick={(e) => handleSaveClick()}
          >
            Save Updates
          </Button>
          <Button
            variant="success"
            className="smaller-input ms-3"
            style={{ width: "9rem" }}
            size="sm"
            disabled={studentFields.badgeNumber == -1}
            onClick={(e) => handleBadgeClick()}
          >
            Create Badge
          </Button>
        </div>
        <Form.Label
            // {`d-inline-block float-left ${studentFields.middleNameClass}`}
          className={`fw-bold h6 ${studentFields.saveResult}`}
          style={{ marginLeft: "6rem", marginTop: "2rem" }}>
          {studentFields.saveMessage}
        </Form.Label>
      </div>
    </div>
  );
}
