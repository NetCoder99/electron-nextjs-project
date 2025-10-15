import React from "react";
import { useEffect, useState, useRef } from "react";
import Form     from "react-bootstrap/Form";
import Image   from "react-bootstrap/Image";

export default function manageCheckins() {
  // -------------------------------------------------------------------------------
  function getDisplayDate(inpDate = new Date()) {
    const date = inpDate.toLocaleDateString();
    const time = inpDate.toLocaleTimeString();
    const day  = inpDate.toLocaleDateString('en-us',{ weekday: 'long' });     
    return `${day} ${date} ${time}`; 
  }

  // -------------------------------------------------------------------------------
  //const inputRef = useRef(null);
  const [badgeData, setbadgeData] = useState({
    'badgeNumber'     : null,
    'checkinDateTime' : null
  });  
  const [checkinMessage, setCheckinMessage] = useState({
    'seqNo'           : 0,
    'message'         : 'Waiting...',
    'checkinDateTime' : ' ',
    'className'       : ' ',
    'nextPromotion'   : ' ',
    'imageSrc'        : "/misc_images/RSM_Footer.jpg",
    'responseClass'   : ''
  });  

  // -------------------------------------------------------------------------------
  useEffect(() => {
    setInterval(() => {
      const displayDate = getDisplayDate();
      const badgeDataTmp = {...badgeData};
      badgeDataTmp.checkinDateTime = displayDate;
      setbadgeData(badgeDataTmp);
    }, 1000);
  }, []);


  // ----------------------------------------------------------------------
  const onKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchResponse = await window.electronAPI.invokeMain('handleCheckin', event.target.value);
      event.target.value = null;
      processCheckinResponse(searchResponse);
      setTimeout(() => {
        resetCheckinDisplay();
      }, 5000);
    }    
  };

  // ----------------------------------------------------------------------
  function processCheckinResponse(searchResponse) {
    console.log(`processCheckinResponse`);
    const seqNo    = checkinMessage.seqNo + 1;
    const checkinMessageTmp = {...checkinMessage};
    if (searchResponse.status == 'ok') {
      const imageSrc = `data:image/${searchResponse.studentImageType};base64,${searchResponse.studentImageBase64}`
      checkinMessageTmp.seqNo           = seqNo;
      checkinMessageTmp.message         = searchResponse.message;
      checkinMessageTmp.checkinDateTime = searchResponse.checkinDateTime;
      checkinMessageTmp.nextPromotion   = searchResponse.nextPromotion;
      checkinMessageTmp.classesAttended = searchResponse.classesAttended;
      checkinMessageTmp.className       = searchResponse.className;
      checkinMessageTmp.imageSrc        = imageSrc;
      checkinMessageTmp.responseClass   = '';
      setCheckinMessage(checkinMessageTmp);
    } else {
      const imageSrc = "/misc_images/RSM_Footer.jpg";
      checkinMessageTmp.seqNo           = seqNo;
      checkinMessageTmp.message         = searchResponse.message;
      checkinMessageTmp.checkinDateTime = null;
      checkinMessageTmp.nextPromotion   = null;
      checkinMessageTmp.classesAttended = null;
      checkinMessageTmp.className       = null;
      checkinMessageTmp.imageSrc        = imageSrc;
      checkinMessageTmp.responseClass   = 'text-danger';
      setCheckinMessage(checkinMessageTmp);
    }

  };

  // ----------------------------------------------------------------------
  function resetCheckinDisplay() {
    const seqNo = checkinMessage.seqNo + 1;
    const checkinMessageTmp = {...checkinMessage};
    checkinMessageTmp.seqNo           = seqNo;
    checkinMessageTmp.message         = 'Waiting...';
    checkinMessageTmp.checkinDateTime = null;
    checkinMessageTmp.className       = null;
    checkinMessageTmp.nextPromotion   = null;
    checkinMessageTmp.imageSrc        = "/misc_images/RSM_Footer.jpg";
    checkinMessageTmp.responseClass   = '';
    setCheckinMessage(checkinMessageTmp);
    const badgeDataTmp = {...badgeData};
    badgeDataTmp.badgeNumber = null;
    setbadgeData(badgeDataTmp);
  };

  // ----------------------------------------------------------------------
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

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10  mx-auto border rounded-5 ps-5 pt-4 pb-3 mainForm text-center">
          <h2 className="fw-bold mx-auto mb-4">
            {" "}
            Please checkin before starting class...
          </h2>
          <form className="mx-auto">
            <Form.Control
              placeholder="Card Number"
              className={`d-inline-block float-left`}
              size="sm"
              style={{ width: "11rem" }}
              onKeyDown={(e) => onKeyDown(e)}
              //ref={inputRef}
            />
          </form>
          <div>
            <h4 id="currentDateTime" className="fw-bold mt-4">
              {badgeData.checkinDateTime}
            </h4>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>

      <div className="row mt-5">
        <div className="col-md-1"></div>
        <div className="col-md-10  mx-auto border rounded-5 ps-1 pt-4 pb-3 checkinResponse">
          <table className="checkin-table col-md-10 mx-auto ">
            <tbody>
              <tr>
                <td rowSpan="4" style={{ width: "7rem;" }}>
                  <Image
                    src={checkinMessage.imageSrc}
                    rounded
                    style={{ height: "95px" }}
                  />
                </td>
                <td className={`fw-bold border-bottom ${checkinMessage.responseClass}`}>{checkinMessage.message}</td>
              </tr>
              <tr>
                <td className="fw-bold ps-2 border-bottom">{checkinMessage.className}</td>
              </tr>
              <tr>
                <td className="fw-bold ps-2 border-bottom">{checkinMessage.checkinDateTime}</td>
              </tr>
              <tr>
                <td className="fw-bold ps-2">{checkinMessage.classesAttended}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}
