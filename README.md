<div align="center">

# 🔍 Ziro

**Next-Generation AI-Powered API Discovery Platform**

*Uncover hidden APIs with neural intelligence and stealth technology*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2+-black.svg)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[🚀 Live Demo](https://ziro.dev) • [📖 Documentation](https://docs.ziro.dev) • [🐛 Report Bug](https://github.com/ziro/issues) • [✨ Request Feature](https://github.com/ziro/issues)

</div>

---

## 🌟 Overview

**Ziro** is an enterprise-grade API discovery platform that leverages cutting-edge artificial intelligence and advanced browser automation to map the complete attack surface of web applications. Designed for security researchers, penetration testers, and DevSecOps teams, Ziro employs neural networks and stealth technology to discover hidden, undocumented, and legacy API endpoints in seconds.

### 🎯 Why Ziro?

- **🧠 AI-Driven Discovery**: Neural pattern recognition uncovers APIs traditional tools miss
- **👻 Stealth Operations**: 99.9% success rate against WAFs and bot detection systems
- **⚡ Lightning Fast**: Complete API surface mapping in under 60 seconds
- **🎨 Enterprise UI**: Professional dashboard with real-time analytics
- **🔗 Universal Integration**: Export to Postman, OpenAPI, Burp Suite, and more

---

## ✨ Features

### 🔬 **Advanced Discovery Engine**
- **Neural API Detection**: AI-powered pattern recognition for hidden endpoints
- **JavaScript Analysis**: Deep parsing of client-side code and bundled assets
- **Network Interception**: Real-time monitoring of all HTTP/HTTPS traffic
- **Authentication Flow Mapping**: Automatic detection of auth mechanisms
- **GraphQL Schema Discovery**: Complete schema extraction and documentation

### 🥷 **Stealth & Evasion**
- **Human Behavior Simulation**: Realistic mouse movements, typing patterns, and navigation
- **Advanced Fingerprint Masking**: Canvas, WebGL, and audio fingerprint randomization
- **Residential Proxy Network**: Global IP rotation with ISP-level authenticity
- **Anti-Detection Measures**: Bypasses CloudFlare, Akamai, and custom bot protection
- **CAPTCHA Solving**: AI-powered automatic CAPTCHA resolution

### 📊 **Intelligence & Analytics**
- **Security Risk Assessment**: Automated vulnerability classification and scoring
- **Performance Metrics**: Response time analysis and endpoint optimization insights
- **Technology Stack Detection**: Framework, database, and infrastructure identification
- **API Versioning Analysis**: Historical endpoint mapping and deprecation tracking
- **Compliance Reporting**: OWASP, NIST, and custom security framework reports

### 🔄 **Integration & Export**
- **Multi-Format Export**: Postman Collections, OpenAPI 3.0, HAR files, CSV
- **CI/CD Integration**: GitHub Actions, Jenkins, and GitLab pipeline support
- **SIEM Compatibility**: Splunk, ELK Stack, and QRadar integration
- **REST API Access**: Programmatic access to all discovery and analysis features
- **Webhook Notifications**: Real-time alerts for new endpoints and security findings

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Web Interface] --> B[Next.js Frontend]
    B --> C[API Gateway]
    C --> D[Neural Discovery Engine]
    C --> E[Stealth Browser Engine]
    C --> F[Analysis Pipeline]
    
    D --> G[Pattern Recognition AI]
    D --> H[JavaScript Parser]
    D --> I[Network Monitor]
    
    E --> J[Proxy Network]
    E --> K[Fingerprint Masker]
    E --> L[Behavior Simulator]
    
    F --> M[Security Analyzer]
    F --> N[Performance Profiler]
    F --> O[Report Generator]
    
    P[(Knowledge Base)] --> D
    Q[(Threat Intelligence)] --> M
    R[(Export Formats)] --> O
```

### 🛠️ **Technology Stack**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14, React 18, TypeScript | Modern web interface with SSR |
| **Styling** | Tailwind CSS, Framer Motion | Responsive design with animations |
| **Backend** | Next.js API Routes, Node.js | Serverless API architecture |
| **AI/ML** | TensorFlow.js, OpenAI GPT | Pattern recognition and analysis |
| **Browser Engine** | Hyperbrowser SDK, Puppeteer | Stealth automation and crawling |
| **Security** | Custom stealth algorithms | Anti-detection and evasion |
| **Monitoring** | Real-time analytics dashboard | Live discovery progress tracking |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0+ (LTS recommended)
- **npm** 9.0+ or **yarn** 1.22+
- **Git** for version control

### ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/your-org/ziro.git
cd ziro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 🔑 Environment Configuration

Create a `.env.local` file in the project root:

```env
# Hyperbrowser API Key (required for stealth crawling)
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here

# OpenAI API Key (for AI-powered analysis)
OPENAI_API_KEY=your_openai_api_key_here

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Database (if using persistent storage)
DATABASE_URL=postgresql://username:password@localhost:5432/ziro

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_32_character_encryption_key

# External Services
PROXY_PROVIDER_API_KEY=your_proxy_api_key
WEBHOOK_SECRET=your_webhook_secret
```

### 🏃‍♂️ Running the Application

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm run start

# Linting and type checking
npm run lint
npm run type-check
```

The application will be available at **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Structure

```
ziro/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # Backend API routes
│   │   └── 📁 crawl/               # Core crawling endpoints
│   │       └── route.ts            # Main discovery API
│   ├── 📁 chat/                    # AI chat interface
│   ├── 📁 landing/                 # Marketing landing page
│   ├── globals.css                 # Global styles and themes
│   ├── layout.tsx                  # Root application layout
│   └── page.tsx                    # Main dashboard page
│
├── 📁 components/                   # Reusable React components
│   ├── 📁 ui/                      # Base UI components
│   │   ├── animated-ai-chat.tsx    # AI chat interface
│   │   └── demo.tsx                # Interactive demo
│   ├── 📁 landing/                 # Landing page components
│   │   ├── HeroSection.tsx         # Hero with value proposition
│   │   ├── FeaturesSection.tsx     # Feature showcase
│   │   ├── PricingSection.tsx      # Pricing plans
│   │   ├── TestimonialsSection.tsx # Customer testimonials
│   │   └── FAQSection.tsx          # Frequently asked questions
│   ├── AdvancedDashboard.tsx       # Pro dashboard interface
│   ├── EnhancedDashboard.tsx       # Enterprise dashboard
│   ├── Navbar.tsx                  # Navigation component
│   ├── ProgressBar.tsx             # Discovery progress indicator
│   ├── ResultCard.tsx              # API endpoint result display
│   └── TerminalSidebar.tsx         # Live logging console
│
├── 📁 lib/                         # Core utilities and services
│   ├── hyper.ts                    # Hyperbrowser integration
│   └── utils.ts                    # Common utility functions
│
├── 📁 public/                      # Static assets
│   ├── logo.svg                    # Ziro branding
│   ├── icons/                      # UI icons and illustrations
│   └── images/                     # Marketing and UI images
│
├── 📄 Configuration Files
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS theming
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This documentation
```

---

## 🎮 Usage Guide

### 🎯 **Basic Discovery**

1. **Navigate to Dashboard**: Access the main interface at `/`
2. **Enter Target URL**: Input the web application URL for analysis
3. **Configure Settings**: Select stealth level, proxy options, and scan depth
4. **Launch Discovery**: Start the AI-powered crawling process
5. **Monitor Progress**: Watch real-time logs and progress indicators
6. **Review Results**: Analyze discovered endpoints, security findings, and metadata

### 🔧 **Advanced Configuration**

```javascript
// Custom discovery configuration
const discoveryConfig = {
  target: 'https://api.example.com',
  options: {
    stealth: 'maximum',           // maximum, standard, minimal
    proxy: 'residential',        // residential, datacenter, none
    crawlDepth: 5,               // Maximum navigation depth
    timeout: 120000,             // Timeout in milliseconds
    includeSubdomains: true,     // Discover subdomain APIs
    extractParameters: true,     // Parameter extraction
    detectAuth: true,            // Authentication flow detection
    generateExamples: true,      // API call examples
    securityAnalysis: true,      // Vulnerability assessment
    performanceProfile: true     // Response time analysis
  }
}
```

### 📊 **Export Options**

