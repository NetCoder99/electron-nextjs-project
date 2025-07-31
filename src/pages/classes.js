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
          height={120} />
      </div>


      <div className="row mt-5">
        <div className="col-md-1"></div>
        <div className="col-md-10  mx-auto border rounded-5 ps-5 pt-4 pb-3 text-center">
        <img
          src="/misc_images/sign-2408065_640.png"
          alt="Under Construction"
          height={120} />
        </div>
        <div className="col-md-1"></div>
      </div>
      </div>
    )
}