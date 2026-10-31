# NinjaShield

Defensive cybersecurity web project.

## Deploy
Upload this folder to GitHub, then import the repository into Vercel.

## Supabase
Project URL sudah disiapkan:
https://umzgmozuiigugboughlp.supabase.co

Isi publishable key kamu pada:
- `app.js`
- `supabase/config.js`

Gunakan hanya **publishable/anon key** pada frontend. Jangan memasukkan `service_role` key.

## Scanner
Scanner bekerja lokal di browser dan memeriksa pola defensif seperti:
- eval()
- innerHTML assignment
- document.write()
- kemungkinan hard-coded secrets
- external URLs
- debug logging

Ini adalah static pattern scanner, bukan jaminan bahwa project bebas dari semua vulnerability.
