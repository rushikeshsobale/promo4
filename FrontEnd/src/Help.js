// Help.js

import React, { useEffect,useState } from 'react';


const Help = () => {
    const [grievance, setGrievance] = useState('');
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Handle the submission of the grievance (e.g., send it to the server)
          console.log('Grievance submitted:', grievance);
          // You can add additional logic here, like sending the grievance to the server
          // or displaying a confirmation message to the user
      
    }

  return (
    <div className="container-fluid mx-auto product card bg-dark ">
      <h2>Need Help?</h2>
      <p>
        If you have any questions or need assistance, feel free to reach out to our support team.
      </p>
      <div className="contact-options d-block wego">
        <div className="contact-option">
          <span className="icon">&#9990;</span>
          <p>Call us: +123 456 7890</p>
        </div>
        <div className="contact-option">
          <span className="icon">&#9993;</span>
          <p>Email us: support@example.com</p>
        </div>
      </div>
      <div className="grievances-input-container ">
      <h2>Submit Your Grievance</h2>
      <form onSubmit={handleSubmit} className='d-flex flex-column'>
        <textarea
          value={grievance}
          onChange={(e) => setGrievance(e.target.value)}
          placeholder="Type your grievance here..."
          rows="5"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    
  );
};

export default Help;
