import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { PatternFormat, NumericFormat } from 'react-number-format';

function RankCard(props) {
  const handleAddClick = () => {
    console.log('Add Button clicked in Next.js!');
    window.electronAPI.send('addNewRequirement', 'Hello from Next.js!'); 
    // Further actions or IPC calls can be made here
  };
  const handleSaveClick = () => {
    console.log('Save Button clicked in Next.js!');
    // Further actions or IPC calls can be made here
  };

  return (
    <form>
    <Card className='card_rank_common' >
      <Card.Body>
        <Card.Img variant="left" src={props.img_source} style={{ height: '75px', objectFit: 'cover' }} />
        <Card.Title className='fw-bold'>{props.title}</Card.Title>
        {/* <Card.Title> <Card.Link href="#">{props.title}</Card.Link></Card.Title> */}
        <Card.Text>
          Requirements to advance to a White belt rank.
        </Card.Text>
        <br></br>
        <ListGroup variant="left">
        {props.stripe_names.map((item, index) => (
          <ListGroup.Item key={index}>
            <div className='d-inline-block float-left'>{item.stripe_title}</div>
            <NumericFormat className='rounded border float-end pe-1'
              style={{width: "2rem", textAlign: 'right'}}
              value={item.required_classes} 
              allowLeadingZeros 
              thousandSeparator="," 
            />
          </ListGroup.Item>
        ))}
        </ListGroup>
      </Card.Body>
      <div className='m-0 p-0'>
        <Button 
          className='d-inline-block float-start btn btn-sm mt-0 mb-2 ms-3' 
          style={{width: "5rem"}}
          onClick={handleAddClick}
         >Add</Button>
        <Button 
          className='d-inline-block float-end   btn btn-sm   mt-0 mb-2 me-3' 
          style={{width: "5rem"}} 
          small="true"
          onClick={handleSaveClick}
        >Save</Button>
      </div>
    </Card>
    </form>    
  );
}

export default RankCard;