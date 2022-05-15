import React from 'react';
import Response from './Response';

const Responses = ({ responses }) => {
  return (
    <div>
      {responses &&
        responses.map((response, index) => {
          return (
            <Response
              key={index}
              prompt={response.prompt}
              response={response.response}
            />
          );
        })}
    </div>
  );
};

export default Responses;
