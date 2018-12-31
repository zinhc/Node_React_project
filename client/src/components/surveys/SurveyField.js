//SurveyField contains  logic to render a single
//label and text input
import React from 'react';

//{touched && error} means
//if touched is ture, show the error
export default ({ input, label, meta: { error, touched } }) => {
  //console.log('所有值: ', meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
