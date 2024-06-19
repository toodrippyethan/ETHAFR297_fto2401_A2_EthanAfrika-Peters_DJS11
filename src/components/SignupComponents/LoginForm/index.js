import React, { useState } from "react";
import Button from "../../common/Button";
import Inputcomponent from "../../common/Input";

function LoginForm() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    
    const handleLogin=() =>{
      console.log("Handling Login");
  
    }
      return (
      <div>  
            <Inputcomponent 
            state={email}
            setState={setEmail}
            placeholder="Email" 
            type="text" 
            required={true}
            />
            <Inputcomponent 
            state={password}
            setState={setPassword}
            placeholder="Password" 
            type="password" 
            required={true}
            />
            <Button text={"Login"} onClick={handleLogin}/>
        </div>
      );
    }

    export default LoginForm;