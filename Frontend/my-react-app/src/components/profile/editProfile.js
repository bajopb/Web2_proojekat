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
        image:"",
        imageFile: ""
    });
    const context=useContext(AuthContext);
    const token=localStorage.getItem('token');

    useEffect(() => {
        const decodedToken = jwt_decode(token);
        const id = decodedToken.Id; 
        if (id) {
            api.get(`/api/Profile/showProfile/${id}`).then((response) => {
                const profileData = response.data;
                const serverDate = new Date(profileData.birthday);
                const formattedDate = serverDate.toISOString().split('T')[0];
    
                // Izdvoji ostala polja koja ne želite da menjate
                const { username, email, password, firstname, lastname, address, imageFile } = profileData;
    
                // Postavi novo stanje samo za datum, a ostala polja ostanu ista
                setUserInfo(prevUserInfo => ({
                    ...prevUserInfo,
                    birthday: formattedDate,
                    username,
                    email,
                    password,
                    firstname,
                    lastname,
                    address,
                    imageFile
                }));
            });
        }
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!userInfo.username || !userInfo.email || !userInfo.password || !userInfo.firstname || !userInfo.lastname || !userInfo.address || !userInfo.birthday) {
            alert("Sva polja moraju biti popunjena");
            return;
        }
    
        const formData = new FormData();
        formData.append('username', userInfo.username);
        formData.append('email', userInfo.email);
        formData.append('password', userInfo.password);
        formData.append('firstname', userInfo.firstname);
        formData.append('lastname', userInfo.lastname);
        formData.append('address', userInfo.address);
        formData.append('birthday', userInfo.birthday);
        formData.append('imageFile', userInfo.imageFile);
    
        try {
            const decodedToken = jwt_decode(token);
            const id = decodedToken.Id;
    
            // Posalji HTTP PUT zahtev na server sa podacima za izmenu kao form data
            const response = await api.put(`/api/Profile/editProfile/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log("Podaci su uspešno izmenjeni:", response.data);
        } catch (error) {
            console.error("Greška pri izmeni podataka:", error);
        }
    };
    
    
     const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
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

                <div>
          <img
            title="Image"
            alt="Add"
            src={userInfo.imageFile ? URL.createObjectURL(userInfo.imageFile) : userInfo.image && convertImage(userInfo.image)}
            className="image"
          />
        </div>

                <div className='imageDiv'>
                    <label>Slika</label>
                    <input
                        type='file'
                        className='inputs'
                        name='imageFile'
                        onChange={(e) => {
                            setUserInfo({ ...userInfo, imageFile: e.target.files[0] });
                          }}
                    />
                </div>

                <button type='submit'>Sačuvaj izmene</button>
            </form>
        </div>
    );
}

export default EditProfile;
