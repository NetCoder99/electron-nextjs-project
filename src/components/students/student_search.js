import React from "react";

import Form       from 'react-bootstrap/Form';
import Button     from 'react-bootstrap/Button';

export default function SearchForStudents({searchData, handleSearchClick, handleFieldBlur, handleCreateClick}) {

  return (
    <form className="mainForm">
    <div className="row d-flex justify-content-center small form">
      <h3 className="text-center">Search for students</h3>
      <div className="col-sm-1"></div>
      <div className="col-sm-10 m-auto">
        <div className="row ">
            <Form.Control
              type="text"
              className='smaller-input'
              style={{width: "11rem"}}
              size="sm"
              placeholder="First Name"
              defaultValue={searchData.firstName}
              onBlur={(e) => handleFieldBlur('firstName', e.target.value)}
            />
            <Form.Control
              type="text"
              className='smaller-input ms-3'
              style={{width: "11rem"}}
              size="md"
              placeholder="Last Name"
              defaultValue={searchData.lastName}
              onBlur={(e) => handleFieldBlur('lastName', e.target.value)}
            />
            <Form.Control
              type="text"
              className='smaller-input ms-3'
              style={{width: "11rem"}}
              size="sm"
              placeholder="Badge Number"
              defaultValue={searchData.badgeNumber}
              onBlur={(e) => handleFieldBlur('badgeNumber', e.target.value)}
            />
            <Button 
              variant="success"
              className='smaller-input ms-3'
              style={{width: "4rem"}}
              size="sm"
              onClick={() => handleSearchClick()}>  
            Search
            </Button>            
            <Button 
              variant="success"
              className='smaller-input ms-3'
              style={{width: "4rem"}}
              size="sm"
              onClick={() => handleCreateClick()}>  
            Create
            </Button>            
          <span id="searchMessage" className="text-success fw-bold" >Search messages</span>
        </div>
      </div>
    </div>  
    </form>    
    )
}