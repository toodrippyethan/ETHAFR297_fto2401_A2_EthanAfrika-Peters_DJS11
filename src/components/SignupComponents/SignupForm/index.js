import React, { useState } from 'react';
import Button from "../../common/Button";
import Inputcomponent from "../../common/Input";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { toast } from "react-toastify";


function SignUpForm() {
    const[fullName, setFullName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
      console.log("Handling SignUp...");
      setLoading(true);
      if (
        password === confirmPassword &&
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

        toast.success("User has been created!");
        setLoading(false);
        navigate("/profile")

        }  catch (e){
         console.log("error", e);
         toast.error(e.message);
         setLoading(false);

         }
         //This shows and error if incorrect password and if length not met
       } else {
        if (password !== confirmPassword) {
          toast.error(
            "Make Sure Password and Confirm Password matches!"
          );
        } else if (password.length < 6) {
          toast.error(
            "Make Sure Password is more than 6 digits long!"
          );
        }
        setLoading(false);
        // throw an error
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
            <Button
               text={loading ? "Loading..." : "Signup"}
               disabled={loading}
               onClick={handleSignup}
      />
        </div>
      );
    }

    export default SignUpForm;