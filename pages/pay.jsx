import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
height : 100vh;
display:flex; 
align-items: center;
justify-content: center;
`;
const Button = styled.button`
border: none; 
padding 20px; 
border-radius: 5px; 
width: 120px;
cursor: pointer; `;
const Pay = () => {

    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate()
    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 23000,
                    });
                console.log(res.data);
                history("/success");

            } catch (err) {
                console.log(err)
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken])
    return (
        <Container>
            {stripeToken ? (<span>PROCESSING, PLEASE WAIT!</span>) : (
                <StripeCheckout
                    name="BONDO12 CLOTHING"
                    billingAddress
                    shippingAddress
                    description='YOUR TOTAL IS RM 230'
                    amount={23000}
                    token={onToken}
                    stripeKey={import.meta.env.VITE_TEST_KEY}
                >
                    <Button>PAY NOW</Button>
                </StripeCheckout>
            )}

        </Container>
    )
};

export default Pay;
