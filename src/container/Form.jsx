import React from 'react';
import { useState, useEffect } from 'react';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import Select from '../components/Select';
import Responses from '../components/Responses';

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Form = () => {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState(
    JSON.parse(localStorage.getItem('responses')) || []
  );
  const [engines, setEngines] = useState([]);
  const [engine, setEngine] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!prompt) {
        alert('Please enter a prompt');
      } else if (!engine) {
        alert('Please select a engine');
      } else {
        const response = await openai.createCompletion(engine, {
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        if (response.status === 200) {
          let newResponses = responses;
          newResponses.unshift({
            prompt: prompt,
            response: response.data.choices[0].text,
          });
          setResponses([...newResponses]);
          setPrompt('');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem('responses', JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    async function fetchData() {
      const response = await openai.listEngines();
      if (response.status === 200) {
        const dataEngines = response.data.data;
        const newEngines = [];
        dataEngines.forEach((engine) => {
          newEngines.push(engine.id);
        });
        setEngines([...newEngines]);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Shopify Front End Developer Intern Challenge</h1>
      <p style={{ fontSize: '1.5em' }}>
        Made with{' '}
        <i style={{ margin: '0em 0.5em' }} className='bi bi-heart-fill'></i> by
        Rahul Kherajani
      </p>
      <p style={{ fontSize: '1.5em', cursor: 'pointer' }}>
        Source Code:{' '}
        <a href='https://github.com/RahulKherajani/shopify-front-end-challenge.git'>
          <i style={{ margin: '0em 0.5em' }} className='bi bi-github'></i>
        </a>
      </p>
      <p>Additional Tasks Completed:</p>
      <ul>
        <li>Save responses if the user leaves or reloads the page </li>
        <li>Let the user choose the AI engine from a select box</li>
      </ul>

      <hr />
      <form>
        <h1> Fun with AI!</h1>
        <TextArea
          title={'Enter prompt'}
          rows={10}
          value={prompt}
          name={'prompt'}
          placeholder={'Enter a prompt for the AI Engine'}
          handleChange={(e) => setPrompt(e.target.value)}
        />
        <Select
          title={'Select Engine'}
          name={'engine'}
          options={engines}
          value={engine}
          placeholder={'Select Engine'}
          handleChange={(e) => setEngine(e.target.value)}
        />
        <Button
          action={handleSubmit}
          type={'primary'}
          title={'Submit'}
          style={{ margin: '1em 0em' }}
        />
      </form>
      <h1>Responses</h1>
      <Responses responses={responses} />
    </div>
  );
};

export default Form;
