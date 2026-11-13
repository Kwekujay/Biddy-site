# Deploying BIDDY: staging first, then launch

WHAT THIS PACKAGE IS
- The BIDDY website with hosting settings, security headers, app icons, and the hidden admin address /biddy360control.
- STATUS: the site still keeps customer data (accounts, orders, products) inside each visitor's own browser. It is NOT connected to Supabase yet, and online payments are off. Deploy it as a private staging copy to practise and check it on a real address. Do not tell customers about it yet.

FILES (keep them all in one flat folder, no sub-folders)
index.html, config.js, vercel.json, robots.txt, manifest.webmanifest, icon-192.png, icon-512.png, apple-touch-icon.png

PART 1: PUT THE FILES ON GITHUB (works on a phone)
1. Unzip the package in the Files app.
2. Sign in at github.com. Tap + then New repository. Name it biddy-site, choose Private, tap Create repository.
3. On the new repo page tap "uploading an existing file". Choose ALL the files from the unzipped folder. Tap Commit changes.

PART 2: PUBLISH WITH VERCEL
1. Sign up at vercel.com with your GitHub account.
2. Add New, Project, pick biddy-site, tap Import.
3. Framework Preset: Other. Leave Build Command and Output Directory empty. Tap Deploy.
4. You get an address like https://biddy-site-xxxx.vercel.app. Open it on your phone and check: home page, menu, a product, cart, Help Center.
5. Check the admin address: https://YOUR-ADDRESS/biddy360control should send you to the home page when you are signed out.

PART 3: TELL SUPABASE AND YOUR PAYMENT FUNCTION THE ADDRESS
1. Supabase, Authentication, URL Configuration: set Site URL to your Vercel address and add it under Redirect URLs.
2. Supabase, Edge Functions, Secrets: add SITE_URL with the same address (no slash at the end).
3. config.js (open it on GitHub, tap the pencil): paste your public anon key. It is safe to publish. NEVER paste a secret key (sk_...) or the service_role key.

BEFORE REAL CUSTOMERS (do all of these)
1. Connect the site to Supabase (the next build step). Until then nothing is shared between devices.
2. Hosting plan: Vercel's free Hobby plan is for non-commercial use only (check their current terms). Use a paid plan, or another host that allows commercial use, before you sell.
3. Supabase plan: free projects pause after about a week without use and have no daily backups. Use the Pro plan for the live shop.
4. Sign-up emails: Supabase's built-in email sender is very limited. Add your own email service (SMTP) so confirmation and password-reset emails always arrive.
5. Paystack live: put the live secret key in Supabase Secrets (replace the test one), set the LIVE webhook URL (your Project URL + /functions/v1/payments/webhook), switch off test mode.
6. Apple Pay: ask Paystack to enable it. They will give you a domain verification file to host at /.well-known/ on your domain.
7. Custom domain: Vercel, Settings, Domains. Then update Site URL, Redirect URLs and SITE_URL to the new address.
8. Launch day: in vercel.json delete the FIRST block (the one with X-Robots-Tag "noindex, nofollow" for "/(.*)"), and in config.js set allowIndexing to true. Keep config previewAdmin false.
9. Make a small real purchase with Mobile Money and with a card. Refund yourself in Paystack.
10. Lawyer reads the Terms and Privacy pages. Update the "Last updated" date.
11. Admin account: strong unique password, two-factor sign-in (to be built into the connected site).

KEEP SECRET
Paystack secret key, Supabase service_role key, database password, admin password. They go only inside Supabase / Paystack dashboards.
