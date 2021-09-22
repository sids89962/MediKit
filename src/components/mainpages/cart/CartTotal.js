import React from 'react'

export default function CartTotal({ total }) {

    const taxPrice = total * 0.18 ;
    const shipping = total * 0.10;
    const totalPrice =  taxPrice + shipping + total
    return (
        <>
             <div className="paymentsummarys">              

                   <div className="paysum-row">
                        <span className="paysum-text">Transaction Code</span>
                        <span className="paysum-value">VC11476</span>   
                    </div> 
                    <div className="paysum-row">
                        <span className="paysum-text">Items Price</span>
                        <span className="paysum-value">{total}</span>   
                    </div> 
                    <div className="paysum-row">
                        <span className="paysum-text">Tax</span>
                        <span className="paysum-value">{taxPrice}</span>   
                    </div> 
                    <div className="paysum-row">
                        <span className="paysum-text">Shipping</span>
                        <span className="paysum-value">{shipping}</span>   
                    </div> 
                    <hr></hr>
                    <div className="paysum-row">
                        <span className="paysum-text">Total</span>
                        <span className="paysum-value">{totalPrice}</span>   
                    </div> 

            </div>
        </>
    )
}
