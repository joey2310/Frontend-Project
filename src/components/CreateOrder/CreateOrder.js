import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Typography, Button, FormControl, InputLabel, Input, FormHelperText, InputBase } from '@material-ui/core';

function getSteps() {
    return ['Product Details', 'Add Address', 'Order Confirmed'];
}



function CreateOrder() {

    const [activeStep, setActiveStep] = useState(1);
    const steps = getSteps();
    const [contactNumber, setContactNumber] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [landmark, setLandmark] = useState('');
    const [state, setState] = useState('');
    const [street, setStreet] = useState('');

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (setState, e) => {
        setState(e.target.value);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setName(user.name);
        }
    }, []);

    return (
        <div>
            <h2>
                CreateOrder
            </h2>
            <div>
                <Stepper alternativeLabel activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography>
                                Your order is confirmed
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            <FormControl>
                                <InputBase>Hello</InputBase>
                                <InputLabel htmlFor="contact-number">Contact Number</InputLabel>
                                <Input
                                    id="contact-number"
                                    aria-describedby="contact-number-helper-text"
                                    value={contactNumber}
                                    onChange={(e) => handleChange(setContactNumber, e)}
                                />
                                <FormHelperText id="contact-number-helper-text">Enter your contact number</FormHelperText>
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    id="name"
                                    aria-describedby="name-helper-text"
                                    value={name}
                                    disabled
                                />

                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="city">City</InputLabel>
                                <Input
                                    id="city"
                                    aria-describedby="city-helper-text"
                                    value={city}
                                    onChange={(e) => handleChange(setCity, e)}
                                />
                                <FormHelperText id="city-helper-text">Enter your city</FormHelperText>
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="zip-code">Zip Code</InputLabel>
                                <Input
                                    id="zip-code"
                                    aria-describedby="zip-code-helper-text"
                                    value={zipCode}
                                    onChange={(e) => handleChange(setZipCode, e)}
                                />
                                <FormHelperText id="zip-code-helper-text">Enter your zip code</FormHelperText>
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="landmark">Landmark</InputLabel>
                                <Input
                                    id="landmark"
                                    aria-describedby="landmark-helper-text"
                                    value={landmark}
                                    onChange={(e) => handleChange(setLandmark, e)}
                                />
                                <FormHelperText id="landmark-helper-text">Enter a landmark</FormHelperText>
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="state">State</InputLabel>
                                <Input
                                    id="state"
                                    aria-describedby="state-helper-text"
                                    value={state}
                                    onChange={(e) => handleChange(setState, e)}
                                />
                                <FormHelperText id="state-helper-text">Enter your state</FormHelperText>
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="street">Street</InputLabel>
                                <Input
                                    id="street"
                                    aria-describedby="street-helper-text"
                                    value={street}
                                    onChange={(e) => handleChange(setStreet, e)}
                                />
                                <FormHelperText id="street-helper-text">Enter your street</FormHelperText>
                            </FormControl>

                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack}>
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}

                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateOrder