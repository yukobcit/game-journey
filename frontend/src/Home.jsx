import React, { useState } from 'react';
import { useAuthenticator } from "@aws-amplify/ui-react";
const Home = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [selectedChat, setSelectedChat] = useState(null);
  console.log("home",selectedChat);

  return (
    <div className='wrapper'>
      <div className='home'>
        Welcome to Game Journey
      </div>
    </div>
  );
};

export default Home;