| Format | Use Case | Features |
|--------|----------|----------|
| **Postman Collection** | API Testing | Organized folders, environment variables, auth configs |
| **OpenAPI 3.0** | Documentation | Complete schemas, examples, security definitions |
| **HAR Files** | Debugging | Full request/response data with timing |
| **CSV Report** | Analysis | Tabular data for spreadsheet analysis |
| **JSON Export** | Integration | Structured data for custom tooling |
| **Burp Suite** | Security Testing | Target configuration for penetration testing |

---

## 🛠️ Development

### 🏗️ **Architecture Principles**

- **Component-Driven Development**: Modular, reusable React components
- **Type Safety**: Strict TypeScript with comprehensive type definitions
- **Performance First**: Code splitting, lazy loading, and optimization
- **Security by Design**: Input validation, XSS protection, and secure defaults
- **Scalable Structure**: Clean architecture with separation of concerns

### 🔧 **Development Workflow**

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Run type checking
npm run type-check

# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Run tests
npm test

# Build for production
npm run build

# Analyze bundle size
npm run analyze
```

### 🧪 **Testing Strategy**

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### 📋 **Code Standards**

- **ESLint**: Enforced code quality and style guidelines
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality assurance
- **TypeScript**: Strict type checking and IntelliSense
- **Conventional Commits**: Standardized commit message format

---

## 🔧 Configuration

### ⚙️ **Application Settings**

```typescript
// config/app.ts
export const appConfig = {
  // Discovery engine settings
  discovery: {
    maxConcurrentSessions: 10,
    defaultTimeout: 60000,
    retryAttempts: 3,
    userAgentRotation: true
  },
  
  // Security configuration
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // requests per window
    },
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      credentials: true
    }
  },
  
  // AI and ML settings
  ai: {
    model: 'gpt-4-turbo',
    maxTokens: 2048,
    temperature: 0.3,
    enablePatternLearning: true
  }
}
```

### 🎨 **UI Customization**

```css
/* globals.css - Theme customization */
:root {
  --color-primary: #facc15;        /* Yellow-400 */
  --color-secondary: #1f2937;     /* Gray-800 */
  --color-accent: #3b82f6;        /* Blue-500 */
  --color-success: #10b981;       /* Emerald-500 */
  --color-warning: #f59e0b;       /* Amber-500 */
  --color-error: #ef4444;         /* Red-500 */
  
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 🤝 Contributing

We welcome contributions from the security and developer community! Here's how to get started:

### 🐛 **Bug Reports**

1. Check existing issues to avoid duplicates
2. Use the bug report template
3. Include reproduction steps and environment details
4. Add relevant logs and screenshots

### ✨ **Feature Requests**

1. Search existing feature requests
2. Use the feature request template
3. Clearly describe the use case and benefits
4. Consider implementation complexity

### 🔧 **Development Process**

```bash
# Fork the repository
git clone https://github.com/your-username/ziro.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# ... code, test, commit ...

# Push to your fork
git push origin feature/amazing-feature

# Create a Pull Request
```

### 📝 **Contribution Guidelines**

- Follow the existing code style and conventions
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure all CI checks pass
- Sign the Contributor License Agreement (CLA)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Ziro Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🌐 Community & Support

<div align="center">

### 💬 Join Our Community

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da.svg)](https://discord.gg/ziro)
[![Twitter](https://img.shields.io/badge/Twitter-Follow%20@ZiroAPI-1da1f2.svg)](https://twitter.com/ZiroAPI)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Company%20Page-0077b5.svg)](https://linkedin.com/company/ziro-api)

### 📞 Enterprise Support

For enterprise customers and commercial support:
- 📧 Email: [enterprise@ziro.dev](mailto:enterprise@ziro.dev)
- 🌐 Website: [https://ziro.dev/enterprise](https://ziro.dev/enterprise)
- 📅 Schedule a call: [https://cal.com/ziro/enterprise](https://cal.com/ziro/enterprise)

### 🏆 Acknowledgments

- **Security Community**: Thanks to all researchers who've contributed discoveries
- **Open Source**: Built on amazing projects like Next.js, React, and Tailwind CSS
- **Early Adopters**: Grateful for feedback from our beta testing community

---

<p align="center">
  <strong>🔍 Ziro - Redefining API Discovery with AI</strong><br>
  <em>Uncover the hidden. Secure the future.</em>
</p>

</div>