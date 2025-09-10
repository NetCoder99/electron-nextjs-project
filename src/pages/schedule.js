import React from "react";
import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Select from "react-select";
import ClassDetailsCard from "@/components/schedules/class_details";

export default function manageAttenance() {
  // ----------------------------------------------------------------------
  const [searchData, setSearchData] = useState({
    firstName: "",
    lastName: "",
    badgeNumber: "",
  });
  const [editMode, setEditMode] = useState({
    isCreating: false,
    isEditing: false,
    isSearching: true,
  });

  const [classFields, setClassFields] = useState({
    classNum: -1,
    className: "",
    classDayOfWeek: "",
    classStartTime: "",
    classDuration: "",
    allowedRanks: "",
    classDisplayTitle: "",
    allowedAges: "",
  });

  const handleAddClassClick = async () => {
    console.log(`handleAddClassClick: `);
    setEditMode({isCreating:true,isEditing:false,isSearching:false});
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

          <div class="row mb-3">
            <div class="col-md-3">Sunday</div>
            <div class="col-md-3">
              <Button
                size="sm"
                style={{ fontSize: "14px", padding: "1px" }}
                onClick={(e) => handleAddClassClick()}
              >
                Add class
              </Button>
            </div>
            <div class="col-md-6"></div>
          </div>

          <div class="row">
            <div class="col-md-3">Monday</div>
            <div class="col-md-3">5:00 PM to 5:50 PM</div>
            <div class="col-md-6">Chanbara Youth (4 to 10 years of age)</div>
          </div>

          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3">6:00 PM to 6:50 PM</div>
            <div class="col-md-6">
              Chanbara Juniors to Adults(11 years of age and up)
            </div>
          </div>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3">
              <Button
                size="sm"
                style={{ fontSize: "14px", padding: "1px" }}
                onClick={(e) => handleAddClassClick()}
              >
                Add class
              </Button>
            </div>
            <div class="col-md-6"></div>
          </div>

          <div class="row mt-4">
            <div class="col-md-3">Tuesday</div>
            <div class="col-md-3">4:00 PM to 4:50 PM</div>
            <div class="col-md-6">All ranks Kata / Short forms</div>
          </div>

          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3">5:00 PM to 5:50 PM</div>
            <div class="col-md-6">White to Orange Belt Kata / Short forms</div>
          </div>

          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3">6:00 PM to 6:50 PM</div>
            <div class="col-md-6">Yellow to Blue Belt Kata / Short forms</div>
          </div>

          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3">7:00 PM to 7:50 PM</div>
            <div class="col-md-6">Green Belt and up Kata / Short forms</div>
          </div>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3">
              <Button
                size="sm"
                style={{ fontSize: "14px", padding: "1px" }}
                onClick={(e) => handleAddClassClick()}
              >
                Add class
              </Button>
            </div>
            <div class="col-md-6"></div>
          </div>

          <hr className="my-3" />
        </div>
      </form>
    );
  } else if (editMode.isCreating) {
    return (
      <ClassDetailsCard
        handleReturnClick={handleReturnClick}
      ></ClassDetailsCard>
    );
  }
}
