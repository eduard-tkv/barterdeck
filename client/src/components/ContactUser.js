import React from 'react';
import { Link } from 'react-router-dom';

//import '../assets/css/style.css';

const EditProfile = ()=>(
<div className="container">

      <div className="mt-5">
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
         <div className="header-content text-center">
             <h2>Contact User</h2>
         </div>
     </div>
     </div>

     <div className="row">
         <div className="col-md-12">
             <div className="form-block">
               <h2>Send Email to <span id="username">svenlexx232</span></h2>
               <div className="form login-form">
                <form className="form-horizontal" action="/action_page.php">
  
                  <div className="form-group">
                    <label for="comment">Message:</label>
                    <textarea className="form-control" rows="5" id="comment"></textarea>
                  </div>               
                  <div className="form-group">        
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="submit" className="btn btn-default">Send</button>
                    </div>
                  </div>
                </form>
               </div>
             </div>
         </div>
     </div>

    </div>
);

export default EditProfile;