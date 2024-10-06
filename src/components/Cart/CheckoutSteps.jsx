import { Typography, Step, StepLabel, Stepper } from '@mui/material';
import React, { Fragment } from 'react';
import { MdOutlinePayments } from "react-icons/md";
import { FaShippingFast, FaTasks } from "react-icons/fa";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icons: <FaShippingFast />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icons: <FaTasks />
        },
        {
            label: <Typography>Payment</Typography>,
            icons: <MdOutlinePayments />
        }
    ];

    return (
        <Fragment>
            <div className='flex justify-center items-center w-full py-6 '>
                <Stepper activeStep={activeStep} alternativeLabel className="w-full max-w-2xl">
                    {steps.map((item, index) => (
                        <Step key={index} active={activeStep === index} completed={activeStep >= index}>
                            <StepLabel
                                icon={
                                    <div className={`p-2 rounded-full ${activeStep >= index ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'}`}>
                                        {item.icons}
                                    </div>
                                }
                            >
                                <h1 className={`text-sm font-semibold ${activeStep >= index ? 'text-white' : 'text-gray-300'} transition-all duration-300`}>
                                    {item.label}
                                </h1>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </Fragment>
    );
}

export default CheckoutSteps;
