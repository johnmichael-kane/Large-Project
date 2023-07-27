import React from 'react';

import PasswordReset from '../components/PasswordReset';

const PasswordPage = () => {
    return (
        <div>
            <body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
                <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                    <div class="container">
                        <a class="navbar-brand">Macrotracker</a>

                        <button class="navbar-toggler" type="button"
                            data-bs-toggle="collapse" data-bs-target="#navmenu">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navmenu">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <a href="/" class="nav-link">Login/Register</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </body>
            <PasswordReset />
        </div>
    );
}

export default PasswordPage;
