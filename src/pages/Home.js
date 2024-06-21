 import React, { useState } from 'react'
import Header from "../components/common/Header";

 function Home() {
  const [flag, setFlag] = useState(false);

     return ( 
    <div>
      <Header />
        <h1>Home</h1> 
       </div>
 )}
      
   export default Home;