# UTask - Your Personalized Student Task Tracker

UTask is a modern, visually appealing task tracker web app built for students to organize and manage their daily academic or personal tasks. It combines the simplicity of a to-do list with the flexibility of a Kanban board — all within a sleek, customizable interface.

## Features

### Local Account System
- Create a local account with username and password (stored securely in browser)
- Guest mode for quick access without registration
- All data persists in localStorage - no backend required
- Your tasks and preferences stay saved even after closing the browser

### Task Management
- **Add Tasks** with title, description, subject, priority, due date, and reminder time
- **Edit/Delete Tasks** anytime with an intuitive dialog interface
- **Kanban Board** with three status columns: To Do, In Progress, Done
- **Drag-and-Drop** tasks between columns to update their status
- **Priority Levels** with visual badges (High, Medium, Low)
- **Subject Tags** to categorize tasks by course or topic
- **Reminder Times** to help you stay on schedule
- **Sort and Filter** tasks by various criteria

### Dashboard
- View comprehensive statistics about your tasks
- **Progress Ring** showing overall completion rate
- **Subject Breakdown** with progress bars for each subject
- **Upcoming Tasks** list with due date indicators
- Quick action buttons for easy navigation

### Theme Customization
- **Light/Dark Mode** toggle with smooth transitions
- **5 Accent Colors** to personalize your experience:
  - Blue (default)
  - Green
  - Orange
  - Purple
  - Pink
- All theme preferences are saved and persist across sessions

### Modern UI/UX
- Clean, distraction-free design
- Fully responsive (desktop, tablet, mobile)
- Smooth animations with Framer Motion
- Intuitive drag-and-drop interface
- Beautiful card-based layouts

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Animations | Framer Motion |
| State Management | Zustand |
| Data Storage | localStorage |
| Drag-and-Drop | React Beautiful DnD |
| Icons | Lucide React |
| Deployment | Vercel |

## Getting Started

### Prerequisites
- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   \`\`\`bash
   git clone <repository-url>
   cd utask
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage Guide

### Getting Started
1. **Create an Account** - Register with a username and password, or use Guest Mode
2. **Explore the Dashboard** - View your task statistics and progress
3. **Add Your First Task** - Click "Add Task" on the Tasks page
4. **Organize Tasks** - Drag and drop tasks between To Do, In Progress, and Done columns
5. **Customize Your Theme** - Visit Settings to change colors and appearance

### Task Management Tips
- Use **priority levels** to focus on what matters most
- Set **reminder times** to stay on schedule
- Organize tasks by **subject** to track different courses or projects
- Drag tasks to **update their status** quickly
- Use the **dashboard** to monitor your overall progress

### Data Persistence
- All your data is stored locally in your browser
- No account creation on external servers
- Your tasks and settings persist across browser sessions
- Clear browser data will remove all stored information

## Project Structure

\`\`\`
utask/
├── app/
│   ├── dashboard/          # Dashboard page with statistics
│   ├── tasks/              # Kanban board page
│   ├── settings/           # Theme customization page
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Landing page with auth
│   └── globals.css         # Global styles and theme variables
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── navbar.tsx          # Navigation bar
│   ├── task-card.tsx       # Individual task card
│   ├── task-dialog.tsx     # Add/Edit task modal
│   ├── stat-card.tsx       # Dashboard stat cards
│   ├── progress-ring.tsx   # Circular progress indicator
│   ├── upcoming-tasks.tsx  # Upcoming tasks list
│   ├── subject-breakdown.tsx # Subject progress bars
│   └── theme-provider.tsx  # Theme context provider
├── lib/
│   ├── auth.ts             # Authentication utilities
│   ├── store.ts            # Zustand state management
│   └── utils.ts            # Utility functions
└── README.md               # This file
\`\`\`

## Features in Detail

### Authentication System
- Username and password stored in browser localStorage
- Password encoding for basic security
- Session management with automatic login persistence
- Guest mode for quick access without registration

### Kanban Board
- Three columns: To Do, In Progress, Done
- Drag-and-drop powered by React Beautiful DnD
- Color-coded column borders
- Task cards with priority badges and subject tags
- Smooth animations on drag

### Dashboard Analytics
- Total tasks created
- Tasks completed count
- In-progress tasks count
- To-do tasks count
- Circular progress ring showing completion percentage
- Subject breakdown with individual progress bars
- Upcoming tasks with due date warnings

### Theme System
- Dynamic CSS variables for accent colors
- Smooth transitions between light and dark modes
- Five carefully selected accent color palettes
- Theme preferences saved per user
- Consistent theming across all pages

## Browser Compatibility

UTask works best on modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Privacy & Security

- **No Backend** - All data stays in your browser
- **No Tracking** - No analytics or third-party scripts
- **Local Storage** - Data never leaves your device
- **No Account Required** - Use guest mode for complete privacy

## Future Enhancements

Potential features for future versions:
- Cloud sync with Firebase or Supabase
- Import/export tasks as JSON
- Task templates and recurring tasks
- Collaboration features
- Mobile app version
- AI-powered task prioritization
- Calendar integration
- Pomodoro timer integration

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for students who want to stay organized and productive.
