import React from "react";
import { useEffect, useState } from 'react';

import SearchForStudents from "../components/students/student_search";
import ShowStudentList from "../components/students/student_list";
import ManageStudent from "../components/students/student_details";

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

  // ----------------------------------------------------------------------
  const handleFieldBlur = (fieldName, newValue) => {
    //console.log(`handleFieldBlur: ${fieldName} :: ${newValue}`);
    const newData = {...searchData};
    newData[fieldName] = newValue;
    setSearchData(newData);
  };

  // ----------------------------------------------------------------------
  let clickCounter = 0;
  const handleSearchClick = async () => {
    //console.log(`Search button clicked: ${clickCounter++} times`);
    const response = await window.electronAPI.invokeMain('handleStudentSearchClick', {...searchData});
    console.log(`Search response: ${JSON.stringify(response)} times`);
  };  
  const handleCreateClick = () => {
    setEditMode({isCreating:true,isEditing:false,isSearching:false});
  };

  // const [studentsData, setStudentsData]  = useState([]);
  // useEffect(() => {
  //   console.log(`Search students useEffect invoked`);
  //   const fetchData = async () => {
  //     console.log(`Search students fetching data`);
  //     const response = await window.electronAPI.invokeMain('handleStudentSearchClick');
  //     console.log(`Search students  fetching response: ${response}`);
  //     setStudentsData(response);
  //   };
  //   fetchData();
  //   return () => {};
  // }, []);

  if (editMode.isSearching) {
    return (
      <>
        <SearchForStudents 
          searchData={searchData}
          handleFieldBlur={handleFieldBlur}
          handleSearchClick={handleSearchClick}
          handleCreateClick={handleCreateClick}
        ></SearchForStudents>
        <ShowStudentList></ShowStudentList>
      </>
    )
  } else if (editMode.isCreating) {
    return (<ManageStudent editMode={editMode}></ManageStudent>)
  } 
}
