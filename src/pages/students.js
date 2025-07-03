import React from "react";

export default function manageStudents() {

  let clickCounter = 0;
  const handleCreateClick = () => {
    console.log(`Create button clicked: ${clickCounter++} times`);
  };

  return (
    <div class="row d-flex justify-content-center small">
      <div id="frmCreate" class="row w-100 d-flex justify-content-center mainForm">
      <h5 id="studentTitle" class="text-center">Creating new student record.</h5>
      <label id="lblImagePath" hidden>Image path</label>
    <div class="col-sm-4 text-center  ">
      <div class="text-left d-inline-block" style={{marginTop: "1rem"}}>
        <button id="selectCreatePicture" class="btn btn-success btn-sm btn-block my-3 align-left" type="button">Select
          Picture</button>
      </div>
      <div class="text-right d-inline-block">
        <button id="saveCreatePicture" class="btn btn-success btn-sm btn-block my-3" type="button">Save
          Selection</button>
      </div>
      <div style={{height:"250px"}}>
      <img id="studentCreatePicture"  alt="Please select a picutre!" class="border"  style={{height:"250px"}} />
      </div>
      <div class="text-center d-inline-block ">
        <div class="mt-2 p-1 fw-bold border rounded" style={{backgroundColor : "#D3D3D3", width: "14rem"}}>
          <label>Status:</label>
          <label>Active</label>
        </div>
        <div class="mt-2 p-1 fw-bold border rounded" style={{backgroundColor : "#D3D3D3", width: "14rem"}}>
          <label>Student #</label>
          <label id="badgeNumberLbl">99999</label>
        </div>
        <div class="mt-2 p-1 fw-bold border rounded" style={{backgroundColor : "#D3D3D3", width: "14rem"}}>
          <label>Since</label>
          <label id="memberSinceLbl">01/01/1753</label>
        </div>
      </div>
    </div>        
        <div class="col-sm-8 pt-3">
          <div class="col d-flex justify-content-start">
            <div class="d-inline-block text-start" style={{width: "11rem"}}>
              <label for="firstName">First Name</label>
              <input            type="text"
                class="form-control form-control-sm"
                id="inpFirstName"
                placeholder="First Name"
                value=""
              />
            </div>
            <div
              class="mb-3 ms-3 d-inline-block text-start"
              style={{width: "11rem"}}
            >
              <label for="middleName">Middle Name</label>
              <input
                type="text"
                class="form-control form-control-sm"
                id="inpMiddleName"
                placeholder="Middle Name"
                value=""
              />
            </div>
            <div
              class="mb-3 ms-3 d-inline-block text-start"
              style={{width: "11rem"}}
            >
              <label for="lastName">Last Name</label>
              <input
                type="text"
                class="form-control form-control-sm"
                id="inpLastName"
                placeholder="Last Name"
                value=""
              />
            </div>
          </div>

          <div class="col mb-3 text-start">
            <label for="address" class="">Address<span class="text-muted">(Optional)</span></label>
            <input type="text" class="form-control form-control-sm" id="inpAddress" placeholder="1234 Main St" style={{width: "35rem"}} />
          </div>

          <div class="mb-3 text-start">
            <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
            <input type="text" class="form-control form-control-sm" id="inpAddress2" placeholder="Apartment or suite" style={{width: "35rem"}}/>
          </div>

          <div class="mb-3 text-start">
            <label for="city">City<span class="text-muted">(Optional)</span></label>
            <input type="text" class="form-control form-control-sm" id="inpCity" placeholder="City" style={{width: "35rem"}}/>
          </div>

          <div class=" text-start">
          <div class="mb-3 d-inline-block w-25">
            <label for="state">State<span class="text-muted">(Opt)</span></label>
            <input type="text" class="form-control form-control-sm" id="inpState" placeholder="State" />
          </div>
          <div class="mb-3 ms-3 d-inline-block w-25">
            <label for="zipCode">ZipCode<span class="text-muted">(Opt)</span></label>
            <input type="text" class="form-control form-control-sm" id="inpZipCode" placeholder="ZipCode" />
          </div>
          <div class="mb-3 ms-3 w-25 d-inline-block" style={{width: "9rem"}}>
            <label for="birthDate">Birth Date</label>
            <input type="date" class="form-control form-control-sm" id="inpBirthDate" placeholder="01/01/1753"  style={{width: "9rem"}} />
          </div>
        </div>

        <div class=" text-start">
          <div class="mb-3 w-25 d-inline-block">
            <label for="homePhone">
              Phone<span class="text-muted">(Optional)</span>
            </label>
            <input type="tel" class="form-control form-control-sm" id="inpPhoneHome" placeholder="Phone" />
          </div>
          <div class="mb-3 ms-3 w-50 d-inline-block">
            <label for="email">
              E-Mail<span class="text-muted">(Optional)</span>
            </label>
            <input type="email" class="form-control form-control-sm" id="inpEmail" placeholder="E-Mail" />
          </div>
        </div>

        <div id="createButtons" class="text-start">
          <div class="d-inline-block" style={{marginBottom: "1px"}} >
            <button id="createButton" class="btn btn-success btn-sm ml-3" style={{marginBottom: "4px"}} type="button" onClick={handleCreateClick}>
              Create
            </button>
            <label id="createResultsMessage"></label>
          </div>
        </div>
          
        <div id="saveButtons" class="text-start iframe_hidden">
          <div class="d-inline-block" style={{marginBottom: "1px"}}>
            <button id="saveButton" class="btn btn-success btn-sm ml-3" style={{marginBottom: "4px"}} type="button" >
              Save
            </button>
            <button id="createBadge" class="btn btn-success btn-sm ml-3"  style={{marginBottom: "4px"}} type="button" >
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
