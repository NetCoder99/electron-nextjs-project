import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function RankCard(props) {
  return (
    <Card className='card_rank_common' >
      <Card.Body>
        <Card.Img variant="left" src={props.img_source} style={{ height: '75px', objectFit: 'cover' }} />
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          Requirements to advance to a White belt rank.
          <ul>
            <li>Classes attended : 20</li>
            <li>Classes attended : 20</li>
            <li>Classes attended : 20</li>
            <li>Classes attended : 20</li>
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RankCard;