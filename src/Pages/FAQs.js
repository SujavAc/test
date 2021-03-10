import React from 'react';
import Page from './pages';
import Question from '../component/courses/component/Accordion';

export default function faqsPage(){
return(
    <div>
      <Question />
        <Page 
        image1={"https://i.redd.it/1vemqfhuf9u41.jpg"}
          pT2={
            "Don’t leave your options to chance, speak with the AECC Global experts before you make a big decision"
          }
          p2={
            "As an international student, choosing the right course of study for you in Australia is an important decision. It’s not only money, it’s also time that you can’t get back if you choose a course or institution here that doesn’t meet your study or long term career objectives. Talking with an Education Counsellor from AECC Global can help. You can tell us your career goals and we’ll give you expert guidance on the study choices that will get you there. We can help, whichever stage you’re at: Considering university or further courses of education in Australia? Want to know about different institutions in Australia and how they compare so you can make a good choice? Need assistance with student visa? It doesn’t matter, if you’ve studied before or not, we can help international students at every level, from university preparation courses right through to PhD and Master’s level research."
          }
          image2={
            "https://ih0.redbubble.net/image.8712023.7976/flat,1000x1000,075,f.jpg"
          }
          pT3={"Seek advice from an education industry-leader"}
          p3={
            "With almost 10 years’ experience and a wonderful team of QEAC Certified Education Counsellors, AECC Global can give you all the guidance and services you need to study in Australia. From course selection and managing your study application to visa advice and application services through our in-house migration agents to extensive support for health cover, taxation, accommodation and more, we are here for international students. We will start with learning about you and your goals, then our friendly Education Counsellors will help you find a fantastic course at an institution that gets you where you want to go. We’ll help arrange everything, from your course application to offer letter and study visa. We will also guide you on accommodation health cover and insurance. We will also search for applicable financial assistance and scholarships you could get. We know that leaving your home country to study overseas is an exciting journey – and we’ll be with you the whole way whenever you need advice or assistance throughout your stay in Australia."
          }
          />
          
    </div>
)
}