# Personal Portfolio Website

This is a modern, responsive, and interactive personal portfolio website built with HTML, CSS, and JavaScript. It's designed to showcase your skills, projects, and provide an easy way for visitors to contact you or download your resume.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_BADGE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys) <!-- Optional: Add if you deploy to Netlify -->

**Live Demo:** [Link to your live demo - e.g., GitHub Pages or Netlify link]

![Screenshot of the Portfolio Website](./screenshot.png)
*(You'll need to add a `screenshot.png` to your repository for this to display)*

---

## Features

*   **Responsive Design:** Looks great on desktops, tablets, and mobile devices.
*   **Smooth Scrolling:** Seamless navigation between sections.
*   **Interactive Navigation:**
    *   Sticky header that stays visible on scroll.
    *   Active link highlighting to indicate the current section.
    *   Mobile-friendly hamburger menu.
*   **Hero Section:**
    *   Engaging introduction with a dynamic typing effect for the tagline.
*   **About Me Section:** Space to share your background, skills, and interests.
*   **Projects Showcase:** Grid layout to display your work with links to live versions and code repositories.
*   **Contact Me Section:**
    *   Functional (front-end only) contact form.
    *   Direct email link and social media connections.
*   **Resume Download:** Easy access for visitors to download your resume (PDF).
*   **Scroll-to-Top Button:** Appears on scroll for quick navigation back to the top.
*   **Scroll-Reveal Animations:** Subtle animations for sections as they scroll into view.
*   **Iconography:** Uses Font Awesome for clean and modern icons.
*   **Custom Fonts:** Utilizes Google Fonts for better typography.
*   **Clean Code:** Well-structured HTML, CSS (with custom properties/variables), and JavaScript.

---

## Tech Stack

*   **HTML5:** Semantic markup for website structure.
*   **CSS3:**
    *   Custom Properties (Variables) for easy theming.
    *   Flexbox and Grid for layout.
    *   Responsive design with Media Queries.
    *   Transitions and Animations.
*   **JavaScript (ES6+):**
    *   DOM Manipulation for interactivity.
    *   Event Handling.
    *   Intersection Observer API for scroll animations.
*   **Font Awesome:** For icons.
*   **Google Fonts:** For typography (`Poppins` and `Roboto Slab`).

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

No special prerequisites are needed other than a modern web browser.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repository-name.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd your-repository-name
    ```
3.  **Open `index.html` in your browser:**
    You can simply double-click the `index.html` file, or right-click and choose "Open with [your browser]".

---

## Customization Guide

Make this portfolio your own by customizing the content and appearance.

### 1. Update Content (`index.html`)

Open `index.html` in a text editor and modify the following:

*   **Page Title:** Change `<title>Your Name - Creative Portfolio</title>`
*   **Logo/Name:** Update `<h1 class="logo">Your Name</h1>`
*   **Hero Section:**
    *   `<h2>Hello, I'm <span class="highlight">Your Name</span></h2>`
    *   `<p class="tagline" id="tagline" data-text="A Passionate [Your Profession/Field]"></p>` (Update `data-text` attribute)
    *   `<p class="hero-description">Welcome to my personal space...</p>`
*   **Resume:**
    *   Place your resume file (e.g., `YourName_Resume.pdf`) in the root directory.
    *   Update the link: `<a href="YourName_Resume.pdf" download="YourName_Resume.pdf" ...>`
*   **About Me Section:**
    *   Replace the placeholder text within `<section id="about">...</section>`.
    *   Optionally, add your photo: uncomment and update `<img src="your-photo.jpg" alt="Your Name">` or replace the `div.placeholder-image`.
*   **Projects Section:**
    *   For each `.project-card`:
        *   Update `<h3>Project Title X</h3>`.
        *   Update the project description paragraph.
        *   Update links: `<a href="#" target="_blank" class="btn btn-small">View Project</a>` and `<a href="#" target="_blank" class="btn btn-small-secondary">View Code</a>`.
        *   Consider replacing `.project-image-placeholder` with actual `<img>` tags or background images for your projects.
*   **Contact Section:**
    *   Email: `<a href="mailto:youremail@example.com">youremail@example.com</a>`
    *   Phone (optional): `<p><i class="fas fa-phone"></i> (Optional) +1 234 567 8900</p>`
    *   Social Media Links: Update `href` attributes for LinkedIn, GitHub, Twitter, etc.
        ```html
        <a href="your-linkedin-url" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
        ```
*   **Footer:** Update `© <span id="current-year"></span> Your Name.`

### 2. Customize Styling (`style.css`)

Open `style.css` to change the visual appearance:

*   **Colors & Fonts:** Modify the CSS Custom Properties (variables) at the top of the file (`:root` section):
    ```css
    :root {
        --primary-color: #6A1B9A;
        --secondary-color: #4A148C;
        --accent-color: #FFC107;
        /* ... and others ... */
        --font-primary: 'Poppins', sans-serif;
        --font-secondary: 'Roboto Slab', serif;
    }
    ```
*   **Hero Background Image:**
    *   Place your desired hero image (e.g., `hero-background.jpg`) in the root directory (or an `img` subfolder).
    *   Update the `#hero` rule:
        ```css
        #hero {
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('hero-background.jpg') no-repeat center center/cover;
            /* ... or your preferred path ... */
        }
        ```
*   **Project Images:** If you used placeholder divs for project images, you might want to style them with background images or replace them with `<img>` tags in `index.html`.

### 3. Adjust JavaScript (`script.js`) - Optional

Open `script.js` for minor adjustments if needed:

*   **Typing Effect Speed:** In the `type()` function for the tagline, adjust the `setTimeout` delay:
    ```javascript
    setTimeout(type, 100); // Lower for faster, higher for slower
    ```
*   **Contact Form:** The current contact form only shows a client-side alert. To make it functional:
    *   Integrate a backend service (like PHP, Node.js with Nodemailer).
    *   Use a third-party service like [Formspree](https://formspree.io/), [Netlify Forms](https://www.netlify.com/products/forms/), or [Basin](https://usebasin.com/). Update the `<form>` tag's `action` and `method` attributes accordingly.

---

## File Structure
