# 💳 QPay Mongolia Integration Guide

## Overview
PetSpot now uses **QPay Mongolia** for payment processing. QPay is a unified payment platform that allows customers to pay through all major Mongolian banks and payment systems.

## How It Works

### Payment Flow
1. **User clicks "💳 QPay дээр 3,000 ₮ төлөх"** on `/post/payment` page
2. **QPay payment page opens** in a new window with all available banks:
   - 🏦 XAC
   - 🏦 Khan Bank
   - 🏦 Golomt Bank
   - 🏦 State Bank
   - 🏦 And all other banks on QPay
3. **User completes payment** using their preferred bank
4. **Payment confirmation** is verified and stored
5. **Redirect to post creation** where user can create their post
6. **Post published publicly** on lost-found page

### Technical Implementation

#### Payment Page (`/app/post/payment/page.jsx`)
- Shows payment amount: **3,000 ₮**
- Displays what customer gets with the payment
- Opens QPay deep link when "Pay" button clicked
- Uses QPay URL format: `https://qpay.mn/payment/{invoiceId}?amount={amount}&description={description}&returnUrl={callbackUrl}`

#### Payment Success Page (`/app/post/payment/success/page.jsx`)
- Verifies payment completion
- Stores payment confirmation in localStorage
- Redirects to post creation page

#### Post Creation (`/app/post/create/page.jsx`)
- Checks if payment is verified
- Only allows post creation if payment exists
- Clears payment after one post (one-post-per-payment model)

## QPay Deep Link Format

```
https://qpay.mn/payment/{invoiceId}
?amount={amount}
&description={description}
&returnUrl={callbackUrl}
```

**Parameters:**
- `invoiceId`: Unique invoice identifier (e.g., `PETSPOT_userid_timestamp`)
- `amount`: Payment amount in tugrik (3000)
- `description`: Payment description
- `returnUrl`: Callback URL after payment (e.g., `/post/payment/success`)

## Integration Example

```javascript
const qpayLink = `https://qpay.mn/payment/${invoiceId}
  ?amount=${amount}
  &description=${description}
  &returnUrl=${encodeURIComponent(callbackUrl)}`;

const paymentWindow = window.open(qpayLink, '_blank');
```

## Supported Banks on QPay

✅ XAC (State Bank Digital)
✅ Khan Bank
✅ Golomt Bank
✅ State Bank
✅ Trade and Development Bank
✅ Capitron Bank
✅ Chinggis Khaan Bank
✅ Peace Bank
✅ Bogd Bank
✅ And all other QPay partner banks

## Testing

### Test Payment Flow
1. Go to `/post/create`
2. If not paid, click "💳 3,000 ₮ төлөх"
3. On `/post/payment` page, click "💳 QPay дээр 3,000 ₮ төлөх"
4. QPay payment page opens
5. Complete payment using test bank details
6. Return to success page
7. Automatically redirect to `/post/create` to create post

### Demo Mode
Currently, the payment is simulated locally using localStorage. In production, integrate the QPay API for real payment verification.

## Production Setup

To enable real QPay payments in production:

1. **Get QPay Merchant Account**
   - Register at qpay.mn
   - Get merchant ID and API key

2. **Update Payment Verification**
   - Replace localStorage with actual QPay API verification
   - Store payment records in Firestore instead of localStorage
   - Implement webhook handlers for payment confirmation

3. **Update Post Creation Check**
   ```javascript
   // Verify payment in Firestore instead of localStorage
   const paymentRef = doc(db, 'payments', `${user.uid}_${paymentId}`);
   const paymentSnap = await getDoc(paymentRef);
   ```

## Current Status

✅ **Implemented:**
- QPay deep link integration
- Payment page with bank selection
- Success/failure handling
- Post creation after payment
- One-post-per-payment model

🔄 **To Do (Production):**
- Real QPay API integration
- Webhook payment verification
- Firestore payment storage
- Payment history tracking
- Admin dashboard for payments

## Support

For more information about QPay Mongolia:
- Website: https://qpay.mn
- Documentation: https://qpay.mn/developers
- Support: support@qpay.mn
