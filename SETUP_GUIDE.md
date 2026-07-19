# Booking System Setup & Testing Guide

## Quick Start (5 minutes)

### 1. Install Email Service
```bash
npm install resend
```

### 2. Configure Environment
Create `.env.local` in project root:
```
RESEND_API_KEY=re_your_api_key_here
```

Get your API key:
1. Visit https://resend.com
2. Sign up (free tier available)
3. Go to API Keys
4. Copy your API key
5. Paste into `.env.local`

### 3. Update Banking Details
Open `components/sections/PaymentInstructions.tsx` and update line ~44:
```typescript
const bankingDetails = {
  accountHolder: "Your Business Name",
  bankName: "Your Bank Name",
  accountNumber: "Your Account Number",
  routingNumber: "Your Routing Number",
  currency: "TT$",
};
```

### 4. Start Dev Server
```bash
npm run dev
```

Open http://localhost:3000

---

## Complete User Journey (Test Script)

### Test Case 1: Full Booking Flow

**Step 1: Landing Page**
- [ ] Visit http://localhost:3000
- [ ] Click "View Services" button → should go to /pricing

**Step 2: Pricing Page - Services**
- [ ] See 9 service cards in grid
- [ ] Click any service card (e.g., "Content Videography")
- [ ] Service detail modal opens
- [ ] Modal shows: overview, what's included, best for, process steps
- [ ] Click "Select This Service" button

**Step 3: Pricing Page - Packages**
- [ ] Page reloads, service is highlighted
- [ ] See 5 service sections (Content, Event, BTS, Wedding, Storybook)
- [ ] Each section has 3 package tiers: Bronze, Silver, Gold
- [ ] Click any package (e.g., Gold tier of Content Videography)
- [ ] Package modal opens

**Step 4: Package Modal - Add-ons**
- [ ] Modal shows package features list
- [ ] Modal shows "Best For" tags
- [ ] Optional Add-Ons section with toggle buttons:
  - "Additional Hour" - TT$150
  - "Additional Edited Video" - TT$100
  - "Raw Footage" - TT$200
  - "Rush Delivery" - TT$250
- [ ] Click "Additional Hour" toggle
- [ ] Toggle changes color (gold background)
- [ ] Estimated Total updates: 800 + 150 = 950
- [ ] Click "Continue to Booking" button

**Step 5: Contact Form - Booking Summary**
- [ ] Redirected to /contact
- [ ] See "Your Booking Summary" box at top
- [ ] Summary shows:
  - Service: Content Videography
  - Package: Gold - TT$800
  - Add-Ons: Additional Hour - TT$150
  - Estimated Total: TT$950
- [ ] Form fields below: Name, Email, Phone, Contact Method, Project Type, Budget, Date, Details
- [ ] Project Type pre-filled with "Content Videography"
- [ ] Fill remaining fields:
  ```
  Name: John Smith
  Email: john@example.com
  Phone: +1 (868) 555-1234
  Contact Method: WhatsApp
  Budget: TT$800 – TT$1,300
  Date: [select future date]
  Details: I need a 60-second promotional video for my product launch.
  ```
- [ ] Click "Continue to Payment" button

**Step 6: Contact Form Success & Redirect**
- [ ] Button shows "Processing..." state
- [ ] After 1.5 seconds, button shows "✓ Redirecting to Payment..."
- [ ] Redirected to /payment automatically

**Step 7: Payment Instructions Page**
- [ ] See full booking summary on left
- [ ] Summary shows:
  - Service: Content Videography
  - Package: Gold
  - Add-Ons: Additional Hour
  - Amount Due: TT$950
- [ ] See "Bank Transfer Details" section:
  - Account Holder
  - Bank Name
  - Account Number (with copy button)
  - Routing Number (with copy button)
- [ ] Click copy button next to Account Number
  - Button changes to ✓ checkmark briefly
  - Copy succeeds
- [ ] See 3 payment method cards:
  - Bank Transfer
  - Payment Plan
  - WhatsApp Inquiry
- [ ] Right sidebar (sticky on desktop):
  - File upload for proof of payment
  - "Contact via WhatsApp" button (green)
  - Next Steps checklist
- [ ] Click "Contact via WhatsApp" button
  - Opens WhatsApp with pre-filled message
  - Close WhatsApp window, return to page
- [ ] Click file upload area
  - Opens file picker
  - Select a PDF or image file
  - Shows: "✓ Proof of payment uploaded. We'll verify within 24 hours."

**Step 8: Verify Emails Sent**
- [ ] Check server console logs
- [ ] Should see:
  ```
  Contact form submission: {
    fullName: "John Smith",
    email: "john@example.com",
    ...
    clientEmailSent: true,
    adminEmailSent: true
  }
  ```
- [ ] Check email inbox (john@example.com)
  - Should receive HTML email with subject: "Your Project Inquiry - Designs by Jeninne"
  - Email includes: service name, estimated total, payment instructions link
- [ ] Check admin email inbox (designsbyjeninne@gmail.com)
  - Should receive HTML email with subject: "New Booking: Content Videography - John Smith"
  - Email includes: client info, service details, project details, estimated total

---

### Test Case 2: Modifying Selections

**Step 1: Return to Pricing**
- [ ] From /payment page, click "Pricing" in nav
- [ ] Go back to /pricing

