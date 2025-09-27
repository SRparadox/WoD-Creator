# World of Darkness Hub

A comprehensive website hub connecting various World of Darkness related tools, resources, and interactive experiences for Vampire: The Masquerade, Werewolf: The Apocalypse, Mage: The Ascension, and other World of Darkness games.

## Overview

This website serves as a central portal for accessing multiple World of Darkness related web applications, downloads, and resources. It features a dark, atmospheric design that captures the essence of the World of Darkness universe.

## Features

### 🧛 Vampire: The Masquerade Tools
- Character Creator (Coming Soon)
- Territory Manager (Coming Soon)
- Coterie Tracker (Coming Soon)

### 🐺 Werewolf: The Apocalypse Tools
- Garou Generator (Coming Soon)
- Sept Manager (Coming Soon)
- Umbra Navigator (Coming Soon)

### 🔮 Mage: The Ascension Tools
- Awakened Creator (Coming Soon)
- Chantry Manager (Coming Soon)
- Paradigm Guide (Coming Soon)

### 📥 Downloads & Resources
- Character Sheets (Interactive and Printable)
- Quick References and Lookup Tables
- Storyteller Tools and Aids
- City Maps and Visual Assets

## Getting Started

### Prerequisites
- A modern web browser
- Internet connection for external fonts and icons

### Live Website
The website is automatically deployed to GitHub Pages and available at:
**https://srparadox.github.io/WoD-Creator/**

### Local Development
1. Clone this repository:
   ```bash
   git clone https://github.com/SRparadox/WoD-Creator.git
   cd WoD-Creator
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On Windows
   start index.html
   
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   ```

3. Or serve it using a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

### GitHub Pages Deployment
The site is automatically deployed via GitHub Actions:
- Every push to the `main` branch triggers a deployment
- The workflow is defined in `.github/workflows/deploy.yml`
- No build process is required - static files are deployed directly

## Project Structure
```
WoD-Creator/
├── index.html          # Main website HTML
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Atmospheric styling appropriate for World of Darkness
- **Interactive Navigation**: Smooth transitions between sections
- **Animated Elements**: Floating particles and hover effects
- **Modern Typography**: Uses Cinzel and Crimson Text fonts
- **Color Coding**: Different color schemes for each game line:
  - Vampire: Deep reds and golds
  - Werewolf: Forest greens
  - Mage: Mystical blues and purples

## Technical Details

### Technologies Used
- HTML5
- CSS3 with Flexbox and Grid
- Vanilla JavaScript (ES6+)
- Font Awesome icons
- Google Fonts

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance Features
- Lightweight design (no heavy frameworks)
- Optimized animations
- Efficient CSS using modern properties
- Minimal JavaScript for core functionality

## Customization

### Adding New Tools
To add a new tool or link:

1. Update the appropriate section in `index.html`
2. Add a new `.link-card` with the tool information
3. Update the status badge as needed
4. Add any custom styling in `styles.css`

### Modifying Themes
Color schemes can be modified in `styles.css`:
- Primary colors are defined in CSS custom properties
- Each game line has its own button color scheme
- Background gradients can be adjusted in `.background-overlay`

## Future Development

### Planned Features
- [ ] Integrate actual character creation tools
- [ ] Add download functionality for resources
- [ ] Implement user accounts and saved data
- [ ] Create mobile app versions
- [ ] Add community features and forums
- [ ] Integrate with existing VTM/WTM/MTAs databases

### Integration Points
This hub is designed to link to:
- Standalone web applications for each game line
- PDF generators and download systems
- Community resources and forums
- Official World of Darkness content (where appropriate)

## GitHub Pages Setup

This repository is configured for automatic deployment to GitHub Pages. To set this up:

### Repository Settings
1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on the next push to `main`

### Custom Domain (Optional)
If you have a custom domain:
1. Create a `CNAME` file in the root directory with your domain name
2. Configure your DNS to point to GitHub Pages
3. Enable **Enforce HTTPS** in repository settings

### Workflow Features
- **Automatic Deployment**: Triggers on every push to `main`
- **Manual Deployment**: Can be triggered manually from Actions tab
- **Static Site**: No build process required, direct deployment
- **Fast**: Typically deploys in under 2 minutes

## Contributing

Contributions are welcome! Please feel free to:
- Report bugs or suggest improvements
- Submit pull requests for new features
- Help with testing across different browsers/devices
- Contribute to documentation

## License

This project is for educational and gaming purposes. 

**Disclaimer**: World of Darkness, Vampire: The Masquerade, Werewolf: The Apocalypse, and Mage: The Ascension are trademarks of Modiphius Entertainment. This is an unofficial fan site created for the community.

## Contact

For questions, suggestions, or collaboration opportunities, please open an issue in this repository.

---

*"In the World of Darkness, knowledge is power, and power is everything."*
