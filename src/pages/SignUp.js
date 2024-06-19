import React, { useState } from 'react'
import Header from "../components/Header";
import Inputcomponent from '../components/Input';

function SignUpPage() {
  const[fullName, setFullName] = useState("")
    return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>SignUp</h1>
        <Inputcomponent state={fullName}
         setState={setFullName}
          placeholder="Full Name" 
          type="text" 
          required={true}
          />
      </div>
      </div>
    );
  }
  
  export default SignUpPage;