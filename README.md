<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Node_JS-black?style=for-the-badge&logoColor=white&logo=nodedotjs&color=339933" alt="nodedotjs" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">Developer's GitNote</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🚀 [More](#more)
7. 🔗 [Links](#links)
8. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

GitNote - Your all-in-one solution for developers, designed to be their second brain, a comprehensive learning tool, and an efficient progress tracker. Seamlessly capture and organize knowledge, set and track learning goals, and monitor study habits with ease. Developed as part of the masterclass, GitNote empowers developers to enhance their productivity and knowledge management skills effortlessly.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Prism.js
- TinyMCE
- MongoDB
- Shadcn
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Authentication & Onboarding**: Seamlessly log in or sign up and personalize your experience with smooth onboarding.

👉 **Profile Management**: Easily update profile details and link social media accounts for enhanced connectivity.

👉 **Creating Learning Posts**: Document knowledge, components, or workflows effortlessly, enriched with resources and links.

👉 **Related Posts**: Connect related content seamlessly for improved information accessibility.

👉 **Tagging for Context**: Enhance post context and retrieval efficiency with intuitive tagging.

👉 **Contribution Grid**: Track progress visually as the grid dynamically updates with each post similar to Github.

👉 **Goals & Experience Tracking**: Monitor and reflect on learning goals conveniently from your profile.

👉 **Search & Filter**: Retrieve past notes and tutorials swiftly with global search and filtering.

👉 **Post Collection**: Explore content easily with pagination features, witnessing your learning progression firsthand.

👉 **Responsive**: Ensures seamless functionality and aesthetics across all devices and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/JavaScript-Mastery-Pro/codebook.git
cd gitnote
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

For a few specific applications, we require environment variables. Create .env.local file in the root of your project.

```env
MONGODB_URI=
...
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

## <a name="snippets">🕸️ Code Snippets</a>

<details>
<summary><code>.vscode/settings.json</code></summary>

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.addMissingImports": "explicit"
  },
  "prettier.tabWidth": 2,
  "prettier.useTabs": false,
  "prettier.semi": true,
  "prettier.singleQuote": false,
  "prettier.jsxSingleQuote": false,
  "prettier.trailingComma": "es5",
  "prettier.arrowParens": "always",
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "vscode.css-language-features"
  },
  "[svg]": {
    "editor.defaultFormatter": "jock.svg"
  }
}
```

</details>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          900: "rgba(66, 187, 255, 0.1)",
          800: "rgba(12, 50, 71, 1)",
          500: "rgba(66, 187, 255, 1)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          border: "rgba(68, 72, 105, 0.1)",
        },
        black: {
          950: "rgba(1, 1, 1, 1)",
          900: "rgba(12, 14, 23, 1)",
          800: "rgba(19, 22, 37, 1)",
          700: "rgba(29, 32, 50, 1)",
          600: "rgba(46, 55, 87, 1)",
        },
        white: {
          500: "rgba(85, 89, 125, 1)",
          300: "rgba(173, 179, 204, 1)",
          100: "rgba(255, 255, 255, 1)",
        },
        purple: {
          900: "rgba(149, 66, 255, 0.1)",
          500: "rgba(149, 66, 255, 1)",
        },
        green: {
          900: "rgba(66, 255, 119, 0.1)",
          500: "rgba(66, 255, 119, 1)",
          400: "rgba(104, 209, 191, 1)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

</details>

<details>
<summary><code>app/globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-black-900 text-foreground;
  }

  /* Class to revert styles for tinymce to work */
  .no-tailwindcss-base,
  .no-tailwindcss-base *,
  .no-tailwindcss-base > * {
    font-size: revert;
    font-weight: revert;
    margin: revert;
    display: revert;
    vertical-align: revert;
    max-width: revert;
    height: revert;
    border-width: revert;
    border-style: revert;
    border-color: revert;
    outline: revert;
    list-style: revert;
    padding: revert;
  }
  .no-tailwindcss-base a {
    color: #88b2ec;
  }
  .no-tailwindcss-base li {
    margin-top: 12px;
  }
  .no-tailwindcss-base blockquote {
    border-left: 4px solid #465381;
    display: flex;
    padding-left: 16px;
    margin: 16px;
    font-style: italic;
    color: #6c7dbb;
  }

  /* Remove scrollbar */
  .remove-scrollbar::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    border-radius: 0px;
  }

  .remove-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .remove-scrollbar::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 0px;
  }

  .remove-scrollbar::-webkit-scrollbar-thumb:hover {
    /* background: #1e2238; */
    background: transparent;
  }
}

