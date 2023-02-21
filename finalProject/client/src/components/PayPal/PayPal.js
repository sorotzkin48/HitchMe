// import { React, useEffect, useState } from 'react';

// export default function PayPal() {

//     function initPayPalButton() {
//         var description = document.querySelector('#smart-button-container #description');
//         var amount = document.querySelector('#smart-button-container #amount');
//         var descriptionError = document.querySelector('#smart-button-container #descriptionError');
//         var priceError = document.querySelector('#smart-button-container #priceLabelError');
//         var invoiceid = document.querySelector('#smart-button-container #invoiceid');
//         var invoiceidError = document.querySelector('#smart-button-container #invoiceidError');
//         var invoiceidDiv = document.querySelector('#smart-button-container #invoiceidDiv');

//         var elArr = [description, amount];

//         if (invoiceidDiv.firstChild.innerHTML.length > 1) {
//             invoiceidDiv.style.display = "block";
//         }

//         var purchase_units = [];
//         purchase_units[0] = {};
//         purchase_units[0].amount = {};

//         function validate(event) {
//             return event.value.length > 0;
//         }

//         paypal.Buttons({
//             style: {
//                 color: 'gold',
//                 shape: 'rect',
//                 label: 'paypal',
//                 layout: 'vertical',

//             },

//             onInit: function (data, actions) {
//                 actions.disable();

//                 if (invoiceidDiv.style.display === "block") {
//                     elArr.push(invoiceid);
//                 }

//                 elArr.forEach(function (item) {
//                     item.addEventListener('keyup', function (event) {
//                         var result = elArr.every(validate);
//                         if (result) {
//                             actions.enable();
//                         } else {
//                             actions.disable();
//                         }
//                     });
//                 });
//             },

//             onClick: function () {
//                 if (description.value.length < 1) {
//                     descriptionError.style.visibility = "visible";
//                 } else {
//                     descriptionError.style.visibility = "hidden";
//                 }

//                 if (amount.value.length < 1) {
//                     priceError.style.visibility = "visible";
//                 } else {
//                     priceError.style.visibility = "hidden";
//                 }

//                 if (invoiceid.value.length < 1 && invoiceidDiv.style.display === "block") {
//                     invoiceidError.style.visibility = "visible";
//                 } else {
//                     invoiceidError.style.visibility = "hidden";
//                 }

//                 purchase_units[0].description = description.value;
//                 purchase_units[0].amount.value = amount.value;

//                 if (invoiceid.value !== '') {
//                     purchase_units[0].invoice_id = invoiceid.value;
//                 }
//             },

//             createOrder: function (data, actions) {
//                 return actions.order.create({
//                     purchase_units: purchase_units,
//                 });
//             },

//             onApprove: function (data, actions) {
//                 return actions.order.capture().then(function (orderData) {

//                     // Full available details
//                     console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

//                     // Show a success message within this page, e.g.
//                     const element = document.getElementById('paypal-button-container');
//                     element.innerHTML = '';
//                     element.innerHTML = '<h3>Thank you for your payment!</h3>';

//                     // Or go to another URL:  actions.redirect('thank_you.html');

//                 });
//             },

//             onError: function (err) {
//                 console.log(err);
//             }
//         }).render('#paypal-button-container');
//     }
//     initPayPalButton();

//     return (

//         <div>

//             <div id="smart-button-container">
//                 <div style={{ textAlign: "center" }}>
//                     <label for="description">total price </label>
//                     <input type="text" name="descriptionInput" id="description" maxlength="127" value="" />
//                     {/* </div> */}
//                     <p id="descriptionError" style={{ visibility: "hidden", color: "red", textAlign: "center" }}>Please enter a description</p>
//                     <div style={{ textAlign: "center" }} >
//                         <label for="amount">0.01 </label>
//                         <input name="amountInput" type="number" id="amount" value="" />
//                         <span> USD</span>
//                         {/* </div> */}
//                         <p id="priceLabelError" style={{ visibility: "hidden", color: "red", textAlign: "center" }}>Please enter a price</p>
//                         <div id="invoiceidDiv" style={{ textAlign: "center", display: "none" }}>
//                             <label for="invoiceid"> </label><input name="invoiceid" maxlength="127" type="text" id="invoiceid" value="" /></div>
//                         <p id="invoiceidError" style={{ visibility: "hidden", color: "red", textAlign: "center" }}>Please enter an Invoice ID</p>
//                         <div style={{ textAlign: "center", marginTop: "0.625rem" }} id="paypal-button-container"></div>
//                     </div>


//                 </div>

//             </div>
//         </div>


//     );
// }
export default function PayPal() {
    return (
        <>

            <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="BLNZ2SHX2WH36" />
                <input type="image" src="https://www.paypalobjects.com/he_IL/i/btn/btn_donate_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="תרומה באמצעות לחצן PayPal" />
                <img alt="" src="https://www.paypal.com/he_IL/i/scr/pixel.gif" width="1" height="1" />
            </form>
        </>
    )
}



