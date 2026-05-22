# Shree Vallabh Farashkhana & Decorators

React + Vite website for Shree Vallabh Farashkhana & Decorators, Vadodara.

## Run Locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill your real values:

```powershell
Copy-Item .env.example .env
```

## Admin Data Updates

Open `/admin`, login, and edit business info or gallery.

Admin changes are saved in browser `localStorage` and automatically broadcast to the public website in the same browser. If the public site is open in another tab, it updates when the save event/storage event fires.

Important: this is a frontend-only app. `content.json` and `gallery.json` are build-time defaults. For all visitors on the internet to see admin changes permanently, connect a backend database, CMS, Firebase/Supabase, or Cloudinary metadata API.

## EmailJS Setup

The contact form sends two emails when these values exist:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_OWNER_TEMPLATE_ID=your_owner_notification_template_id
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=your_customer_confirmation_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Owner template variables:

```text
name, mobile, email, event_type, event_date, location, message,
owner_name, owner_email, owner_mobile, business_name, reply_to
```

Customer thank-you template variables:

```text
name, mobile, email, to_email, event_type, event_date, location,
owner_name, owner_mobile, business_name
```

In EmailJS, set the customer template recipient to `{{to_email}}`. Set the owner template recipient to your owner email or `{{owner_email}}`.

## Cloudinary Setup

Admin gallery upload uses a normal device file picker and posts directly to Cloudinary's unsigned image upload endpoint:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
VITE_CLOUDINARY_FOLDER=shree-vallabh-gallery
```

Create an unsigned upload preset in Cloudinary. The admin upload stores Cloudinary `secure_url` and `public_id` on each gallery item in browser storage. Do not put Cloudinary API secret in frontend `.env`.

## Nodemailer

Nodemailer cannot safely run directly inside React/Vite browser code because SMTP passwords would be visible in the browser. This project now includes a Netlify serverless function at `netlify/functions/send-inquiry.js`, which is the proper place to use Nodemailer.

To use Nodemailer on Netlify:

1. In `.env`, set:

```env
VITE_MAIL_PROVIDER=nodemailer
VITE_NODEMAILER_ENDPOINT=/.netlify/functions/send-inquiry
```

2. In Netlify site settings, add server-only environment variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM="Shree Vallabh Decorators <your_email@gmail.com>"
OWNER_EMAIL=owner_email_that_receives_inquiries@gmail.com
```

Never prefix SMTP values with `VITE_`.

For Gmail, `SMTP_PASS` must be a Gmail App Password, not your normal Gmail password.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
