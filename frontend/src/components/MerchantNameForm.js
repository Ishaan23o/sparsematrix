import React, { useState } from 'react';
import PinCodeForm from './PinCodeForm';

const MerchantNameForm = ({ changeSelection, selection }) => {
    const [login, changeLogin] = useState(0);
    const [merchantName, changeName] = useState('');
    const [merchantEmail, changeEmail] = useState('');
    const [merchantPassword, changePassword] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const handleLogin = (event) => {

    }

    const handleVerification = (event) => {
        changeLogin(2);
    }
    console.log(login);

    return (
        <form className="fade-in">
            {selection == 1 &&
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center mb-3">
                                <button
                                    type="button"
                                    className={`btn ${login === 0 ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => { changeLogin(0); changeEmail(''); changePassword(''); changeName(''); }}
                                    style={{ width: '40%', opacity: '85%' }}
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${login >= 1 ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => { changeLogin(1); changeEmail(''); changePassword(''); changeName(''); }}
                                    style={{ width: '40%', opacity: '85%' }}
                                >
                                    Sign up
                                </button>
                            </div>
                            {!login &&
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title text-center mb-4">Merchant Login Form</h3>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="merchantName" className="form-label">Merchant Username</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="merchantName"
                                                    placeholder="Enter merchant username"
                                                    value={merchantName}
                                                    onChange={(event) => changeName(event.target.value)}
                                                    required
                                                />
                                                <label htmlFor="merchantEmail" className="form-label">Merchant Email</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="merchantEmail"
                                                    value={merchantEmail}
                                                    onChange={(event) => changeEmail(event.target.value)}
                                                    placeholder="Enter merchant email"
                                                    required
                                                />
                                                <label htmlFor="merchantPassword" className="form-label">Merchant Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="merchantPassword"
                                                    value={merchantPassword}
                                                    onChange={(event) => changePassword(event.target.value)}
                                                    placeholder="Enter merchant password"
                                                    required
                                                />
                                            </div>
                                            <div className="d-grid gap-2">
                                                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }
                            {login >= 1 &&
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title text-center mb-4">Merchant Signup Form</h3>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="merchantName" className="form-label">Merchant Username</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="merchantName"
                                                        value={merchantName}
                                                        onChange={(event) => changeName(event.target.value)}
                                                        placeholder="Enter merchant username"
                                                        required
                                                    />
                                                    <button type="button" className={"btn ms-2 " + (login === 1 ? "btn-primary" : "btn-success")} onClick={handleVerification}>
                                                        Verify
                                                    </button>
                                                </div>

                                                <label htmlFor="merchantEmail" className="form-label">Merchant Email</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="merchantEmail"
                                                    value={merchantEmail}
                                                    onChange={(event) => changeEmail(event.target.value)}
                                                    placeholder="Enter merchant email"
                                                    required
                                                />
                                                <label htmlFor="merchantPassword" className="form-label">Merchant Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="merchantPassword"
                                                    value={merchantPassword}
                                                    onChange={(event) => changePassword(event.target.value)}
                                                    placeholder="Enter merchant password"
                                                    required
                                                />
                                            </div>
                                            <div className="d-grid gap-2">
                                                <button type="button" className="btn btn-primary" disabled={login !== 2} onClick={() => changeSelection(2)}>Signup</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {selection == 2 && <PinCodeForm />}
        </form>

    );
};

export default MerchantNameForm;
