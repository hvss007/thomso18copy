import React from 'react';

import './Instructions.css';


export default class Instructions extends React.Component{
  render(){
    return(
    <div>

          <div className="instructions-child">
            <div className="instructions-heading">
              INSTRUCTIONS
            </div>
             1. The quiz shall be conducted on www.dare2compete.com. The quiz will be posted on this page at 10:00 pm every Sunday for the next 10 weeks from 5th August, 2018 to 7th October, 2018.
            <br /> 2. The link shall be shared from our facebook page and as soon as you click on the link the quiz will start. You must enter your correct name, email id, address, college, branch and year. It may just take 1 minute. Note that incorrect details may lead to disqualification.
            <br /> 3. Click on the website link and it will be followed by 30 questions on the given topic. The time limit is 10 minutes.
            <br /> 4. Each question will have only one correct answer.
            <br /> 5. Each question will carry the same marks.
            <br /> 6. You even have the flexibility to Google the answer.
            <br /> 7. However, it won’t help you as no answers are available directly on Google.
            <br /> 8. The results will be declared on our facebook page after a few days of quiz conduct. So like and follow our facebook page for regular updates.
            <br /> 9. You have to submit the quiz by yourself.
            <br /> 10. Late submission may lead to rejection.
            <br /> 11. In case of same marks, the person submitting in lesser time will be considered better than the other.
          </div>
        </div>

  );
  }
}
