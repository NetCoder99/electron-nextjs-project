import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StudentListCard({studentData, handleEditClick}) {
  //console.log(`StudentListCard`);
  // const handleSelectClick = async (badgeNumber) => {
  //   console.log(`Select event: ${badgeNumber}`);
  // };

  const buttonStyle = {
    cursor: "pointer",
  };

  // -------------------------------------------------------------------------------
  return (
    <Container
      style={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "10px",
        marginBottom: "5px",
        padding: "10px",
      }}
      onClick={() => handleEditClick(studentData.badgeNumber)}
    >
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
        </Col>
      </Row>
    </Container>
  );
}

export default StudentListCard;