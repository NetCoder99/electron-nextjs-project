import Form        from 'react-bootstrap/Form';

export default function StudentInputField({
  fieldDef, 
  fieldName, 
  fieldTitle, 
  blurCallBack,
  width
}) {
    return (
      <Form.Control
      placeholder  = {fieldTitle}
      defaultValue = {fieldDef}
      className    = 'd-inline-block float-left'
      size         = "sm"
      style        = {{width: {width}}}
      onBlur       = {(e) => blurCallBack(fieldName, e.target.value)}
    /> 
    );
}