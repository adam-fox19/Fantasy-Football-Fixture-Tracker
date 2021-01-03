import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const ContactContent = () => {

  const [email, setEmail] = useState('');
  const [textArea, setTextArea] = useState('');

  const handleSubmit = (event) => {
    /* Bootstrap forms have inbuilt regex to check for correctly formatted emails
       so only check for textArea input needed here */
    if (textArea === '') {
      event.preventDefault();
      alert('please enter your message');
    }
  }

  const userTyping = (event) => {
    if (event.target.name === 'emailInput') {
      setEmail(event.target.value);
    }
    if (event.target.name === 'textAreaInput') {
      setTextArea(event.target.value);
    }
  }

  return (
    <div>
      <h2>Contact Me</h2>
      <p className='contact-para'>I'd love to hear any questions, comments or feedback about
      the tracker, so please get in touch using the form below. Thanks!</p>
      <form
        onSubmit={handleSubmit}
        action='/'
        method='POST'
      >
        <div className='form-group'>
          <label for='emailInput'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='emailInput'
            name='emailInput'
            value={email}
            onChange={userTyping}
          />
        </div>
        <div className='form-group'>
          <label for='textAreaInput'>Your message</label>
          <textarea
            className='form-control'
            id='textAreaInput'
            rows='4'
            name='textAreaInput'
            value={textArea}
            onChange={userTyping}
          >
          </textarea>
        </div>
        <button type='submit' className='btn'>Submit</button>
      </form>
    </div>
  )
}

export default ContactContent;
