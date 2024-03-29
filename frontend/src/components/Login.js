import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'
import MerchantNameForm from './MerchantNameForm';
import PinCodeForm from './PinCodeForm';

export default function Login() {
    const [selection, changeSelection] = useState(0);
    const navigate = useNavigate();
    const containerStyle = {
        backgroundImage: 'url("https://images.unsplash.com/photo-1653330963134-329a61aedc68?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(10, 10, 50, 0.7), rgba(50, 0, 0, 0.1))',
    };

    const buttonStyle = {
        width: '100%',
        marginBottom: '15px',
        fontSize: '1.5rem',
        transition: '0.3s',
    };

    return (
        <>
            {!selection &&
                <div style={containerStyle}>
                    <div style={overlayStyle}></div>
                    <div className="col-md-6 offset-md-3 text-light text-center">
                        <h1 className="mb-4">Welcome to Our Platform</h1>
                        <p className="lead mb-4">Login as a Merchant / Buyer</p>
                        <button type="button" className="btn btn-primary" style={{ backgroundColor: 'rgba(10, 0, 200, 0.75)', ...buttonStyle }} onClick={() => navigate('../home')}>
                            Enter as Buyer
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#merchantLoginModal"
                            style={{ backgroundColor: 'rgba(200, 0, 10, 0.75)', ...buttonStyle }}
                            onClick={() => changeSelection(1)}
                        >
                            Merchant Login
                        </button>
                    </div>
                </div>
            }
            {selection >= 1 && <MerchantNameForm changeSelection={changeSelection} selection={selection} />
            }

        </>
    );
}
