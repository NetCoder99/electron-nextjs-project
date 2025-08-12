import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import ListGroup  from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PromotionsCard({studentData, itemIndex, handleEditClick}) {
  console.log(`PromotionsCard started: ${studentData.badgeNumber}:${itemIndex}`);
  const buttonStyle = {
    cursor: "pointer",
  };

  const [promotions,  setPromotions ]  = useState([{}]);

  // -------------------------------------------------------------------------------
  let effectCounter = 0;
  useEffect(() => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const setInitialFieldDefs = async () => {
      effectCounter =  effectCounter + 1;
      console.log(`PromotionsCard:setInitialFieldDefs:${studentData.badgeNumber}`);
      const badgeData = {'badgeNumber' : studentData.badgeNumber};
      const searchResponse = await window.electronAPI.invokeMain('handleGetPromotions', badgeData);
      //console.log(`PromotionsCard:setInitialFieldDefs:searchResponse${JSON.stringify(searchResponse)}`);
      setPromotions(searchResponse);
    };
    setInitialFieldDefs();
  }, []);

  // -------------------------------------------------------------------------------
  return (
    <Container
      style={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "10px",
        marginBottom: "5px",
        padding: "10px",
      }}>
      <Row style={buttonStyle}>
        <Col sm={2}><img src={`data:image/${studentData.studentImageType};base64,${studentData.studentimageBase64}`} alt="No image found" height={75} /></Col>
        <Col className="pt-3">
          <Row>
            <Col sm={2} className="text-left border-bottom ">
              Badge
            </Col>
            <Col sm={4} className="text-left border-bottom ">
              Name
            </Col>
            <Col sm={3} className="text-left border-bottom ">
              Rank
            </Col>
            <Col sm={3} className="text-left border-bottom ">
              Next Promotion
            </Col>
          </Row>
          <Row>
            <Col sm={2} className="text-left fw-bold">
              {studentData.badgeNumber}
            </Col>
            <Col sm={4} className="text-left fw-bold">
              {studentData.firstName} {studentData.lastName}
            </Col>
            <Col sm={3} className="text-left fw-bold">
              {studentData.currentRankName}
            </Col>
            <Col sm={3} className="text-left fw-bold">
              01/01/1753
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="text-center fw-bold">
              <hr></hr>
            </Col>
            <Col sm={12} className="text-left fw-bold">
              <h5>Promotion History</h5>
            </Col>
          </Row>
        </Col>
      </Row>

      <ListGroup variant="left">
        {promotions.map((item, index) => (
          <ListGroup.Item className='text-start' key={item.requirementId}>
          <Row>
            <Col sm={6} className="text-left fw-bold">
              {item.rankName}
            </Col>
            <Col sm={3} className="text-left fw-bold">
              {item.checkinDateTime}
            </Col>
            <Col sm={3} className="text-left fw-bold">
              {item.classCount}
            </Col>
          </Row>            
          </ListGroup.Item>
        ))}  
      </ListGroup>      
    </Container>
  );
}

export default PromotionsCard;
