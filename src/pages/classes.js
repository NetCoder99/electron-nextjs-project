// import React   from "react";
// import { useState, useEffect, useRef } from "react";
// import Form    from "react-bootstrap/Form";
// import Button  from "react-bootstrap/Button";
// import Image   from "react-bootstrap/Image";
// import Select  from "react-select";


// export default function manageClass() {
//   const [classFields,  setClassFields ]  = useState({
//     'classDayOfWeek' : "",
//     'classStartTime' : "",
//     'classDuration' : "",
//   });

//   const handleEditClick = async () => {
//     console.log(`handleEditClick: `);
//     // const createClassResponse = await window.electronAPI.invokeMain(
//     //   "handleSaveClassSchedule",
//     //   classFields
//     // );
//   };


//   return (
//     <div className="row d-flex justify-content-center small">
//       <div id="first_spacer" style={{ height: "5rem" }}></div>

//       <h1 class="ms-4">Class / Schedule Maintnenance</h1>
//       <hr />
//       <form class="p-2 w-75" action="/submit-data" method="POST">
//         <div class="form-group row">
//           <label for="staticClassName" class="col-sm-3 col-form-label">Class Name</label>
//           <div class="col-sm-8">
//             <input type="text" class="form-control" id="staticClassName" value="Class Name" />
//           </div>
//         </div>
//         <div class="form-group row mt-2">
//           <label for="inputStyleNum" class="col-sm-3 col-form-label">Style Name</label>
//           <div class="col-sm-6">
//             <select class="form-select" aria-label="Default select example">
//               <option selected value="1">Okinawan Shorin-Ryu</option>
//               <option value="2">Chanbara</option>
//               <option value="3">Batto-Do Koshiden Ken Ryu</option>
//             </select>
//           </div>
//         </div>
//         <div class="form-group row mt-2">
//           <label for="inputStyleNum" class="col-sm-3 col-form-label">Day of week</label>
//           <div class="col-sm-6">
//             <select class="form-select" aria-label="Default select example">
//               <option selected value="0">Sunday</option>
//               <option value="1">Monday</option>
//               <option value="2">Tuesday</option>
//               <option value="3">Wednesday</option>
//               <option value="4">Thursday</option>
//               <option value="5">Friday</option>
//               <option value="6">Saturday</option>
//             </select>
//           </div>
//         </div>
//         <div class="form-group row mt-2">
//           <label for="inputStartTime" class="col-sm-3 col-form-label">Start Time</label>
//           <div class="col-sm-6">
//             <input type="text" class="form-control" id="inputStartTime" value="" />
//           </div>
//         </div>
  
//         <div class="form-group row mt-2">
//           <label for="inputClassDuration" class="col-sm-3 col-form-label">Class duration ( Mins )</label>
//           <div class="col-sm-6">
//             <input type="text" class="form-control" id="inputClassDuration" value="50" />
//           </div>
//         </div>
  
//         <div class="form-group row mt-2">
//           <label for="inputClassDuration" class="col-sm-3 col-form-label">Allowed ranks</label>
//           <div class="col-sm-6">
//             <input type="text" class="form-control" id="inputClassDuration" value="50" />
//           </div>
//         </div>
  
//         <div class="form-group row mt-2">
//           <label for="inputClassDuration" class="col-sm-3 col-form-label">Allowed Ages</label>
//           <div class="col-sm-6">
//             <input type="text" class="form-control" id="inputClassDuration" value="50" />
//           </div>
//         </div>
  
//         <hr />
//         <div class="mt-4 ms-4">
//           <Button
//             variant="success"
//             className="smaller-input ms-3"
//             style={{ width: "9rem" }}
//             size="sm"
//             onClick={(e) => handleSaveClassClick()}
//           >
//             Save Class Schedule
//           </Button>
//         </div>  
  
//       </form>    
//     </div>
//     )
// }