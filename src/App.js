import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';

const amountPayable = 2354; // Change this anytime
const accounts = {
  MTN: ['0557463351', '0599647601'],
  Telecel: ['0201112233', '0204445566'],
  AirtelTigo: ['0268889999', '0277778888']
};

function randomRef() {
  return Math.random().toString(36).substr(2, 10).toUpperCase();
}

function Home() {
  return (
    <div className="home-container">
      <h2>Please select a payment method</h2>
      <div className="method-card" onClick={() => window.location.href='/payment/MTN'}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MTN_Logo.svg" alt="MTN" />
        <span>MTN</span>
        <span className="arrow">›</span>
      </div>
      <div className="method-card" onClick={() => window.location.href='/payment/Telecel'}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Telecel_logo.png" alt="Telecel" />
        <span>Telecel Cash</span>
        <span className="arrow">›</span>
      </div>
      <div className="method-card" onClick={() => window.location.href='/payment/AirtelTigo'}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/AirtelTigo_logo.png" alt="AirtelTigo" />
        <span>AirtelTigo</span>
        <span className="arrow">›</span>
      </div>
    </div>
  );
}

function PaymentDetails() {
  const { method } = useParams();
  const reference = randomRef();
  const accList = accounts[method] || [];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied: ' + text);
  };

  return (
    <div className="payment-container">
      <div className="tabs">
        <Link to="/payment/MTN" className={method === 'MTN' ? 'active' : ''}>MTN</Link>
        <Link to="/payment/Telecel" className={method === 'Telecel' ? 'active' : ''}>Telecel Cash</Link>
        <Link to="/payment/AirtelTigo" className={method === 'AirtelTigo' ? 'active' : ''}>AirtelTigo</Link>
      </div>
      <p className="warning">
        We have recently become aware of fraudulent individuals impersonating our company's repayment links in an attempt to deceive users. Please verify that this is from our official channel.
      </p>
      <h3>Official repayment wallet account</h3>
      <p className="subtext">
  Please DO NOT transfer money to any other account. <br />
  <span style={{ color: 'blue' }}>
    Please send your repayment proof of your existing loan to our support team on WhatsApp.
  </span>
</p>


      <div className="accounts-section">
        {accList.map((acc, index) => (
          <div className="account-row" key={index}>
            <span>{acc}</span>
            <button onClick={() => copyToClipboard(acc)}>📋</button>
          </div>
        ))}
      </div>

      <p className="amount"><strong>Total Amount Payable:</strong> GHS {amountPayable}</p>
      <p className="reference">
        <strong>Reference:</strong> {reference} 
        <button onClick={() => copyToClipboard(reference)}>📋</button>
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment/:method" element={<PaymentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
