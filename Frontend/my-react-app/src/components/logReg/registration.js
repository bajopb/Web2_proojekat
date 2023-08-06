import React from "react";
import "../logReg/registration.css"
import { useState } from "react";

const Registration=()=>{

    const [regInfo, setRegInfo]=useState({
        username:"",
        email:"",
        password:"",
        passwordConfirm:"",
        name:"",
        lastname:"",
        address:"",
        birthday:"",
        type:"",
        imageFile:""
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!regInfo.username || !regInfo.email || !regInfo.password || !regInfo.passwordConfirm || !regInfo.name || !regInfo.lastname || !regInfo.address || !regInfo.birthday || !regInfo.type || !regInfo.imageFile){
            alert("Sva polja su obavezna");
        }

        if(regInfo.password!==regInfo.passwordConfirm)
        {
            alert("Lozinke se ne poklapaju");
        }
    };

    

    return(
        <div className="fullPageDiv">
            <div className="formDiv">
                <form onSubmit={handleSubmit}>
                    <div className="usernameDiv">
                        <label>Unesite korisnicko ime</label>
                        <input type="text" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')} onChange={(e)=>setRegInfo({...regInfo, username:e.target.value})} value={regInfo.username} name="username"/>
                    </div>
                    <div className="passwordDiv">
                        <label>Unesite lozinku</label>
                        <input type="password" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')}  onChange={(e)=>setRegInfo({...regInfo, password:e.target.value})}  value={regInfo.password} name="password"/>
                    </div>
                    <div className="passwordDiv">
                        <label>Potvrdite lozinku</label>
                        <input type="password" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')}  onChange={(e)=>setRegInfo({...regInfo, passwordConfirm:e.target.value})}  value={regInfo.passwordConfirm} name="passwordConfirm"/>
                    </div>
                    <div className="emailDiv">
                        <label>Unesite email</label>
                        <input type="text" required  onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')}  onChange={(e)=>setRegInfo({...regInfo, email:e.target.value})} value={regInfo.email} name="email"/>
                    </div>
                    <div className="nameDiv">
                        <label>Unesite ime</label>
                        <input type="text" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')}  onChange={(e)=>setRegInfo({...regInfo, name:e.target.value})}  value={regInfo.name} name="name"/>
                    </div>
                    <div className="lastNameDiv">
                        <label>Unesite prezime</label>
                        <input type="text" required  onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')} onChange={(e)=>setRegInfo({...regInfo, lastname:e.target.value})}  value={regInfo.lastname} name="lastname"/>
                    </div>
                    <div className="addressDiv">
                        <label>Unesite adresu</label>
                        <input type="text" required  onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')} onChange={(e)=>setRegInfo({...regInfo, address:e.target.value})} value={regInfo.address}  name="address   "/>
                    </div>
                    <div className="birthdayDiv">
                        <label>Unesite datum rodjenja</label><br></br>
                        <input type="date" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')} onChange={(e)=>setRegInfo({...regInfo, birthday:e.target.value})}  value={regInfo.birthday}  name="bithday"/>
                    </div>
                    <div className="typeDiv">
                        
                        <select name="type"  onChange={(e)=>setRegInfo({...regInfo, type:e.target.value})}  value={regInfo.type}>
                            <option value="">Izaberite tip </option>   
                            <option value="1">Kupac</option>   
                            <option value="2">Prodavac</option>   
                        </select>
                    </div>
                    <div className="imageDiv">
                        <label>Unseite vasu fotografiju</label>
                        <input type="file" value={regInfo.imageFile} required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')}  onChange={(e)=>setRegInfo({...regInfo, imageFile:e.target.value})}  accept="image/*" name="image"/>
                    </div>
                    <div className="submitDiv">
                        <button type="submit">Registrujte se</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;