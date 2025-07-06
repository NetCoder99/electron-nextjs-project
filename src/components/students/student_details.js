import React from "react";

export default function manageStudents() {

  let clickCounter = 0;
  const handleCreateClick = () => {
    console.log(`Create button clicked: ${clickCounter++} times`);
  };

  return (
    <div className="row d-flex justify-content-center small">
      <div id="frmCreate" className="row w-100 d-flex justify-content-center mainForm">
      <h5 id="studentTitle" className="text-center">Creating new student record.</h5>
      <label id="lblImagePath" hidden>Image path</label>
    <div className="col-sm-4 text-center  ">
      <div className="text-left d-inline-block" style={{marginTop: "1rem"}}>
        <button id="selectCreatePicture" className="btn btn-success btn-sm btn-block my-3 align-left" type="button">Select
          Picture</button>
      </div>
      <div className="text-right d-inline-block">
        <button id="saveCreatePicture" className="btn btn-success btn-sm btn-block my-3" type="button">Save
          Selection</button>
      </div>
      <div style={{height:"250px"}}>
      <img id="studentCreatePicture"  alt="Please select a picutre!" className="border"  style={{height:"250px"}} />
      </div>
      <div className="text-center d-inline-block ">
        <div className="mt-2 p-1 fw-bold border rounded" style={{backgroundColor : "#D3D3D3", width: "14rem"}}>
          <label>Status:</label>
          <label>Active</label>
        </div>
        <div className="mt-2 p-1 fw-bold border rounded" style={{backgroundColor : "#D3D3D3", width: "14rem"}}>
          <label>Student #</label>
          <label id="badgeNumberLbl">99999</label>
        </div>
        <div className="mt-2 p-1 fw-bold border rounded" style={{backgroundColor : "#D3D3D3", width: "14rem"}}>
          <label>Since</label>
          <label id="memberSinceLbl">01/01/1753</label>
        </div>
      </div>
    </div>        
        <div className="col-sm-8 pt-3">
          <div className="col d-flex justify-content-start">
            <div className="d-inline-block text-start" style={{width: "11rem"}}>
              <label>First Name</label>
              <input            type="text"
                className="form-control form-control-sm"
                id="inpFirstName"
                placeholder="First Name"
              />
            </div>
            <div
              className="mb-3 ms-3 d-inline-block text-start"
              style={{width: "11rem"}}
            >
              <label >Middle Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="inpMiddleName"
                placeholder="Middle Name"
              />
            </div>
            <div
              className="mb-3 ms-3 d-inline-block text-start"
              style={{width: "11rem"}}
            >
              <label>Last Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="inpLastName"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="col mb-3 text-start">
            <label htmlFor="address" className="">Address<span className="text-muted">(Optional)</span></label>
            <input type="text" className="form-control form-control-sm" id="inpAddress" placeholder="1234 Main St" style={{width: "35rem"}} />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
            <input type="text" className="form-control form-control-sm" id="inpAddress2" placeholder="Apartment or suite" style={{width: "35rem"}}/>
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="city">City<span className="text-muted">(Optional)</span></label>
            <input type="text" className="form-control form-control-sm" id="inpCity" placeholder="City" style={{width: "35rem"}}/>
          </div>

          <div className=" text-start">
          <div className="mb-3 d-inline-block w-25">
            <label htmlFor="state">State<span className="text-muted">(Opt)</span></label>
            <input type="text" className="form-control form-control-sm" id="inpState" placeholder="State" />
          </div>
          <div className="mb-3 ms-3 d-inline-block w-25">
            <label htmlFor="zipCode">ZipCode<span className="text-muted">(Opt)</span></label>
            <input type="text" className="form-control form-control-sm" id="inpZipCode" placeholder="ZipCode" />
          </div>
          <div className="mb-3 ms-3 w-25 d-inline-block" style={{width: "9rem"}}>
            <label htmlFor="birthDate">Birth Date</label>
            <input type="date" className="form-control form-control-sm" id="inpBirthDate" placeholder="01/01/1753"  style={{width: "9rem"}} />
          </div>
        </div>

        <div className=" text-start">
          <div className="mb-3 w-25 d-inline-block">
            <label htmlFor="homePhone">
              Phone<span className="text-muted">(Optional)</span>
            </label>
            <input type="tel" className="form-control form-control-sm" id="inpPhoneHome" placeholder="Phone" />
          </div>
          <div className="mb-3 ms-3 w-50 d-inline-block">
            <label htmlFor="email">
              E-Mail<span className="text-muted">(Optional)</span>
            </label>
            <input type="email" className="form-control form-control-sm" id="inpEmail" placeholder="E-Mail" />
          </div>
        </div>

        <div id="createButtons" className="text-start">
          <div className="d-inline-block" style={{marginBottom: "1px"}} >
            <button id="createButton" className="btn btn-success btn-sm ml-3" style={{marginBottom: "4px"}} type="button" onClick={handleCreateClick}>
              Create
            </button>
            <label id="createResultsMessage"></label>
          </div>
        </div>
          
        <div id="saveButtons" className="text-start iframe_hidden">
          <div className="d-inline-block" style={{marginBottom: "1px"}}>
            <button id="saveButton" className="btn btn-success btn-sm ml-3" style={{marginBottom: "4px"}} type="button" >
              Save
            </button>
            <button id="createBadge" className="btn btn-success btn-sm ml-3"  style={{marginBottom: "4px"}} type="button" >
              Create Badge
            </button>
            <label id="saveResultsMessage"></label>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
