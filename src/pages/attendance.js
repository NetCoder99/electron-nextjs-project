import React from 'react'

export default function manageAttenance() {
    return (
      <div className="container">
      <div id="first_spacer" style={{ height: "5rem" }}></div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          alignItems: "center",
        }}
      >
        <img
          src="/misc_images/rising-sun-martial-arts-logo.png"
          alt="No image found"
          height={120}
        />
      </div>


      <div className="row mt-5">
        <div className="col-md-1"></div>
        <div className="col-md-10  mx-auto border rounded-5 ps-5 pt-4 pb-3 checkinResponse">
          <table className="checkin-table col-md-10 mx-auto ">
            <tbody>
              <tr>
                <td className="fw-bold ps-4">Student Name</td>
              </tr>
              <tr>
                <td className="fw-bold ps-4">Checkin Datetime</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-1"></div>
      </div>
      </div>
    )
}