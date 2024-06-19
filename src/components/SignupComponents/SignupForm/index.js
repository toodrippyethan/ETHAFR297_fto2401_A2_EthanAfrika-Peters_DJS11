import React, { useState } from 'react';
import Button from "../../common/Button";
import Inputcomponent from "../../common/Input";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';

function SignUpForm() {
    const[fullName, setFullName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
      console.log("Handling SignUp...");
      if (
        password == confirmPassword &&
        password.length >= 6 &&
        fullName &&
        email
      ) {
      try {
        // Creating user's account.
        const userCredential = await createUserWithEmailAndPassword (
          auth,
          email,
          password
        );

        const user = userCredential.user;

       // Saving users details 
        await setDoc(doc(db, "users", user.uid), {
            name: fullName,
            email: user.email,
            uid: user.uid,
          });

        // Save data in the redux, call the redux action
        dispatch(
            setUser({
              name: fullName,
              email: user.email,
              uid: user.uid,
            })
          );

        navigate("/profile")

        }  catch (e){
         console.log("error", e);
       }
       } else { // throw  error}
       }
    };
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