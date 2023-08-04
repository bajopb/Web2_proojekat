import React from "react";
import "./homePage.css"
const HomePage=()=>{

    return(
        <>
            <div className="fullPageDiv">
                <div className="loginDiv">
                    <form onSubmit={handleSubmit} className="forms">
                        <label className="labels">Unesite korisnicko ime ili email</label>
                        <input type="text" id="emailLogin" required className="inputs">
                        </input>
                        <label className="labels">Unesite lozinku</label>
                        <input type="password" id="passwordLogin" required className="inputs"></input>
                        <button className="buttons" type="submit">Login</button>
                        <p>Nemate nalog? <a href="/registration">Registrujte se ovde</a></p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default HomePage;