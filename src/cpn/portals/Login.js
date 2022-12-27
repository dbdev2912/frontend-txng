import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default () => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const dispatch = useDispatch();

    const submit = async () => {
        fetch('/api/login', {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ username, password })
        }).then( res => res.json()).then( (data) => {
            const { code, credential } = data;

            if( code === 200 ){
                let payload = {
                    signInState: true,
                    credential,
                }
                dispatch({ type: "signInSwitch", payload })
            }
        })
    }

    return(
        <div className="full-screen flex flex-center flex-middle login">
            <div className="container">
                <div className="flex flex-wrap box-fit">
                    <div className="w-67 content pg-t-0-5 pg-l-2 pg-r-5 pg-b-0-5">
                        <h1 className="block text-theme">Welcome</h1>
                        <p className="block text-theme text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className="w-33 flex flex-center flex-middle form">
                        <div className="form-container w-67 mg-auto">
                            <div className="form-label mg-t-1">
                                <span className="text-theme block text-center text-big">SIGN IN</span>
                            </div>
                            <div className="form-field mg-t-1">
                                <input className="input-outline w-fit pg-t-0-5 pg-l-0.5 pg-r-0-5 pg-b-0-5 text-center" value={username} onChange={(e) => { setUsername(e.target.value) }}/>
                            </div>
                            <div className="form-field mg-t-1">
                                <input className="input-outline w-fit pg-t-0-5 pg-l-0.5 pg-r-0-5 pg-b-0-5 text-center" value={password} type="password" onChange={(e) => { setPassword(e.target.value) }}/>
                            </div>
                            <div className="flex flex-no-wrap mg-t-1">
                                <div className="block w-50 flex flex-no-wrap">
                                    <input type="checkbox" value="Remember me"/>
                                    <span className="text-theme text-small">Remember me</span>
                                </div>
                                <div className="block w-50">
                                    <span className="text-theme text-small text-right">Forgot password?</span>
                                </div>
                            </div>
                            <div className="form-submit mg-t-1">
                                <button className="button-theme block w-fit pg-t-0-5 pg-l-0.5 pg-r-0-5 pg-b-0-5" onClick={submit}>Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// <input value={username} onChange={(e) => { setUsername(e.target.value) }}/>
// <input value={password} onChange={(e) => { setPassword(e.target.value) }}/>
// <button onClick={submit}>login</button>
