import React from "react";


const Registration=()=>{

    return(<>
        <div className="registrationDiv">
            <form onSubmit={handleSubmit} className="forms">
                
                <label className="labels">korisnicko ime</label>
                <input type="text" required name="username" className="inputs"></input>
                
                <label className="labels">Sifra</label>
                <input type="password" required name="password" className="inputs"></input>
                
                <label className="labels">Ponovi sifru</label>
                <input type="text" required name="passwordAgain" className="inputs"></input>
                
                <label className="labels">Email</label>
                <input type="text" required name="email" className="inputs"></input>
                
                <label className="labels">Ime</label>
                <input type="text" required name="name" className="inputs"></input>
                
                <label className="labels">Prezime</label>
                <input type="text" required name="lastName" className="inputs"></input>
                
                <label className="labels">Adresa</label>
                <input type="text" required name="address" className="inputs"></input>
                
                <label className="labels">Datum rodjenja</label>
                <input type="date" required name="birthday" max={`${new Date().getFullYear() - 18}-01-01`} className="inputs"></input>
                
                <label className="labels">Tip</label>
                <select required name="type" className="inputs">
                    <option value="">Izaberite</option>
                    <option value="1">Prodavac</option>
                    <option value="2">Kupac</option>
                </select>
                <label className="labels">Slika</label>
                <input type="file" required name="image" accept="image/*" className="inputs"></input>
                    
                <button className="buttons" type="submit">Registruj se</button>
            </form>
        </div>
    </>);
};

export default Registration;