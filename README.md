# Frameworn

A monochrome, editorial-style fashion shopping site — React + TypeScript
(Vite) frontend, Node/Express + MongoDB backend. Includes full auth
(signup, login, forgot password, Google login), a shopping cart, checkout
with real order storage, and a draggable "Editorial Marquee" gallery.

## Folder structure

```
frameworn/
  server/     Node.js + Express + MongoDB backend
  client/     React + TypeScript frontend
```

## 1. Backend setup (server/)

New packages are needed for auth — run this inside `server/`:

```
cd server
npm install bcryptjs jsonwebtoken nodemailer google-auth-library
```

Your `.env` file needs these additional variables (on top of `MONGO_URI`
and `PORT` you already have):

```
GOOGLE_CLIENT_ID=your_google_client_id
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_16_character_gmail_app_password
JWT_SECRET=any_long_random_string
CLIENT_URL=http://localhost:5173
```

Seed the database with 34 products (7 outerwear, 7 tops, 7 bottoms,
6 footwear, 7 accessories):

```
node seed.js
```

Then start the server (keep this terminal running):

```
node index.js
```

## 2. Frontend setup (client/)

Open a **second terminal**:

```
cd client
npm install
```

Edit `client/.env` and fill in your Google Client ID (already scaffolded
with placeholders). Then:

```
npm run dev
```

Site runs at `http://localhost:5173`.

## What's new in this version

- **Auth system**: `/login`, `/signup`, `/forgot-password`,
  `/reset-password/:token` pages. Email/password + Google Sign-In.
  Forgot-password sends a real email via your Gmail account.
- **Cart & Checkout**: cart persists in the browser (localStorage), checkout
  requires login, and placing an order saves it to MongoDB tied to your
  account.
- **Editorial Marquee**: replaced the dome gallery — a horizontal,
  draggable, auto-scrolling strip of products. More reliable across
  browsers than the 3D sphere.
- **34 products** across 5 categories with real fashion copy and pricing.

## 3. Git & GitHub

From the `frameworn` root folder:

```
git init
git add .
git commit -m "Add auth, checkout, and editorial marquee gallery"
```

If this is your first push:
```
git remote add origin https://github.com/your-username/frameworn.git
git branch -M main
git push -u origin main
```

If you've pushed before:
```
git push
```

Your `.env` files (both `server/.env` and `client/.env`) are gitignored —
your passwords and secrets will never reach GitHub.

## 4. Deployment

**Backend → Render.com:**
- Root directory: `server`, Build: `npm install`, Start: `node index.js`
- Add all your `.env` variables in Render's dashboard as environment
  variables (MONGO_URI, GOOGLE_CLIENT_ID, EMAIL_USER, EMAIL_PASS,
  JWT_SECRET, CLIENT_URL — set CLIENT_URL to your live frontend URL once
  you have it).

**Frontend → Vercel:**
- Root directory: `client`, framework preset "Vite"
- Add environment variables in Vercel's dashboard: `VITE_API_URL` (your
  live Render backend URL + `/api`) and `VITE_GOOGLE_CLIENT_ID`.
- In Google Cloud Console, add your live Vercel URL to "Authorized
  JavaScript origins" and update the redirect URI too.

## Notes

- Product images are placeholder photos (grayscale, via picsum.photos).
  Swap the `image` URLs in `seed.js` with your own photography whenever
  ready, then re-run `node seed.js`.
- Everything is responsive down to small phone widths.