/* ========================================== TAILWIND STYLES */
@layer utilities {
  /* ===== UTILITIES */
  .wrapper {
    @apply relative mx-auto my-10 max-w-4xl flex-1 px-4 md:px-10;
  }

  .sidebar {
    @apply remove-scrollbar w-full max-w-72 flex-col overflow-auto bg-black-800 px-7 py-10;
  }

  .left-sidebar {
    @apply hidden lg:flex;
  }

  .right-sidebar {
    @apply hidden xl:flex;
  }

  .clip-text {
    @apply bg-clip-text text-transparent;
  }

  .bg-image {
    @apply bg-light-rays bg-black-900 bg-cover bg-no-repeat;
  }

  /* ===== ALIGNMENTS */
  .flex-center {
    @apply flex items-center justify-center;
  }

  .flex-between {
    @apply flex items-center justify-between;
  }

  /* ===== TYPOGRAPHY */
  /* Display */
  .display1-bold {
    @apply text-[32px] font-bold leading-[40px] tracking-[-2%];
  }

  .display2-bold {
    @apply text-[24px] font-bold leading-[32px] tracking-[-2%];
  }

  /* Headings */
  .h1-medium {
    @apply text-[20px] font-medium leading-[28px];
  }

  .h2-medium {
    @apply text-[16px] font-medium leading-[24px];
  }

  /* Paragraph */
  .p1-bold {
    @apply text-[18px] font-bold leading-[28px];
  }

  .p2-bold {
    @apply text-[16px] font-bold leading-[24px];
  }

  .p3-bold {
    @apply text-[14px] font-bold leading-[20px];
  }

  .p1-medium {
    @apply text-[18px] font-medium leading-[28px];
  }

  .p3-medium {
    @apply text-[14px] font-medium leading-[20px];
  }

  .p4-medium {
    @apply text-[12px] font-medium leading-[16px];
  }

  .p1-regular {
    @apply text-[18px] font-normal leading-[28px];
  }

  .p2-regular {
    @apply text-[16px] font-normal leading-[24px];
  }

  .p3-regular {
    @apply text-[14px] font-normal leading-[20px];
  }

  .p4-regular {
    @apply text-[12px] font-normal leading-[16px];
  }

  /* Caption */
  .caption {
    @apply text-[10px] font-normal uppercase;
  }

  /* ===== COLORS */
  .gradient-blue-bg {
    @apply bg-gradient-to-r from-primary-500 to-indigo-600;
  }

  /* =====  SHADCN OVERRIDES */
  .shad-input {
    @apply p2-regular h-11 rounded-[6px]  border-none bg-black-700 text-white-300  placeholder:text-white-300/50 focus-visible:ring-0 focus-visible:ring-offset-0 !important;
  }

  .shad-textarea {
    @apply p2-regular rounded-[6px] border-none bg-black-700 text-white-300  placeholder:text-white-300/50 focus-visible:ring-0 focus-visible:ring-offset-0 !important;
  }

  .shad-button-blue {
    @apply p3-medium gradient-blue-bg h-11 rounded-[6px] text-white-100 shadow-lg !important;
  }

  .shad-button-secondary-blue {
    @apply p3-medium h-11 rounded-[6px] bg-primary-800 text-primary-500 hover:bg-primary-800/80 !important;
  }

  .shad-button-dark {
    @apply p3-medium h-11  rounded-[6px] bg-black-700 text-white-300 hover:bg-black-700/80 !important;
  }

  .shad-button-light {
    @apply p3-medium h-11  rounded-[6px] bg-black-600 text-white-300 hover:bg-black-600/80 !important;
  }

  .shad-combobox-trigger {
    @apply p2-regular flex h-11 w-full justify-between border-none bg-black-700 text-white-300 hover:bg-black-700 !important;
  }

  .shad-popup-content {
    @apply w-[400px] border-black-800 p-0 !important;
  }

  .shad-command {
    @apply w-full border-black-800 bg-black-700 !important;
  }
  .shad-command-input {
    @apply h-9 w-full border-black-800  placeholder:text-white-300 !important;
  }

  .shad-command-item {
    @apply w-full bg-black-700 hover:bg-black-600 data-[state=selected]:bg-black-600 !important;
  }

  .shad-separator {
    @apply opacity-70;
  }

  .shad-checkbox {
    @apply h-5 w-5 border-2 border-white-500 data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500 !important;
  }

  .shad-sheet-content button {
    @apply top-2 focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 !important;
  }

  .shad-tab-trigger {
    @apply p3-medium flex gap-2 rounded-none border-b-2 border-transparent px-4 pb-3 pt-0 text-white-100 data-[state=active]:border-white-100 data-[state=active]:bg-transparent !important;
  }

  .shad-tab-content {
    @apply min-h-60 rounded-[10px] bg-black-800/50 p-4  !important;
  }

  .shad-select-trigger {
    @apply p2-regular h-11 rounded-[6px] border-none bg-black-700 text-white-300 placeholder:text-white-300/50 focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none !important;
  }

  .shad-select-content {
    @apply rounded-[6px] border-none bg-black-700 text-white-300 placeholder:text-white-300/50 focus-visible:ring-0 focus-visible:ring-offset-0 !important;
  }

  .shad-select-item {
    @apply p2-regular bg-black-700 py-2 hover:bg-black-800 data-[state==='checked']:bg-black-600 !important;
  }

  .shad-dropdown-content {
    @apply mt-3 overflow-hidden rounded-md bg-black-700 shadow-lg;
  }

  .shad-dropdown-item {
    @apply p3-regular cursor-pointer  text-white-300 outline-none transition-all hover:border-none  hover:bg-black-600  !important;
  }

  .shad-alert-trigger {
    @apply p3-regular cursor-pointer rounded-sm px-4 py-2 text-white-300 outline-none transition-all hover:border-none  hover:bg-black-600  !important;
  }

  .bg-popover {
    @apply bg-black-800;
  }
}

.text-destructive {
  color: #b86963;
}

/* =====  REACT-DATEPICKER OVERRIDES */
.datePicker {
  width: 100%;
  background-color: #1d2032 !important;
}

.react-datepicker,
.react-datepicker__time,
.react-datepicker__header,
.react-datepicker__current-month,
.react-datepicker__day-name,
.react-datepicker__day,
.react-datepicker-time__header {
  background-color: #1d2032 !important;
  border-color: #1d2032 !important;
  color: #adb3cc !important;
}

.react-datepicker__current-month,
.react-datepicker__day-name,
.react-datepicker-time__header {
  color: #ffffff !important;
}

.react-datepicker__triangle {
  fill: #1d2032 !important;
  color: #1d2032 !important;
  stroke: #1d2032 !important;
}

.react-datepicker__time-list-item:hover {
  background-color: #2e3757 !important;
}

.react-datepicker__input-container input {
  background-color: #1d2032 !important;
  width: 100%;
  outline: none;
  margin-left: 16px;
}

.react-datepicker__day--selected {
  background-color: #2e3757 !important;
  color: #ffffff !important;
  border-radius: 4px;
}

.react-datepicker__time-list-item--selected {
  background-color: #2e3757 !important;
}
```

</details>




