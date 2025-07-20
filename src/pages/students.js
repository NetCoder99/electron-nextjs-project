import React from "react";
import { useEffect, useState } from 'react';

import SearchForStudents from "../components/students/student_search";
import StudentListCard   from "../components/students/student_card";
import ManageStudent     from "../components/students/student_details";

export default function manageStudents() {
  // ----------------------------------------------------------------------
  const [searchData, setSearchData] = useState({
    firstName: '',
    lastName: '',
    badgeNumber: ''
  });
  const [editMode, setEditMode] = useState({
    isCreating  : false,
    isEditing   : false,
    isSearching : true
  });
  const [studentList, setStudentList] = useState([{}]);


  // -------------------------------------------------------------------------------
  useEffect(() => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const setInitialFieldDefs = async () => {
      const searchResponse = await window.electronAPI.invokeMain('handleStudentSearchClick', {...searchData});
      console.log(`Student search response: ${JSON.stringify(searchResponse)}`);
      setStudentList(searchResponse);
    };
    setInitialFieldDefs();
  }, []);
  
  // ----------------------------------------------------------------------
  const handleSearchClick = async () => {
    const response = await window.electronAPI.invokeMain('handleStudentSearchClick', {...searchData});
    console.log(`Search response: ${JSON.stringify(response)} times`);
  };  
  const handleReturnClick = () => {
    setEditMode({isCreating:false,isEditing:false,isSearching:true});
  };
  const handleCreateClick = () => {
    setEditMode({isCreating:true,isEditing:false,isSearching:false});
  };
  const handleEditClick = (badgeNumber) => {
    console.log(`handleEditClick: ${badgeNumber}`);
    setSearchData ({firstName: '',lastName: '',badgeNumber: badgeNumber});
    setEditMode   ({isCreating:false,isEditing:true,isSearching:false});
  };
  // ----------------------------------------------------------------------
  const handleFieldBlur = (fieldName, newValue) => {
    const newData = {...searchData};
    newData[fieldName] = newValue;
    setSearchData(newData);
  };


  if (editMode.isSearching) {
    return (
      <>
        <SearchForStudents 
          searchData={searchData}
          handleFieldBlur={handleFieldBlur}
          handleSearchClick={handleSearchClick}
          handleCreateClick={handleCreateClick}
        ></SearchForStudents>
        <div className="row d-flex justify-content-center small mainForm p-0 m-0">
          <ul style={{padding: '0px', margin: "0px"}}>
            {studentList.map((item, index) => (
              <li key={index}>
                <StudentListCard studentData={item} handleEditClick={handleEditClick}></StudentListCard>
              </li>  
            ))}
          </ul>
        </div>
      </>
    )
  } else if (editMode.isCreating) {
    return (<ManageStudent editMode={editMode} handleReturnClick={handleReturnClick}></ManageStudent>)
  } else if (editMode.isEditing) {
    return (<ManageStudent 
        editMode={editMode} 
        handleReturnClick={handleReturnClick} 
        searchData={searchData}>
      </ManageStudent>)
  } 
}
