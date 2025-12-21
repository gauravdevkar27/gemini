🚀 AI SaaS Platform: Content & Image Generator
A full-stack MERN application that provides AI-powered text and image generation services. This platform features a robust SaaS monetization model using a credit-based system, integrated with Razorpay for secure payments.

🌐 Live Demo
Click here to view the live project on Render
https://gemini-client.onrender.com

✨ Key Features
🤖 AI Text Generation: Powered by OpenAI API, allowing users to generate high-quality blog posts, code, or creative writing.

🎨 AI Image Generation: Integrated with ImageKit.io for generating and optimizing visual content.

💳 Credit System: Users consume "credits" for every AI generation.

💰 Razorpay Integration: Full checkout experience for purchasing credit bundles (Basic, Pro, Premium).

🔐 Secure Authentication: User registration and login with JWT (JSON Web Tokens).

⚡ Optimized Performance: Implemented Manual Chunking in Vite to ensure fast load times and optimized vendor bundles.

🔄 SPA Routing: Configured server-side rewrites for seamless page refreshes on Render.

🛠️ Tech Stack

Frontend
React.js (Functional Components, Hooks)

Vite (Build Tool & Dev Server)

Tailwind CSS (Styling)

React Router Dom (Client-side Routing)

Backend
Node.js & Express.js (Server Logic)

MongoDB (Database for Users, Credits, and Transactions)

Mongoose (ODM)

APIs & Services
OpenAI  (AI Text)

ImageKit.io (AI Image Handling)

Razorpay (Payment Gateway)

Render (Deployment)

⚙️ Installation & Setup
Clone the repository: 

Bash

git clone https://github.com/gauravdevkar27/gemini.git
cd gemini
Install dependencies for both Client and Server:

Bash

For backend
npm install

For frontend
cd client
npm install
Environment Variables: Create a .env file in the root directory and add:

Code snippet

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
OPENAI_API_KEY=your_openai_key
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint

Run the application:

Bash

# From client dir
npm run dev

# From server dir
 npm run server
 
🚀 Deployment Notes
Vite Optimization
To handle large library sizes, this project uses a custom vite.config.js to split node_modules into a separate vendor chunk, improving initial load speed.

SPA Refresh Fix
Since this is a Single Page Application (SPA), a Rewrite Rule was added to the hosting environment (Render) to redirect all traffic to index.html, preventing 404 - Page Not Found errors on browser refresh.

📜 License
Distributed under the MIT License.
