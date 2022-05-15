import React from 'react';

const Response = ({ prompt, response }) => {
  return (
    <div className='alert alert-info'>
      <p>
        {' '}
        <strong>Prompt: </strong>
        {prompt}
      </p>
      <p>
        {' '}
        <strong>Response: </strong>
        {response}
      </p>
    </div>
  );
};

export default Response;
