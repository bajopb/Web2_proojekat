import React, { useState, useEffect, useContext } from 'react';
import styles from "../profile/editProfile.css"
import api from '../../api/axios';
import AuthContext from '../../context/contextProvider';
import jwt_decode from "jwt-decode";

const EditProfile = () => {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: "",
        birthday: "",
        type: "",
        imageFile: ""
    });
    const context=useContext(AuthContext);
    const token=localStorage.getItem('token');

    useEffect(() => {
        const decodedToken = jwt_decode(token);
        const id = decodedToken.Id; // Pretpostavljajući da je ID claim nazvan "Id"
        if (id) {
            api.get(`/api/Profile/showProfile/${id}`).then((response) => {
                const profileData = response.data;
                setUserInfo(profileData);
            });
        }
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dodajte logiku za slanje podataka na server ili ažuriranje korisnika
    };

    return (
        <div className='editProfileDiv'>
            <h1>Izmeni </h1>
            <form className='forms' onSubmit={handleSubmit}>
                <div className='usernameDiv'>
                    <label>Korisničko ime</label>
                    <input
                        type='text'
                        className='inputs'
                        name='username'
                        value={userInfo.username}
                        onChange={handleChange}
                    />
                </div>

                <div className='emailDiv'>
                    <label>Email</label>
                    <input
                        type='email'
                        className='inputs'
                        name='email'
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                </div>

                <div className='passwordDiv'>
                    <label>Lozinka</label>
                    <input
                        type='password'
                        className='inputs'
                        name='password'
                        value={userInfo.password}
                        onChange={handleChange}
                    />
                </div>

                <div className='firstnameDiv'>
                    <label>Ime</label>
                    <input
                        type='text'
                        className='inputs'
                        name='firstname'
                        value={userInfo.firstname}
                        onChange={handleChange}
                    />
                </div>

                <div className='lastnameDiv'>
                    <label>Prezime</label>
                    <input
                        type='text'
                        className='inputs'
                        name='lastname'
                        value={userInfo.lastname}
                        onChange={handleChange}
                    />
                </div>

                <div className='addressDiv'>
                    <label>Adresa</label>
                    <input
                        type='text'
                        className='inputs'
                        name='address'
                        value={userInfo.address}
                        onChange={handleChange}
                    />
                </div>

                <div className='birthdayDiv'>
                    <label>Datum rođenja</label>
                    <input
                        type='date'
                        className='inputs'
                        name='birthday'
                        value={userInfo.birthday}
                        onChange={handleChange}
                    />
                </div>

                <div className='typeDiv'>
                    <label>Tip</label>
                    <select
                        className='inputs'
                        name='type'
                        value={userInfo.type}
                        onChange={handleChange}
                    >
                        <option value="">Izaberite tip</option>
                        <option value="1">Kupac</option>
                        <option value="2">Prodavac</option>
                    </select>
                </div>

                <div className='imageDiv'>
                    <label>Slika</label>
                    <input
                        type='file'
                        className='inputs'
                        name='imageFile'
                        onChange={handleChange}
                    />
                </div>

                <button type='submit'>Sačuvaj izmene</button>
            </form>
        </div>
    );
}

export default EditProfile;
