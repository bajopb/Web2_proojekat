import React, { useEffect, useState } from 'react';
import './verification.css';
import CheckCircle from '@material-ui/icons/Add';
import Cancel from '@material-ui/icons/Add';
import api from '../../api/axios.js';

const Verification = ({ sellers }) => {
  const token = localStorage.getItem('token');
  const [allSellers, setAllSellers] = useState([]);
  const [verificationStatusFilter, setVerificationStatusFilter] = useState('verifikovani');

  useEffect(() => {
    api.get(`/api/Admin/getAllSellers/`)
      .then((response) => {
        setAllSellers(response.data);
      });
  }, []);

  const handleApprove = (id) => {
    const verificationStatus = 0;
    api.post('/api/Admin/setStatus', { id, verificationStatus })
      .then((response) => {
        setAllSellers((prevSellers) => prevSellers.filter((seller) => seller.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleReject = (id) => {
    const verificationStatus = 1;
    api.post('/api/Admin/setStatus', { id, verificationStatus })
      .then((response) => {
        setAllSellers((prevSellers) => prevSellers.filter((seller) => seller.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilterChange = (event) => {
    setVerificationStatusFilter(event.target.value);
  };

  const filteredSellers = allSellers.filter((seller) => {
    if (verificationStatusFilter === 'verifikovani') {
      return seller.verificationStatus === 0;
    } else if (verificationStatusFilter === 'neverifikovani') {
      return seller.verificationStatus === 2;
    }
    return true;
  });

  return (
    <div className="verificationList">
      <div className="filterCombo">
        <label>Filtriraj po statusu: </label>
        <select value={verificationStatusFilter} onChange={handleFilterChange}>
          <option value="verifikovani">Verifikovani</option>
          <option value="neverifikovani">Neverifikovani</option>
        </select>
      </div>
      {filteredSellers.length === 0 ? (
        <p>Trenutno nema {verificationStatusFilter === 'verifikovani' ? 'verifikovanih' : 'neverifikovanih'} prodavaca.</p>
      ) : (
        filteredSellers.map((seller) => (
          <div key={seller.id} className="verificationItem">
            <div className="verificationInfo">
              <p>ID: {seller.id}</p>
              <p>Username: {seller.username}</p>
              <p>First Name: {seller.firstName}</p>
              <p>Last Name: {seller.lastName}</p>
              <p>Address: {seller.address}</p>
              <p>Email: {seller.email}</p>
            </div>
            <div className="verificationActions">
              {seller.verificationStatus !== 0 && (
                <>
                  <button onClick={() => handleApprove(seller.id)}>
                    <CheckCircle className="approveIcon"/>
                  </button>
                  <button onClick={() => handleReject(seller.id)}>
                    <Cancel className="rejectIcon" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Verification;
