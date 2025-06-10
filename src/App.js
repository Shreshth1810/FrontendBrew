import React, { useState } from 'react';
import QRScanner from './QRScanner';
import './App.css';

function App() {
  const [scanResult, setScanResult] = useState('');
  const [equipmentInfo, setEquipmentInfo] = useState({
    name: '—',
    location: '—',
    status: '—',
  });

  const handleScan = (result) => {
    setScanResult(result);

    // Dummy logic to populate info (replace with backend call later)
    setEquipmentInfo({
      name: 'Hydraulic Gear',
      location: 'Shelf B2',
      status: 'Available',
    });
  };

  return (
    <div className="app-container">
      <div className="header-bar">
        <h1>Brewmac Inventory</h1>
        <p className="subtext">Scan → Track → Manage</p>
      </div>

      <QRScanner onScanSuccess={handleScan} />

      <div className="card">
        <h2>Scanned QR Code</h2>
        <p>{scanResult || 'No scan yet.'}</p>
        <button disabled={!scanResult}>Add</button>
        <button disabled={!scanResult}>Issue</button>
      </div>

      <div className="info-section">
        <h2>Equipment Details</h2>
        <ul>
          <li><strong>Name:</strong> {equipmentInfo.name}</li>
          <li><strong>Location:</strong> {equipmentInfo.location}</li>
          <li><strong>Status:</strong> {equipmentInfo.status}</li>
        </ul>
      </div>

      <div className="footer">
        Powered by Cogmac Technologies
      </div>
    </div>
  );
}

export default App;
