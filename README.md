# 🚀 Interactive 3D Portfolio Website

A modern, interactive portfolio website featuring live 3D models, animations, and user interactions built with Three.js, WebGL, and modern web technologies.

![Portfolio Preview](https://img.shields.io/badge/Status-Ready-brightgreen) ![Three.js](https://img.shields.io/badge/Three.js-v0.158-blue) ![WebGL](https://img.shields.io/badge/WebGL-Enabled-orange)

## ✨ Features

### 🎯 Interactive 3D Elements
- **Dynamic 3D Models**: Floating geometric shapes, interactive spheres, and animated objects
- **Real-time Lighting**: Advanced lighting system with shadows, point lights, and rim lighting
- **Particle System**: 1000+ animated particles creating an immersive background
- **Mouse Interactions**: Hover effects, click animations, and parallax camera movement
- **Section-based Scenes**: Different 3D scenes for each portfolio section

### 🎨 Modern Design
- **Glassmorphism UI**: Modern glass-effect navigation and components
- **Gradient Aesthetics**: Beautiful color gradients throughout the design
- **Responsive Layout**: Fully responsive across all devices
- **Smooth Animations**: GSAP-powered animations and transitions
- **Loading Experience**: Animated loading screen with progress indication

### 🔧 Technical Features
- **Three.js Integration**: Professional 3D graphics and WebGL rendering
- **Performance Optimized**: Efficient rendering with LOD and frustum culling
- **Cross-browser Compatible**: Works on all modern browsers
- **Modular Architecture**: Clean, maintainable code structure
- **ES6+ JavaScript**: Modern JavaScript with import/export modules

## 🎮 Interactive Elements

### Hero Section
- **Central Torus**: Rotating 3D torus with metallic material
- **Orbiting Cubes**: 8 colorful cubes floating around the center
- **Camera Controls**: Mouse-driven camera movement and rotation

### About Section
- **Skill Spheres**: Interactive 3D spheres representing different skills
- **Hover Effects**: Objects scale and highlight on mouse hover
- **Click Interactions**: Tooltips and information display on click
- **Animated Skill Bars**: Progress bars that animate on scroll

### Projects Section
- **3D Project Previews**: Different geometric shapes for each project
- **Project Cards**: Hover animations and click interactions
- **Dynamic Lighting**: Real-time lighting effects on 3D models

### Contact Section
- **Animated Forms**: 3D elements that respond to form interactions
- **Submission Effects**: Visual feedback on form submission
- **Interactive Ring**: Communication-themed 3D ring animation

## 🚀 Getting Started

### Prerequisites
- Modern web browser with WebGL support
- Local web server (for CORS compliance)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 3d-portfolio-website
   ```

2. **Start a local server**
   
   **Option A: Using Python**
   ```bash
   python3 -m http.server 8000
   ```
   
   **Option B: Using Node.js**
   ```bash
   npx serve .
   ```
   
   **Option C: Using Live Server (VS Code)**
   - Install Live Server extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Development Setup

For development with auto-reload and build tools:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Customization Guide

### Personalizing Content

#### 1. Update Personal Information
Edit `index.html` to replace placeholder content:

```html
<!-- Hero Section -->
<h1 class="hero-title">
    <span class="line">Your Name</span>
    <span class="line">Your Title</span>
</h1>
<p class="hero-subtitle">Your personal tagline here</p>

<!-- About Section -->
<p>Write your personal description here...</p>

<!-- Contact Information -->
<a href="mailto:your-email@domain.com">your-email@domain.com</a>
```

#### 2. Customize Skills
In `js/main.js`, update the skills array:

```javascript
// Line ~180
const skills = ['Your Skill 1', 'Your Skill 2', 'Your Skill 3', 'Your Skill 4'];
const skillColors = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0xf59e0b];
```

And in `index.html`, update skill bars:

```html
<div class="skill-item">
    <span class="skill-name">Your Skill Name</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="85"></div>
    </div>
