import React from "react";

export default function ShowStudentList() {

  let clickCounter = 0;
  const handleCreateClick = () => {
    console.log(`Create button clicked: ${clickCounter++} times`);
  };

  return (
    <div className="row d-flex justify-content-center small mx-auto p-3">
    <hr></hr>
      <h4>Students: </h4>
      <table id="searchStudentTable" 
            className="table table-striped table-hover">
        <thead className="sticky-top border">
          <tr>
            <th>Badge</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}  