import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function PageTitle()
{
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);

  const doLogout = event => 
  {
    event.preventDefault();

      localStorage.removeItem("user_data")
      window.location.href = '/';

  };  
   return(
    <div>
      <body>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
          <div class="container">
            <a href="#" class="navbar-brand">Macrotracker</a>

            <button class="navbar-toggler" type="button" 
            data-bs-toggle="collapse" data-bs-target="#navmenu">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navmenu">
              <ul class ="navbar-nav ms-auto">
                <li class="nav-item">
                  <a href="#" class="nav-link">Meal Plans</a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">Add Food</a>
                </li>
                <button type="button" id="logoutButton" class="buttons" 
                onClick={doLogout}> Log Out </button>
              </ul>
            </div>
          </div>
        </nav>
      </body>
    </div> 
   );
};

export default PageTitle;