</div>
```

#### 3. Add Your Projects
Update project information in `index.html`:

```html
<div class="project-card" data-project="1">
    <div class="project-3d" id="project-1-model"></div>
    <div class="project-info">
        <h3>Your Project Title</h3>
        <p>Your project description</p>
        <div class="project-tags">
            <span>Tech 1</span>
            <span>Tech 2</span>
        </div>
    </div>
</div>
```

### Visual Customization

#### 1. Color Scheme
Update CSS custom properties in `style.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
    /* ... other colors */
}
```

#### 2. 3D Models
Modify 3D objects in `js/main.js`:

```javascript
// Change geometries
const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
// to
const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);

// Change materials
const material = new THREE.MeshPhysicalMaterial({
    color: 0xYOURCOLOR,
    metalness: 0.8,
    roughness: 0.2,
    // ... other properties
});
```

#### 3. Animations
Customize animation speeds and effects:

```javascript
// In animate() method
obj.rotation.x += 0.01; // Increase for faster rotation
obj.rotation.y += 0.005;

// In particle animation
this.particles.rotation.y += 0.002; // Adjust particle speed
```

### Adding New Sections

1. **HTML Structure**
   ```html
   <section id="new-section" class="new-section">
       <div class="container">
           <!-- Your content -->
       </div>
   </section>
   ```

2. **CSS Styling**
   ```css
   .new-section {
       padding: 100px 0;
       /* Your styles */
   }
   ```

3. **3D Objects**
   ```javascript
   createNewSectionObjects() {
       const newGroup = new THREE.Group();
       newGroup.name = 'newSectionObjects';
       // Add your 3D objects
       this.models.newSectionObjects = newGroup;
       this.scene.add(newGroup);
   }
   ```

4. **Navigation**
   ```html
   <li><a href="#new-section" data-section="new-section">New Section</a></li>
   ```

## 🛠️ Technical Details

### Architecture
```
3d-portfolio-website/
├── index.html          # Main HTML structure
├── style.css           # Styles and animations
├── js/
│   └── main.js         # Three.js logic and interactions
├── package.json        # Dependencies and scripts
└── README.md          # Documentation
```

### Dependencies
- **Three.js**: 3D graphics and WebGL rendering
- **GSAP**: High-performance animations (loaded via CDN)
- **Lenis**: Smooth scrolling (optional)

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Considerations
- Uses BufferGeometry for efficient rendering
- Implements object culling and LOD
- Optimized particle system
- Efficient event handling with debouncing

## 🎯 Interactions Guide

### Mouse Controls
- **Move**: Parallax camera movement
- **Hover**: Object highlighting and scaling
- **Click**: Animations and information tooltips
- **Scroll**: Section transitions and particle animations

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate form inputs

### Touch Support
- **Tap**: Same as click interactions
- **Swipe**: Scroll navigation
- **Pinch**: Zoom (disabled by default)

## 🐛 Troubleshooting

### Common Issues

1. **3D Models Not Appearing**
   - Check browser WebGL support: [webglreport.com](https://webglreport.com)
   - Ensure local server is running (required for CORS)
   - Check console for JavaScript errors

2. **Performance Issues**
   - Reduce particle count in `createParticleSystem()`
   - Lower shadow map resolution
   - Disable shadows for better performance

3. **Mobile Performance**
   - Reduce complexity for mobile devices
   - Implement device detection and LOD
   - Consider disabling particles on mobile

### Debug Mode
Enable debug helpers by adding to `init()` method:

```javascript
// Add wireframe mode
material.wireframe = true;

// Add axis helper
const axesHelper = new THREE.AxesHelper(5);
this.scene.add(axesHelper);

// Add performance monitor
const stats = new Stats();
document.body.appendChild(stats.dom);
```

## 🚀 Deployment

### Static Hosting
Deploy to platforms like:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: Use Firebase CLI

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** for excellent 3D web graphics
- **Modern Web Technologies** for making this possible
- **Open Source Contributors** for inspiration and tools

---

## 🔗 Demo & Links

- **Live Demo**: [your-demo-url.com]
- **Repository**: [your-repo-url]
- **Documentation**: [your-docs-url]

**Created with ❤️ by [Your Name]**

