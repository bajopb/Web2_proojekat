import React, { useEffect, useState } from 'react';
import './verification.css'; // Učitajte CSS fajl za stilizaciju
import   CheckCircle  from '@material-ui/icons/Add';
import      Cancel  from '@material-ui/icons/Add';
import api from '../../api/axios.js'

const Verification = ({ sellers }) => {

  const token=localStorage.getItem('token');

  const [allSellers, setAllSellers]=useState([]);

  useEffect(() => {
    // Poziv API-a za dohvaćanje svih porudžbina
    
    api.get(`/api/Admin/getAllSellers/`).then((response) => {
      setAllSellers(response.data);
      console.log(allSellers.length);
    });
  }, [token]);


  const handleApprove = (id) => {
    const status=0;
    api.post('/api/Admin/setStatus', { id, status })
      .then((response) => {
        console.log(response.data);
        setAllSellers((prevSellers) => prevSellers.filter((seller) => seller.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleReject = (id) => {
    const status=1;
    console.log(id);
    api.post('/api/Admin/setStatus', { id, status })
      .then((response) => {
        console.log(response.data);
        setAllSellers((prevSellers) => prevSellers.filter((seller) => seller.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });  };
  return (
    <div className="verificationList">
      {allSellers.length === 0 ? (
        <p>Trenutno nema prodavaca za verifikaciju.</p>
      ) : (
        allSellers.filter((seller)=>seller.verificationStatus==2).map((seller) => (
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
              <button onClick={() => handleApprove(seller.id)}>
                <CheckCircle className="approveIcon"/>
              </button>
              <button onClick={() => handleReject(seller.id)}>
                <Cancel className="rejectIcon" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};




export default Verification;
