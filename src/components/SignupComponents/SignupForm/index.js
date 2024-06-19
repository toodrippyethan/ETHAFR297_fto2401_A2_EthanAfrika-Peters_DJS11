import React, { useState } from 'react';
import Button from "../../common/Button";
import Inputcomponent from "../../common/Input";
import Header from "../../common/Header";

function SignUpForm() {
    const[fullName, setFullName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    
    const handleSignup =() =>{
      console.log("Handling SignUp");
  
  }
      return (
      <div>
          <Inputcomponent 
            state={fullName}
            setState={setFullName}
            placeholder="Full Name" 
            type="text" 
            required={true}
            />
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
            <Inputcomponent 
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder="Confirm Password" 
            type="password" 
            required={true}
            />
            <Button text={"SignUp"} onClick={handleSignup}/>
        </div>
      );
    }

    export default SignUpForm;