import React from "react";
import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Select from "react-select";
import ClassDetailsCard from "@/components/schedules/class_details";

export default function manageClassSchedules() {
  const [weekDays, setWeekDays] = useState({ });

  // -------------------------------------------------------------------------------
  // useEffect(() => {
  //   console.log(`manageClassSchedules:useEffect`);
  //   const daysOfWeekResponse = window.electronAPI.invokeMain("handleGetDaysOfWeek");
  //   console.log(`manageClassSchedules:daysOfWeekResponse: ${JSON.stringify(daysOfWeekResponse)}`);
  // }, []);  

  useEffect(() => {
    (async () => {
      try {
        const daysOfWeekResponse = await window.electronAPI.invokeMain("handleGetDaysOfWeek");
        console.log(`manageClassSchedules:daysOfWeekResponse: ${JSON.stringify(daysOfWeekResponse)}`);        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  // ----------------------------------------------------------------------
  // const [searchData, setSearchData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   badgeNumber: "",
  // });
  const [editMode, setEditMode] = useState({
    isCreating: false,
    isEditing: false,
    isSearching: true,
    dayOfWeek: -1
  });

  // const [classFields, setClassFields] = useState({
  //   classNum: -1,
  //   className: "",
  //   classDayOfWeek: "",
  //   classStartTime: "",
  //   classDuration: "",
  //   allowedRanks: "",
  //   classDisplayTitle: "",
  //   allowedAges: "",
  // });

  const handleAddClassClick = async (dayOfWeek) => {
    console.log(`handleAddClassClick: `);
    setEditMode({isCreating:true,isEditing:false,isSearching:false,dayOfWeek:dayOfWeek});
  };
  const handleReturnClick = async () => {
    console.log(`handleReturnClick: `);
    setEditMode({isCreating:false,isEditing:false,isSearching:true});
  };

  if (editMode.isSearching) {
    return (
      <form className="mainForm p-4">
        <div className="row d-flex justify-content-center small">
          <h1 className="text-center">Class schedules manager.</h1>

          <hr />

          <div className="row mb-3">
            <div className="col-md-3">Sunday</div>
            <div className="col-md-3">
              <Button
                variant="link" 
                size="sm"
                style={{ fontSize: "14px", padding: "1px" }}
                onClick={(e) => handleAddClassClick(0)}
              >
                Add class
              </Button>
            </div>
            <div className="col-md-6"></div>
          </div>

          <div className="row">
            <div className="col-md-3">Monday</div>
            <div className="col-md-3">5:00 PM to 5:50 PM</div>
            <div className="col-md-6">Chanbara Youth (4 to 10 years of age)</div>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">6:00 PM to 6:50 PM</div>
            <div className="col-md-6">
              Chanbara Juniors to Adults(11 years of age and up)
            </div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <Button
                variant="link" 
                size="sm"
                style={{ fontSize: "14px", padding: "1px" }}
                onClick={(e) => handleAddClassClick(1)}
              >
                Add class
              </Button>
            </div>
            <div className="col-md-6"></div>
          </div>

          <div className="row mt-4">
            <div className="col-md-3">Tuesday</div>
            <div className="col-md-3">4:00 PM to 4:50 PM</div>
            <div className="col-md-6">All ranks Kata / Short forms</div>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">5:00 PM to 5:50 PM</div>
            <div className="col-md-6">White to Orange Belt Kata / Short forms</div>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">6:00 PM to 6:50 PM</div>
            <div className="col-md-6">Yellow to Blue Belt Kata / Short forms</div>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">7:00 PM to 7:50 PM</div>
            <div className="col-md-6">Green Belt and up Kata / Short forms</div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <Button
                variant="link" 
                size="sm"
                style={{ fontSize: "14px", padding: "1px" }}
                onClick={(e) => handleAddClassClick(2)}
              >
                Add class
              </Button>
            </div>
            <div className="col-md-6"></div>
          </div>

          <hr className="my-3" />
        </div>
      </form>
    );
  } else if (editMode.isCreating) {
    return (
      <ClassDetailsCard
        editMode={editMode}
        handleReturnClick={handleReturnClick}
      ></ClassDetailsCard>
    );
  }
}
