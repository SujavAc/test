import React from 'react';
import Homepage from './Pages/homepage';
import Admin from './Pages/admin';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AboutUs from './Pages/About Us';
import PopularCourses from './Pages/Popular course';
import FAQs from './Pages/FAQs';
import MigrationService from './Pages/Migration Service';
import StudentService from './Pages/Student Services';
import StudentTestimonials from './Pages/Studnet Testimonials';
import Blog from './component/Blog';
import Events from './Pages/Events';

import BusinessAnalytics from './component/courses/BusinessAnalytics';
import BusinessStudies from './component/courses/Course Page/BusinessStudies';
import ArchitectureAndBuilding from './component/courses/Course Page/ArchitectureAndBuilding';
import Engineering from './component/courses/Course Page/Engineering';
import FandHospitality from './component/courses/Course Page/Food&Hospitality';
import HandAHealth from './component/courses/Course Page/Health&AlliedHealth';
import HandSScience from './component/courses/Course Page/HumanitiesAndSocialScience';
import InformationTechnology from './component/courses/Course Page/InformationTechnology';
import Science from './component/courses/Course Page/Science';
import ArtDesign from './component/courses/Course Page/artDesign';
import Law from './component/courses/Course Page/law';
import Education from './component/courses/Course Page/Education';
import Automotive from './component/courses/component/mainpage/automotive';
import CommercialCookery from './component/courses/component/mainpage/commercialcookery';
import EarlyChildhood from './component/courses/component/mainpage/earlychilhood';
import Plumbing from './component/courses/component/mainpage/plumbing';
import Agecare from './component/courses/component/mainpage/Agecare';
import Paintingdecoration from './component/courses/component/mainpage/Paintingdecoration';
import Communityservices from './component/courses/component/mainpage/communityservice';

function App() {
  return (
    
    
    <div className='App'>
      <BrowserRouter>
      <Switch>
      <Route exact path='/' component={Homepage} />
    <Route exact path='/homepage' component={Homepage} />
      <Route exact path='/Admin' component={Admin} />
      <Route exact path='/About Us' component={AboutUs} />
      <Route exact path='/Popular Course' component={PopularCourses} />
      <Route exact path='/FAQs' component={FAQs} />
      <Route exact path='/Migration Services' component={MigrationService} />
      <Route exact path='/Student Services' component={StudentService} />
      <Route exact path='/Student Testimonials' component={StudentTestimonials} />
      <Route exact path='/Blog' component={Blog} />
      <Route exact path='/Events' component={Events} />
      <Route exact path='/BusinessAnalytics' component={BusinessAnalytics} />
      <Route exact path='/Business Studies' component={BusinessStudies} />
      <Route exact path='/Architecture & Building' component={ArchitectureAndBuilding} />
      <Route exact path='/Creative Arts, Design & Communication' component={ArtDesign} />
      <Route exact path='/Education' component={Education} />
      <Route exact path='/Engineering' component={Engineering} />
      <Route exact path='/Food & Hospitality' component={FandHospitality} />
      <Route exact path='/Humanities & Social Sciences' component={HandSScience} />
      <Route exact path='/Health & Allied Health' component={HandAHealth} />
      <Route exact path='/Information Technology' component={InformationTechnology} />
      <Route exact path='/Law' component={Law} />
      <Route exact path='/Sciences' component={Science} />
      <Route exact path='/Automotive' component={Automotive} />
      <Route exact path='/Commercial Cookery' component={CommercialCookery} />
      <Route exact path='/Early Childhood Education' component={EarlyChildhood} />
      <Route exact path='/Plumbing' component={Plumbing} />
      <Route exact path='/Painting & Decoration' component={Paintingdecoration} />
      <Route exact path='/Age Care' component={Agecare} />
      <Route exact path='/Community Services' component={Communityservices} />
      </Switch> 
      </BrowserRouter>
    </div>
    
      
  );
}

export default App;
