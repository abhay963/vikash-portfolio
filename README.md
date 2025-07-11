# ⚡ Vikash Kumar Yadav – Professional Portfolio

This is a modern 3D portfolio website built using **React**, **Tailwind CSS**, and **Three.js (via @react-three/fiber)** to showcase the professional journey of **Vikash Kumar Yadav**, an energy domain specialist working as a **Junior Manager – Power Trading** at **Manikaran Power Ltd**.

The website is fully responsive, visually engaging, and includes animated 3D elements and a contact form with **EmailJS integration**.

---

## 🔗 Live Preview

👉 [View Live Portfolio on Vercel](https://your-vercel-link.vercel.app)

---

## 🚀 Tech Stack

- **React 18** – Frontend Library  
- **Vite** – Lightning-fast bundler  
- **Tailwind CSS** – Utility-first styling  
- **Framer Motion** – Smooth animations  
- **@react-three/fiber** – React renderer for Three.js  
- **Drei** – Useful helpers for 3D models  
- **EmailJS** – Contact form email integration  
- **Vercel** – Hosting & Deployment  

---

## 📁 Project Structure

├── public/
│ ├── resume/
│ ├── assets/
│ └── 3D models (.glb/.gltf)
├── src/
│ ├── assets/
│ ├── components/
│ ├── constants/ ← Content: services, projects, experience
│ ├── styles/ ← Tailwind custom styles
│ ├── utils/ ← Motion config
│ ├── hoc/ ← SectionWrapper HOC
│ ├── App.jsx
│ └── main.jsx

yaml
Copy code

---

## 📬 Contact Form (EmailJS Setup)

**Environment Variables Required:**

Create a `.env` file in root (excluded via `.gitignore`):

```env
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
✅ For production: Add these variables in your Vercel Project Settings.

🛠️ How to Run Locally
bash
Copy code
git clone https://github.com/yourusername/vikash-portfolio.git
cd vikash-portfolio
npm install
npm run dev
🚀 Deployment (Vercel)


✨ Features
✅ Smooth 3D interactions using react-three-fiber

✅ Responsive design across all devices

✅ Hero section with animated scroll indicator

✅ Scroll-based animations with Framer Motion

✅ Resume & LinkedIn integration

✅ Contact form with working email functionality

✅ Minimal, professional branding

📄 License
This project is for personal and professional portfolio use only. Do not copy or redistribute without permission.