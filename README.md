# Meetwoyou — Modern Social Media Platform

A complete, professional, mobile-first social media web app built with pure **HTML, CSS, and JavaScript** — no build step required. Installable as a PWA. All data is stored in `localStorage` so it works fully offline as a frontend prototype, ready to plug into any backend later.

## ✨ Features

- 🔐 **Auth** — Login / Signup / Forgot password (localStorage demo)
- 🏠 **Feed** — Stories rail + post composer + infinite feed with like / comment / share / save
- 📸 **In-app Camera** — Take photos directly from device camera (front/back switch, flash overlay)
- 🎨 **Photo Editor** — Filters (Original, Mono, Vintage, Vivid, Cool, Warm, Noir, Fade), brightness / contrast / saturation sliders, crop-ratio frames, text overlay
- 📖 **Stories** — 24h ephemeral stories with viewer
- 🔎 **Explore** — Trending grid, hashtag search, suggested people
- 💬 **Messages** — Chat list + 1:1 conversation UI with typing indicator
- 🔔 **Notifications** — Likes, follows, comments, mentions
- 👤 **Profile** — Avatar, bio, stats, posts grid, edit profile
- 🛡️ **Admin Panel** — Users, posts, reports, analytics
- 🌙 Dark, modern, Apple-/Instagram-grade UI
- 📱 PWA — Installable, offline-ready service worker
- ♿ Accessible, responsive (mobile-first, works on desktop too)

## 🚀 Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `meetwoyou`)
2. Upload **all files from this folder** to the repo root
3. Settings → **Pages** → Source: `main` branch / `/ (root)` → Save
4. Visit `https://<your-username>.github.io/meetwoyou/`

Done. Add to home screen on mobile to use as a PWA.

## 📁 File structure

```
/
├─ index.html            Login / Signup
├─ feed.html             Home feed + stories
├─ camera.html           Camera + photo editor
├─ explore.html          Discovery
├─ messages.html         Chat
├─ notifications.html    Activity
├─ profile.html          User profile
├─ admin.html            Admin dashboard
├─ manifest.json         PWA manifest
├─ sw.js                 Service worker
└─ assets/
   ├─ app.css            Shared design system
   ├─ app.js             Shared logic (auth, store, UI helpers)
   ├─ icon-192.png
   ├─ icon-512.png
   ├─ apple-touch-icon.png
   └─ favicon.svg
```

## 🔌 Connecting a real backend

Replace the `Store` object inside `assets/app.js` with API calls to your backend (Firebase, Supabase, Node, etc.). Endpoints used: `auth`, `posts`, `stories`, `messages`, `notifications`, `users`.

---
© Meetwoyou
