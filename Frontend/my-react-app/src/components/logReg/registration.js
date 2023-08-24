import React, {useContext} from "react";
import "../logReg/registration.css"
import { useState} from "react";
import api from "../../api/axios.js"
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/contextProvider";
const Registration=()=>{
    const contex=useContext(AuthContext);
    const [regInfo, setRegInfo]=useState({
        username:"",
        email:"",
        password:"",
        firstname:"",
        lastname:"",
        address:"",
        birthday:"",
        type:"",
        imageFile:""
    });
    const navigate=useNavigate();
    const [password2, setPassword2]=useState("");

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(!regInfo.username || !regInfo.email || !regInfo.password || !password2 || !regInfo.firstname || !regInfo.lastname || !regInfo.address || !regInfo.birthday || !regInfo.type){
            alert("Sva polja su obavezna");
            return;
        }

        if(regInfo.password!==password2)
        {
            alert("Lozinke se ne poklapaju");
            return;
        }
        const formData=new FormData();
        formData.append("username", regInfo.username);
        formData.append("email", regInfo.email);
        formData.append("password", regInfo.password);
        formData.append("firstName", regInfo.firstname);
        formData.append("lastName", regInfo.lastname);
        formData.append("address", regInfo.address);
        formData.append("birthday", regInfo.birthday);
        formData.append("type", regInfo.type);
        formData.append("imageFile", regInfo.imageFile);

        const result = await api.post('api/User/register', regInfo, { headers: { "Content-Type":"multipart/form-data" }
          });
        if(result.status===200){
            localStorage.setItem('token', result.data.token);
            contex.token=result.data.token;
            console.log(result.data.token);
            
            navigate("/");

        }
        if(result.data.token==="" || result.data.token===null)
            alert(result.data.result);
        
        
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
                        <input type="password" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')}    onChange={(e) => setPassword2(e.target.value)}  value={regInfo.password2} name="passwordConfirm"/>
                    </div>
                    <div className="emailDiv">
                        <label>Unesite email</label>
                        <input type="text" required  onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')}  onChange={(e)=>setRegInfo({...regInfo, email:e.target.value})} value={regInfo.email} name="email"/>
                    </div>
                    <div className="nameDiv">
                        <label>Unesite ime</label>
                        <input type="text" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')}  onChange={(e)=>setRegInfo({...regInfo, firstname:e.target.value})}  value={regInfo.firstname} name="name"/>
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
                        <input type="file" value={regInfo.imageFile}  /* onInput={(e) => e.target.setCustomValidity('')}*/  onChange={(e)=>setRegInfo({...regInfo, imageFile:e.target.value})}  accept="image/*" name="image"/>
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