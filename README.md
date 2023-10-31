# Kanban Board with Drag & Drop

## Table of Contents

- [Kanban Board with Drag \& Drop](#kanban-board-with-drag--drop)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

## About

This project is a web application built with Next.js, Tailwind CSS, Zustand, dndkit/core, shadcn components, react-hook-form, and zod. It provides a flexible and responsive task management board, similar to JIRA, with two view options: grid and list. Additionally, it includes a user-friendly "Add task" feature and stores user view preferences using cookies.

## Features

- **Responsive Design**: The application is fully responsive, providing an optimal user experience on both mobile and desktop devices.

- **View Options**: Users can choose between two view options, "grid" and "list," to customize their task management experience.

- **Drag and Drop**: Task management is made easy with drag and drop functionality powered by dndkit/core.

- **Styled UI**: The project uses shadcn/radix components to create a visually appealing and user-friendly interface.

- **Form Component**: Form handling is made simple with react-hook-form and Zod for form validation.

- **Cookie Preferences**: The application uses cookies to remember users' view preferences, ensuring a good experience across sessions.

- **Add Task Functionality**: Users can easily add tasks to the board, enhancing their project management capabilities.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following software installed:

- Node.js and npm (Node Package Manager)
- Git

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/onuraydin98/kanban-board-with-drag-and-drop.git

2. Navigate to the src directory:

    ```bash
    cd kanban-app

3. Install the project dependencies:

    ```bash
    npm install / yarn install / pnpm install

### Usage

To run the project locally, use the following command:

```bash
npm run dev
yarn run dev
pnpm dev
```

The application will be accessible in your web browser at http://localhost:3000 or whatever port you have set for development http://localhost:/selected-port/
