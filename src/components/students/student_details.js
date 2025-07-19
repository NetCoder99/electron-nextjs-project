import React   from "react";
import { useState, useEffect } from "react";
import Form    from "react-bootstrap/Form";
import Button  from "react-bootstrap/Button";
import Image   from "react-bootstrap/Image";

export default function ManageStudent({ editMode, handleReturnClick, searchData }) {
  console.log(`ManageStudent editMode:   ${JSON.stringify(editMode)}`);
  console.log(`ManageStudent searchData: ${JSON.stringify(searchData)}`);

  // -------------------------------------------------------------------------------
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
    getStudentPicture();
  }, []);

  // -------------------------------------------------------------------------------
  async function getStudentPicture() {
    console.log(`getStudentPicture invoked`);

  }

  // -------------------------------------------------------------------------------
  async function setInitialFieldDefs() {
    const studentFields = await window.electronAPI.invokeMain(
      "handleGetStudentFields", searchData
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
    //tmpStudentFields.imageBase64 = response.image_string;
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
  const handleSaveClick = async () => {
    console.log(`handleSaveClick: ${JSON.stringify(studentFields)}`);
    const saveResponse = await window.electronAPI.invokeMain(
      "handleSaveCreate",
      studentFields
    );
    //console.log(`handleSaveClick saveResponse: ${JSON.stringify(saveResponse)}`);
    console.log(`handleSaveClick saveResponse`);
    setStudentFields(saveResponse);
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
              style={{ backgroundColor: "#D3D3D3", width: "14rem" }}
            >
              <label>Status:</label>
              <label>Active</label>
            </div>
            <div
              className="mt-2 p-1 fw-bold border rounded"
              style={{ backgroundColor: "#D3D3D3", width: "14rem" }}
            >
              <label>Student #</label>
              <label id="badgeNumberLbl">{studentFields.badgeNumber}</label>
            </div>
            <div
              className="mt-2 p-1 fw-bold border rounded"
              style={{ backgroundColor: "#D3D3D3", width: "14rem" }}
            >
              <label>Since: </label>
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
              style={{ width: "11rem" }}
            >
              <label>Last Name</label>
              <Form.Control
                placeholder="Last Name"
                defaultValue={studentFields.lastName}
                className={`d-inline-block float-left ${studentFields.lastNameClass}`}
                size="sm"
                style={{ width: "11rem" }}
                onBlur={(e) => handleFieldBlur("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="col mb-3 text-start">
            <label htmlFor="address" className="">
              Address<span className="text-muted">(Optional)</span>
            </label>
            <Form.Control
              placeholder="1234 Main St"
              defaultValue={studentFields.address}
              className="d-inline-block float-left"
              size="sm"
              style={{ width: "35rem" }}
              onBlur={(e) => handleFieldBlur("address", e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="address2">
              Address 2 <span className="text-muted">(Optional)</span>
            </label>
            <Form.Control
              placeholder="Apartment or suite"
              defaultValue={studentFields.address2}
              className="d-inline-block float-left"
              size="sm"
              style={{ width: "35rem" }}
              onBlur={(e) => handleFieldBlur("address2", e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="city">
              City<span className="text-muted">(Optional)</span>
            </label>
            <Form.Control
              placeholder="City"
              defaultValue={studentFields.city}
              className="d-inline-block float-left"
              size="sm"
              style={{ width: "35rem" }}
              onBlur={(e) => handleFieldBlur("city", e.target.value)}
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
          >
            Create Badge
          </Button>
        </div>
        <Form.Label
            // {`d-inline-block float-left ${studentFields.middleNameClass}`}
          className={`fw-bold h6 ${studentFields.saveResult}`}
          style={{ marginLeft: "6rem", marginTop: "2rem" }}
        >
          {studentFields.saveMessage}
        </Form.Label>
      </div>
    </div>
  );
}
