import Button     from 'react-bootstrap/Button';
import Card       from 'react-bootstrap/Card';
import ListGroup  from 'react-bootstrap/ListGroup';
import Form       from 'react-bootstrap/Form';
import { NumericFormat } from 'react-number-format';
import { use, useState } from 'react';

function RankCard(props) {
  const [data,     setData]     = useState(props);
  const [allowAdd, setAllowAdd] = useState(true);
  const [response, setResponse] = useState('Awaiting input ...')

  // -------------------------------------------------------------------------------
  const handleTitleBlur = (index, newValue) => {
    console.log(`handleBlur invoked : ${index} :: ${newValue}`);
    console.log(`data : ${JSON.stringify(data.stripe_names[index])}`);
    const newData = data;
    newData.stripe_names[index].stripeTitle = newValue;
    console.log(`newData : ${JSON.stringify(newData)}`);
    setData(newData);
  };
  const handleClassesBlur = (index, newValue) => {
    console.log(`handleClassesBlur invoked : ${index} :: ${newValue}`);
    console.log(`data : ${JSON.stringify(data.stripe_names[index])}`);
    const newData = data;
    newData.stripe_names[index].requiredClasses = newValue;
    console.log(`newData : ${JSON.stringify(newData)}`);
    setData(newData);
  };

  // -------------------------------------------------------------------------------
  const handleAddClick = async () => {
    const response = await window.electronAPI.invokeMain('handleAddClick', data);
    console.log(`Add Button invoked : ${response}`);
    setData(response);
    setAllowAdd(true);
    setResponse('New rank requirement was added.')
  };
  const handleSaveClick = async () => {
    console.log(`Save Button started : ${data}`);
    const response = await window.electronAPI.invokeMain('handleSaveClick', data);
    console.log(`Save Button invoked : ${response}`);
    setAllowAdd(true);
    setResponse('Rank requirement changes were saved.')
  };
  const handleDelClick = async (index, requirementId) => {
    console.log(`Delete Button started : ${index}::${requirementId}`);
    const response = await window.electronAPI.invokeMain('handleDelRequirements', requirementId);
    console.log(`Delete Button invoked : ${JSON.stringify(response)}`);
    const newData  = {...data};
    let   delRow   = newData.stripe_names.splice(index, 1); 
    setData(newData);
    setAllowAdd(true);
    setResponse('Rank requirement was deleted.')
  };

  // -------------------------------------------------------------------------------
  return (
    <form>
    <Card className='card_rank_common' >
      <Card.Body>
        <Card.Img variant="left" src={props.imageSource} style={{ height: '75px', objectFit: 'cover' }} />
        <Card.Title className='fw-bold'>{data.beltTitle}</Card.Title>
        <Card.Text>
          Requirements to advance to a White belt rank.
        </Card.Text>
        <br></br>
        <ListGroup variant="flush">
        {data.stripe_names.map((item, index) => (
          <ListGroup.Item key={item.requirementId}>

            <Form.Control
              placeholder="Stripe Title"
              defaultValue={item.stripeTitle}
              className='d-inline-block float-left'
              size="sm"
              style={{width: "12rem"}}
              onBlur={(e) => handleTitleBlur(index, e.target.value)}
            />
            <Form.Control
              type="number"
              className='d-inline-block float-left ms-4'
              style={{width: "4rem", textAlign: 'right'}}
              size="sm"
              placeholder="Enter quantity"
              defaultValue={item.requiredClasses} 
              min={0}    
              max={2000} 
              onBlur={(e) => handleClassesBlur(index, e.target.value)}
            />

            <Button 
              variant="outline-secondary"
              className='d-inline-block btn btn-sm btn-outline mt-0 mb-2 ms-3' 
              style={{width: "2rem"}}
              onClick={() => handleDelClick(index, item.requirementId)}
              disabled={!allowAdd}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>  
            </Button>

          </ListGroup.Item>
        ))}
        </ListGroup>
      </Card.Body>
      <div className='m-0 p-0'>
        <Button 
          className='d-inline-block btn btn-sm mt-0 mb-2 ms-3' 
          style={{width: "5rem"}}
          onClick={handleAddClick}
          disabled={!allowAdd}
         >Add</Button>
        <Button 
          className='d-inline-block btn btn-sm mt-0 mb-2 ms-3' 
          style={{width: "5rem"}} 
          onClick={handleSaveClick}
          small="true"
        >Save</Button>
        <span className='ms-3 text-success'>{response}</span>
      </div>
    </Card>
    </form>    
  );
}

export default RankCard;