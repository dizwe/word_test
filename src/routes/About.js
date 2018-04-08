import React from 'react';

// match는 받아오는 파라미터
const About = ({match})=>{
  return(
    <div>
      {match.params.username}
    </div>
  );
};

export default About;
