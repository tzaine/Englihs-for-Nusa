# Atlas Robotics Landing Page Template

A modern, responsive landing page template for robotics companies, built with React and Tailwind CSS.

## Getting Started

This project requires Node.js & npm to be installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps to run the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server with auto-reloading and an instant preview
npm run dev
```

## Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI component library
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
landing-page-template/
├── public/                     # Static assets (images, fonts, icons)
│   ├── ... 
├── src/
│   ├── components/            # Reusable React components
│   │   ├── Hero.jsx          # Landing page sections
│   │   ├── Navbar.jsx        # Navigation component
│   │   └── ...               # Other page components
│   ├── pages/                # Page-level components
│   │   ├── Index.jsx         # Main landing page
│   │   └── ...
│   ├── config/               # Configuration files
│   │   └── navigation.js     # Navigation menu config
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── ...
├── components.json            # shadcn/ui configuration
├── package.json              # Project dependencies and scripts
├── pnpm-lock.yaml            # pnpm lock file for consistent installs
└── index.html          # Main HTML file with Atlas Robotics metadata
```

## Development

### Running the Development Server

```sh
npm run dev
```

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Deployment

You can deploy this project to any static hosting service such as:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

Simply build the project and upload the `dist` folder to your hosting service.

## Customization

This template is configured for Atlas Robotics as an example. To customize for your own robotics company:

1. **Branding**: Update company name, colors, and logo in relevant files
2. **Content**: Modify component text to reflect your specific robotics solutions
3. **Colors**: Adjust the `atlas` color palette in `tailwind.config.js`
4. **Images**: Replace stock images with your own product photos
5. **Features**: Update the features section to highlight your unique capabilities

## Contributing

Feel free to submit issues and enhancement requests!