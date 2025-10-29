# Personal Learning Management Tool

A modern, feature-rich learning management web application built with Next.js for personal use. This app helps you navigate and read through your learning materials (markdown files) with an intuitive interface.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)

## 🌟 Features

### Core Features
- **📁 Directory Scanning**: Automatically scans and loads your learning materials from a local directory
- **🗂️ Tree Navigation**: Intuitive, collapsible tree view for easy navigation through folders and files
- **📖 Markdown Rendering**: Beautiful rendering of markdown files with syntax highlighting
- **🎨 Dark/Light Mode**: Toggle between dark and light themes for comfortable reading
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

### Learning Features
- **✅ Progress Tracking**: Mark files as completed to track your learning progress
- **🔖 Bookmarks**: Bookmark important files for quick access
- **🔍 Search**: Search through your files to quickly find what you need
- **💾 Auto-Save**: Your progress, bookmarks, and settings are automatically saved to localStorage

### UX Enhancements
- **Collapsible Sidebar**: Toggle sidebar visibility for distraction-free reading
- **Syntax Highlighting**: Code blocks with beautiful syntax highlighting
- **Frontmatter Support**: Displays YAML frontmatter metadata from markdown files
- **Clean Typography**: Optimized reading experience with prose styling
- **Auto-Expand**: First two levels of folders are automatically expanded

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd e:\temp\personal-learning-management-tool
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### First-Time Setup

1. When you first open the app, you'll see the settings modal
2. Enter the path to your learning materials folder (e.g., `E:\temp\personal-learning-management-tool`)
3. Click "Load" to scan the directory
4. Start learning!

## 📖 Usage

### Navigating Files
- Click on folders in the sidebar to expand/collapse them
- Click on markdown files to view their content
- Use the search bar to filter files by name

### Tracking Progress
- Click the ✓ checkmark icon in the top bar to mark a file as completed
- Click the 🔖 bookmark icon to bookmark a file
- View your stats at the bottom of the sidebar

### Settings
- Click the ⚙️ settings icon or 🏠 home icon to change your learning materials path
- Click the 🌙/☀️ icon to toggle between dark and light modes

### Keyboard Shortcuts
- Toggle sidebar: Click the hamburger menu (☰) icon
- Close modals: Click the X button or outside the modal

## 🏗️ Project Structure

```
personal-learning-management-tool/
├── app/
│   ├── api/
│   │   ├── scan/
│   │   │   └── route.ts       # Directory scanning API
│   │   └── read/
│   │       └── route.ts       # File reading API
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main application page
├── components/
│   ├── FileTree.tsx           # Tree navigation component
│   └── MarkdownViewer.tsx     # Markdown rendering component
├── public/                    # Static assets
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🛠️ Technologies Used

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[remark-gfm](https://github.com/remarkjs/remark-gfm)** - GitHub Flavored Markdown support
- **[rehype-highlight](https://github.com/rehypejs/rehype-highlight)** - Syntax highlighting
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter parsing
- **[lucide-react](https://lucide.dev/)** - Beautiful icons

## 🎨 Customization

### Changing the Color Scheme
Edit `app/globals.css` to customize colors:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### Adding Custom Markdown Styles
Modify the prose classes in `components/MarkdownViewer.tsx` to customize markdown rendering.

### Adjusting Sidebar Width
Change the width in `app/page.tsx`:
```tsx
className={`${sidebarOpen ? 'w-80' : 'w-0'}`}
```

## 📝 Potential Future Enhancements

- Full-text search across all files
- Reading time estimates
- Learning streaks and statistics
- Export progress reports
- Table of contents for long documents
- Keyboard navigation shortcuts
- Tags and categories
- Multiple workspace support
- PDF export of completed sections

## 🤝 Contributing

This is a personal project, but feel free to fork and customize it for your own needs!

## 📄 License

This project is for personal use.

## 🙏 Acknowledgments

- Built with ❤️ using Next.js
- Icons by [Lucide](https://lucide.dev/)
- Inspired by the need for a simple, effective personal learning tool
