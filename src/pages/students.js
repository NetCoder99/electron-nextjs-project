import React from "react";
import SearchForStudents from "../components/students/student_search";
import ShowStudentList from "../components/students/student_list";

export default function manageStudents() {

  let clickCounter = 0;
  const handleCreateClick = () => {
    console.log(`Create button clicked: ${clickCounter++} times`);
  };

  return (
    <>
      <SearchForStudents></SearchForStudents>
      <ShowStudentList></ShowStudentList>
    </>
)}
