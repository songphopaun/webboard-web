Next.js Web Board Application

This is a Next.js web application for managing posts and comments. It includes a home page for listing posts, a post details page, and modals for creating and deleting posts.

Features

-   **User Authentication**  
    Secure login functionality for user authentication and session management.

-   **Search Functionality**  
    Enables users to easily filter and find posts.

-   **Post Management**  
    Comprehensive features for creating, editing, and deleting posts.

-   **Comment Creation**  
    Allows users to add comments to posts.

-   **Responsive**  
    Responsive design for both desktop and mobile.

Start project run scripts

-   npm install : Install dependencies
-   npm run dev : Start the development server.

Project Structure
webboard-web/
├── .next/ # Compiled Next.js build files (auto-generated, do not modify directly)
├── app/ # Main application directory
│ ├── assets/ # Static assets (e.g., images, icons)
│ │ └── images/
│ │ └── notebook.png
│ ├── components/ # Reusable React components
│ │ ├── model/ # Modal components
│ │ ├── Navbar.tsx # Navigation bar component
│ │ ├── PostCard.tsx # Post card component for displaying posts
│ │ ├── SearchAndControls.tsx # Search and filter controls for posts
│ │ └── Sidebar.tsx # Sidebar navigation
│ ├── login/ # Login page directory
│ │ └── page.tsx
│ ├── our-blog/  
│ │ ├── layout.tsx # Layout component for the blog page
│ │ └── page.tsx # Blog page entry point
│ ├── post/ # Post details page directory
│ │ └── [id]/ # Dynamic route for specific post details
│ │ └── layout.tsx # Layout for the post detail page
│ ├── utils/ # Utility files and configurations
│ ├── layout.tsx # Default layout for the entire application
│ └── page.tsx # Root page of the application
├── public/ # Publicly accessible static files
├── services/ # API service integrations
│ ├── api.ts # Base API setup
│ ├── auth.ts # Authentication API services
│ └── post.ts # Post and comment API services
├── stores/ # Zustand state management
│ ├── index.ts # Root store configuration
│ ├── useAlertStore.ts # Zustand store for alert modals
│ └── useUserStore.ts # Zustand store for user session management
├── .env # Environment variables
├── .gitignore # Files and folders to ignore in Git
├── eslint.config.mjs # ESLint configuration
├── next-env.d.ts # TypeScript definitions for Next.js
├── next.config.js # Next.js application configuration
└── tsconfig.json # TypeScript configuration

Libraries

-   zustand: Used for state management library
-   react-icons: Used for icons
-   axios: Handles API requests
-   date-fns: Used to display human-readable timestamps

ENV
NEXT_PUBLIC_API_BASE_URL=http://localhost:4001
