import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Typography, Button, FormControl, InputLabel, Input, FormHelperText, InputBase } from '@material-ui/core';
import './CreateOrder.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEventContext } from '../../common/EventContext/EventContext';



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
    const location = useLocation();
    const navigate = useNavigate();
    const Token = localStorage.getItem('Token');
    const [address, setAddressState] = useState('');
    const { setEvent } = useEventContext();


    const GetAddress = async (e) => {

        fetch('http://localhost:3001/api/v1/addresses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': Token,
            },
        })

            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data && data.length > 0) {
                    setAddressState(data[0]);
                    setContactNumber(data[0].contactNumber);
                    setName(data[0].name);
                    setCity(data[0].city);
                    setZipCode(data[0].zipCode);
                    setLandmark(data[0].landmark);
                    setState(data[0].state);
                    setStreet(data[0].street);
                }
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });



    };

    const setAddress = async () => {
        try {
            fetch('http://localhost:3001/api/v1/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': Token,
                },
                body: JSON.stringify({
                    name: name,
                    contactNumber: contactNumber,
                    city: city,
                    zipCode: zipCode,
                    landmark: landmark,
                    state: state,
                    street: street
                }),
            })

                .then(response => response.json())
                .then(async data => {
                    setAddressState(data._doc);
                    await createOrder();

                })
                .catch(error => {
                    console.error('An error occurred:', error);
                });

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const createOrder = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        fetch('http://localhost:3001/api/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': Token,
            },
            body: JSON.stringify({
                address: address,
                user: user,
                product: location.state._id,
                quantity: location.state.quantity
            }),
        })

            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                } else {
                    setActiveStep((prevActiveStep) => prevActiveStep + 2);
                }
            })
            .catch(error => {
                console.error('An error occurred:', error);
                setEvent({
                    isEvent: true,
                    type: 'error',
                    message: error.message
                })
            });


    }

    const handleNext = async (e) => {
        e.preventDefault();
        await setAddress();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if (activeStep === 1) {
            navigate(`/products/${location.state._id}`);
        }
    };

    const handleChange = (setState, e) => {
        setState(e.target.value);
    };

    useEffect(() => {
        GetAddress();
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setName(user.name);
        }
    }, []);

    return (

        <div className='create__order'>
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
                    <div className="form-container">
                        <div className="checkout-container">
                            <div className="shipping-address">
                                <h2>Shipping Address</h2>

                                <form onSubmit={handleNext}>
                                    <FormControl className="form-field">
                                        <InputLabel htmlFor="contact-number">Contact Number</InputLabel>
                                        <Input
                                            id="contact-number"
                                            aria-describedby="contact-number-helper-text"
                                            value={contactNumber}
                                            onChange={(e) => handleChange(setContactNumber, e)}
                                        />
                                        <FormHelperText id="contact-number-helper-text">Enter your contact number</FormHelperText>
                                    </FormControl>

                                    <FormControl className="form-field">
                                        <InputLabel htmlFor="name">Name</InputLabel>
                                        <Input
                                            id="name"
                                            aria-describedby="name-helper-text"
                                            value={name}
                                            disabled
                                        />
                                        <FormHelperText id="name-helper-text">Your fullname</FormHelperText>
                                    </FormControl>

                                    <FormControl className="form-field">
                                        <InputLabel htmlFor="city">City</InputLabel>
                                        <Input
                                            id="city"
                                            aria-describedby="city-helper-text"
                                            value={city}
                                            onChange={(e) => handleChange(setCity, e)}
                                        />
                                        <FormHelperText id="city-helper-text">Enter your city</FormHelperText>
                                    </FormControl>

                                    <FormControl className="form-field">
                                        <InputLabel htmlFor="zip-code">Zip Code</InputLabel>
                                        <Input
                                            id="zip-code"
                                            aria-describedby="zip-code-helper-text"
                                            value={zipCode}
                                            onChange={(e) => handleChange(setZipCode, e)}
                                        />
                                        <FormHelperText id="zip-code-helper-text">Enter your zip code</FormHelperText>
                                    </FormControl>

                                    <FormControl className="form-field">
                                        <InputLabel htmlFor="landmark">Landmark</InputLabel>
                                        <Input
                                            id="landmark"
                                            aria-describedby="landmark-helper-text"
                                            value={landmark}
                                            onChange={(e) => handleChange(setLandmark, e)}
                                        />
                                        <FormHelperText id="landmark-helper-text">Enter a landmark</FormHelperText>
                                    </FormControl>

                                    <FormControl className="form-field">
                                        <InputLabel htmlFor="state">State</InputLabel>
                                        <Input
                                            id="state"
                                            aria-describedby="state-helper-text"
                                            value={state}
                                            onChange={(e) => handleChange(setState, e)}
                                        />
                                        <FormHelperText id="state-helper-text">Enter your state</FormHelperText>
                                    </FormControl>

                                    <FormControl className="form-field">
                                        <InputLabel htmlFor="street">Street</InputLabel>
                                        <Input
                                            id="street"
                                            aria-describedby="street-helper-text"
                                            value={street}
                                            onChange={(e) => handleChange(setStreet, e)}
                                        />
                                        <FormHelperText id="street-helper-text">Enter your street</FormHelperText>
                                    </FormControl>
                                </form>
                            </div>
                            <div className="product-info">
                                <h2>Product Information</h2>
                                <div className='orderproduct__content'>
                                    <div className='product__img'>
                                        <img src={location.state.imageURL} alt={location.state.name} />
                                    </div>
                                    <div className='product__details'>
                                        <Typography variant='h5'>{location.state.name}</Typography>
                                        <hr />
                                        <Typography variant='subtitle1'>Quantity <span> {location.state.quantity}</span></Typography>
                                        <Typography variant='subtitle1'>Price <span> ${location.state.price}</span></Typography>
                                        <hr />
                                        <Typography variant='h2'>Total Price <span> ${location.state.quantity * location.state.price}</span></Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    )
}

export default CreateOrder

