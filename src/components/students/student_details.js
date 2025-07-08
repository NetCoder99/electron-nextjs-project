import React       from "react";
import {useState, useEffect} from 'react';
import Form        from 'react-bootstrap/Form';
import Button      from 'react-bootstrap/Button';
import Image       from 'react-bootstrap/Image';
export default function ManageStudent({editMode}) {
  console.log(`ManageStudent editMode: ${JSON.stringify(editMode)}`);

  const [displayOptions, setDisplayOptions]  = useState({
    'headerMessage' : 'Student details'
  });

  useEffect(() => {
    if (editMode.isCreating) {
      let newDisplayOptions = {...displayOptions};
      newDisplayOptions.headerMessage = "Creating a new student record."
      setDisplayOptions(newDisplayOptions);
    } 
    else if (editMode.isEditing) {
      let newDisplayOptions = {...editMode};
      newDisplayOptions.headerMessage = "Updating a student record."
      setDisplayOptions(newDisplayOptions);
    };  
}, []);



  const [imageResponse, setImageResponse]    = useState({
    'status'       : '',
    'message'      : 'Awaiting input...',
    'text_style'   : 'h5 text-dark',
    'image_src'    : '/misc_images/RSM_Logo2.jpg',
    'image_name'   : null, 
    'image_path'   : null, 
    'image_string' : null
  });

  let clickCounter = 0;
  const handleCreateClick = () => {
    console.log(`Create button clicked: ${clickCounter++} times`);
  };

  // -------------------------------------------------------------------------------
  const handleSelectPicture = async (image_src) => {
    console.log(`handleSelectPicture clicked`);
    const response = await window.electronAPI.invokeMain('handleSelectPicture', image_src);
    setImageResponse(response);
  };

  return (
    <div className="row d-flex justify-content-center small mt-5">
      <div id="frmCreate" className="row w-100 d-flex justify-content-center mainForm">
      <h5 id="studentTitle" className="text-center">{displayOptions.headerMessage}</h5>
      <label id="lblImagePath" hidden>Image path</label>

      <div className="col-sm-4 text-center  ">
        <div className="text-left d-inline-block" style={{marginTop: "1rem"}}>
        <Button 
          variant="success"
          className='smaller-input mb-3'
          style={{width: "12rem"}}
          size="sm"
          onClick={() => handleSelectPicture(imageResponse.image_src)}>  
          Select Picture
        </Button>         
        </div>
        <div style={{height:"250px"}}>
        <Image src={imageResponse.image_src} rounded style={{ height: '250px' }}  />
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
            <label>Since: </label>
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

          <Button 
              variant="success"
              className='smaller-input'
              style={{width: "7rem"}}
              size="sm">  
              Save Updates
          </Button> 
          <Button 
              variant="success"
              className='smaller-input ms-3'
              style={{width: "9rem"}}
              size="sm">  
              Create Badge
          </Button> 

      </div>
      <Form.Label className={imageResponse.text_style} style={{marginLeft: "6rem", marginTop: "2rem"}}>{imageResponse.message}</Form.Label>
      </div>
    </div>
  );
}
