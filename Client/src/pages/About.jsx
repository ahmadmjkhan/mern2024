import React from "react";
import { useAuth } from "../store/auth";

const About = () => {
  const { user } = useAuth();
  return <div>About Hi {user.username}</div>;
};

export default About;
