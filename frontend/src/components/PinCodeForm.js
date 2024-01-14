import React, { useRef, useState } from 'react';
import AddCode from './AddCode';
import { IoAddCircleOutline } from "react-icons/io5";

const PinCodeForm = ({ onSubmit }) => {
    const [numbercodes, changeNumber] = useState(0);
    const [newcode, changeCode] = useState('');
    const pincodes = useRef(new Set());
    const handleSignup = (event) => {
        event.preventDefault();
        onSubmit();
    };

    const handlePincode = async () => {
        pincodes.current.add(newcode);
        if (numbercodes != pincodes.current.size) {
            changeNumber(pincodes.current.size);
        }
    }
    console.log(pincodes)
    console.log(numbercodes)
    return (
        <form className="fade-in">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">Merchant Login Form</h3>
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="pincodes" className="form-label">Enter the Pincodes you can deliver to</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="pincodes"
                                                value={newcode}
                                                onChange={(event) => changeCode(event.target.value)}
                                                placeholder="Enter pincode"
                                                required
                                            />
                                            <button type="button" className="btn btn-success" onClick={handlePincode}><IoAddCircleOutline /></button>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="button" className="btn btn-primary" onClick={handleSignup}>Finish Signup</button>
                                    </div>
                                    <div class="card m-3 mt-5" style={{ width: 'inherit' }}>
                                        <div class="card-header">
                                            Added Codes
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            {Array.from(pincodes.current).map((element) => {
                                                return <AddCode key={element} element={element} />
                                            })}
                                        </ul>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PinCodeForm;
