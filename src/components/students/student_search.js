
import React from "react";

export default function SearchForStudents() {

  let clickCounter = 0;
  const handleSearchClick = () => {
    console.log(`Search button clicked: ${clickCounter++} times`);
  };

  return (
    <form>
    <div className="row d-flex justify-content-center small form p-3">
      <h3 className="text-center">Search for students</h3>
      <div className="col-sm-1"></div>
      <div className="col-sm-10">
        <div className="row m-auto">
          <div className="col-sm-3 mb-3" style={{width : "11rem"}}>
            <input type="text" className="form-control form-control-sm" id="srchFirstName" placeholder="First Name"/>
          </div>
          <div className="col-sm-3 mb-3"  style={{width : "11rem"}}>
            <input type="text" className="form-control form-control-sm" id="srchLastName" placeholder="Last Name" />
          </div>
          <div className="col-sm-3 mb-3"  style={{width : "11rem"}}>
            <input type="text" className="form-control form-control-sm" id="srchBadgeNumber" placeholder="Badge" />
          </div>
          <div className="col-sm-3 mb-3 ">
            <button id="searchButton" className="btn btn-success btn-sm " type="button" onClick={handleSearchClick}>Search</button>
          </div>
          <div className="col-sm-1"></div>
          <span id="searchMessage" className="text-success fw-bold" >Search messages</span>
        </div>
      </div>
    </div>  
    </form>    
    )
}