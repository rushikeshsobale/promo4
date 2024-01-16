import React, { useState } from 'react';

const CardDetailsForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };
  const handleCardNameChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (you can perform validation here)
    console.log('Card Details Submitted:', { cardNumber, expiryDate, cvv });
    // Reset the form
    setCardNumber('');
    setExpiryDate('');
    setCVV('');
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-3 cb  d-flex flex-wrap">
      <div className=" h m-1">
        <label className="form-label">Name Of Card Holder:</label>
        <input type="text" className="form-control" value={cardName} onChange={handleCardNameChange} />
      </div>
      <div className=" h m-1">
        <label className="form-label">Card Number:</label>
        <input type="text" className="form-control" value={cardNumber} onChange={handleCardNumberChange} />
      </div>
      
      <div className="h m-1">
        <label className="form-label">Expiry Date:</label>
        <input type="text" className="form-control" value={expiryDate} onChange={handleExpiryDateChange} />
      </div>
      <div className="h m-1">
        <label className="form-label">CVV:</label>
        <input type="text" className="form-control" value={cvv} onChange={handleCVVChange} />
      </div>
      <div className="mx-auto mt-3">
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default CardDetailsForm;
