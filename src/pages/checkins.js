// import React from "react";
// import { useEffect, useState } from "react";
// import Form    from "react-bootstrap/Form";
// import Button  from "react-bootstrap/Button";
// import Image   from "react-bootstrap/Image";

// export default function manageCheckins() {
//   // -------------------------------------------------------------------------------
//   useEffect(() => {
//     // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//     const setInitialFieldDefs = async () => {
//       console.log(`manageCheckins-useEffect-setInitialFieldDefs:`);
//     };
//     setInitialFieldDefs();
//   }, []);

//   // ----------------------------------------------------------------------
//   const handleFieldBlur = (fieldName, newValue) => {
//     console.log(`manageCheckins-handleFieldBlur`);
//   };

//   return (
//     <div class="container">
//       <div id="first_spacer" style="height: 5rem;"></div>
//       <div class="row">
//         <div class="col-md-2"></div>
//         <div class="col-md-8  mx-auto border rounded-5 ps-5 pt-4 pb-3 main_form text-center">
//           <h2 class="fw-bold mx-auto mb-4"> Please checkin before starting class...</h2>
//             <Form.Control
//                 placeholder="Last Name"
//                 defaultValue={studentFields.lastName}
//                 className={`d-inline-block float-left ${studentFields.lastNameClass}`}
//                 size="sm"
//                 style={{ width: "11rem" }}
//                 onBlur={(e) => handleFieldBlur("lastName", e.target.value)}
//                 ref={(el) => (inputRefs.current['lastName'] = el)}
//               />            
//           <div>
//             <h4 id="currentDateTime" class="fw-bold mt-4">Saturday June 14, 2025 11:57</h4>
//           </div>
//         </div>
//         <div class="col-md-2"></div>
//       </div>  
//       <div class="row mt-2">
//         <div class="col-md-2"></div>
//         <div class="col-md-8  mx-auto border rounded-5 ps-5 pt-4 pb-3">
//           <h3 id="checkinLbl" class=" mt-2"></h3>
//         </div>
//         <div class="col-md-2"></div>
//       </div>
//     </div>
//   );
// }
