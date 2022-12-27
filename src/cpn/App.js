import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Login from './portals/Login';
import AdminHome from './admin/pages/home';
import AdminRelations from './admin/pages/relations';

import '../css/index.scss';

function App() {
    const signedIn = useSelector( state => state.signedIn );
    const dispatch = useDispatch()
    useEffect(() => {
        fetch('/api/session/check').then(res => res.json()).then((data) => {
            const { isSigned, credential } = data;

            let payload = {
                signInState: isSigned,
                credential,
            }
            dispatch({ type: "signInSwitch", payload })
        })
    }, [])

    return (
          <div>
              <Router>
                { signedIn?
                  <Routes>
                      <Route exac path = '/about' element={
                          <React.StrictMode>
                              <h1>About</h1>
                          </React.StrictMode>
                      }/>
                      <Route exac path = '/' element={
                          <React.StrictMode>
                              <AdminHome />
                          </React.StrictMode>
                      }/>
                      <Route exac path = '/relations' element={
                          <React.StrictMode>
                              <AdminRelations />
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/signout' element={
                          <React.StrictMode>
                              <SignOut />
                          </React.StrictMode>
                      }/>
                </Routes>
                :
                <Routes>
                    <Route exac path = '/' element={
                        <React.StrictMode>
                            <Login />
                        </React.StrictMode>
                    }/>
                </Routes>
                }
            </Router>
        </div>
    );
}

const SignOut = () => {
    useEffect(()=>{
        fetch('/api/signout').then(res => res.json()).then( (data) => {
            
            window.location = '/';

        })
    },[])
    return null;
}

export default App;