**Step 2: Change Service**
- [ ] Click different service card (e.g., "Wedding Videography")
- [ ] Service detail modal opens
- [ ] Click "Select This Service"
- [ ] See pricing packages section

**Step 3: Change Package**
- [ ] Click different package (e.g., Silver tier of Wedding)
- [ ] Package modal opens with different features and add-ons
- [ ] Price is different (TT$1500 instead of TT$800)
- [ ] Different add-ons available (e.g., "Additional Hour" - TT$250 instead of TT$150)
- [ ] Click "Continue to Booking"
- [ ] Contact form should show new service/package/total

---

### Test Case 3: Mobile Responsive

**Step 1: Mobile View (375px)**
- [ ] Open DevTools (F12)
- [ ] Set viewport to iPhone 12 (390px) or similar
- [ ] Test /pricing page
  - Service cards stack vertically (1 column)
  - Package cards stack vertically (1 column)
  - All text readable, no horizontal scroll
- [ ] Test /contact page
  - Form fields stack vertically
  - Booking summary displays correctly
  - "Continue to Payment" button spans full width
- [ ] Test /payment page
  - Sticky sidebar moves to bottom on mobile
  - File upload works on mobile
  - WhatsApp button spans full width
  - All elements responsive

---

### Test Case 4: Error Handling

**Step 1: Form Validation**
- [ ] Go to /contact
- [ ] Click "Continue to Payment" without filling form
- [ ] See error messages:
  - "Full name is required"
  - "Email is required"
  - "Invalid email format"
  - "Phone is required"
  - "Please select preferred contact method"
  - "Please select a project type"
  - "Please select a budget range"
  - "Please select a preferred date"
  - "Project details are required"
- [ ] Fill only Name field
- [ ] Click submit
- [ ] See errors for remaining required fields
- [ ] Errors disappear as you fill fields

**Step 2: Email Service Down**
- [ ] Remove RESEND_API_KEY from .env.local or set to invalid key
- [ ] Restart dev server
- [ ] Go through booking flow
- [ ] Submit contact form
- [ ] Check console - should show email service not configured warning
- [ ] Button should still show success (can enhance this UX)
- [ ] Still redirects to payment page

---

## Manual Testing Checklist

### Core Functionality
- [ ] Service detail modals open/close smoothly
- [ ] Package modals show/hide add-ons correctly
- [ ] Add-on selection toggles update total in real-time
- [ ] Booking context persists across page navigation
- [ ] Contact form pre-fills with selected service
- [ ] Payment page shows correct booking summary
- [ ] Email service sends both client and admin emails

### Design & UX
- [ ] All text is readable on all screen sizes
- [ ] Buttons are clickable and give visual feedback
- [ ] Modals have proper backdrop blur
- [ ] Animations are smooth (no jank)
- [ ] Form errors display with red text
- [ ] Success states show with checkmarks
- [ ] Loading states show "Processing..." text

### Performance
- [ ] Page loads quickly (< 2 seconds)
- [ ] No console errors or warnings
- [ ] No hydration mismatch warnings
- [ ] Smooth scrolling between sections
- [ ] Modal opens/closes without lag

### Browser Compatibility
- [ ] Works in Chrome
- [ ] Works in Safari
- [ ] Works in Firefox
- [ ] Responsive on mobile browsers

---

## Debugging Tips

### Issue: Emails not sending
**Solution:**
1. Check `.env.local` has `RESEND_API_KEY=...`
2. Verify API key in https://resend.com dashboard
3. Check server console for error messages
4. Try with a different email service (SendGrid, etc.)

### Issue: Booking data not persisting
**Solution:**
1. Check DevTools Console for errors
2. Verify BookingProvider wraps entire app in layout.tsx
3. Check useBooking() hook is called in components
4. Clear browser cache/localStorage

### Issue: Modal not showing
**Solution:**
1. Check z-index is set correctly (should be z-40/z-50)
2. Check onClick handler is wired up
3. Verify AnimatePresence is wrapping modal
4. Check state variable for modal open/close

### Issue: Form not submitting
**Solution:**
1. Check form validation errors in console
2. Verify all required fields are filled
3. Check API route exists at /api/contact
4. Check network tab in DevTools for API response

---

## Production Checklist Before Launch

- [ ] RESEND_API_KEY configured in production environment
- [ ] Banking details updated with real account info
- [ ] Admin email updated (currently designsbyjeninne@gmail.com)
- [ ] WhatsApp number updated (currently +1 (868) 344-5101)
- [ ] All placeholder content replaced with real content
- [ ] Logo and imagery optimized
- [ ] Privacy policy and terms of service added
- [ ] Contact information verified
- [ ] Test full booking flow with real email address
- [ ] Performance tested on slower networks
- [ ] SEO metadata verified for all pages
- [ ] Analytics set up (Google Analytics, etc.)
- [ ] 404 page customized
- [ ] Error handling tested
- [ ] Mobile testing on real devices (iOS & Android)

---

## Environment Variables Reference

```bash
# .env.local (development)
RESEND_API_KEY=re_xxx_xxx

# .env.production (production)
RESEND_API_KEY=re_xxx_xxx
```

---

## Helpful Links

- **Resend Docs**: https://resend.com/docs
- **Next.js API Routes**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **React Context**: https://react.dev/reference/react/useContext
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Ready to test!** Follow the user journey above to verify all features work correctly.
