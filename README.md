# Retro Arcade Portfolio

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-green?logo=spring)

🌐 **Live Site:** [**aayush-shrestha.info.np**](https://aayush-shrestha.info.np/)

<img alt="Retro Arcade Portfolio Screenshot" src="https://github.com/user-attachments/assets/ad17c27d-65f2-465b-9a6d-ba18feb6c1e6" />

A playful, retro arcade–inspired personal portfolio. It is my take on how software can feel—bright, interactive, and fun—while still being robust and maintainable!

The UI presents the portfolio like a game console: a Player Profile, Character Stats reimagined as Achievements, and a Special Abilities scroller that showcases the tech stack. There are small game-like touches throughout (background chiptune tones, bleep/bloop SFX, and subtle motion) designed to evoke classic arcade vibes without getting in the way of content.

## Table of Contents

- [Why an Arcade Theme?](#why-an-arcade-theme)
- [Tech Stack](#tech-stack)
- [Local Development](#local-development)
  - [Option 1: Run with the Pre-built Docker Image (Easiest)](#option-1-run-with-the-pre-built-docker-image-easiest)
  - [Option 2: Build and Run with Docker Compose](#option-2-build-and-run-with-docker-compose-recommended)
  - [Option 3: Run Services Manually](#option-3-run-services-manually)
- [CI/CD & Hosting](#cicd--hosting)
- [Issues & Enhancements](#issues--enhancements)
- [Roadmap (Side Quests)](#roadmap-side-quests)
- [Credits and Inspiration](#credits-and-inspiration)

## Why an Arcade Theme?

-   I enjoy the intersection of tech, design, and gaming. This is an experiment to explore that overlap.
-   Game-like metaphors make tech narratives approachable—skills become abilities, projects become levels, and milestones become achievements.
-   The UI is intentionally tactile and legible, emphasizing clarity and delight over heavy visuals.

## Tech Stack

-   **Frontend**
    -   React 19, Vite 7, TypeScript 5.8
    -   Lucide-react for crisp, lightweight icons
    -   CSS with utility-like classes and custom variables for the arcade look
    -   Web Audio API for chiptune-style tones and effects
-   **Backend**
    -   Java + Spring Boot (API module prepared for future data-driven features)
-   **CI/CD & Hosting**
    -   GitHub Actions for Continuous Integration
    -   Cloudflare Pages for Continuous Deployment

## Local Development

There are three ways to run the project locally. Choose the one that best fits your needs.

<!-- TODO: Replace [OWNER/REPO] and [YOUR_GITHUB_USERNAME] in the commands below. -->

### Option 1: Run with the Pre-built Docker Image (Easiest)

A new Docker image is automatically built and published to the GitHub Container Registry after every merge to the `main` branch. This is the quickest way to get the application running.

**Prerequisites:**
-   Docker Desktop or Docker Engine installed and running.

**Steps:**

1.  **Log in to GitHub Container Registry (GHCR)**
    You will need a [Personal Access Token (PAT)](https://github.com/settings/tokens) with the `read:packages` scope.

    ```sh
    # Replace YOUR_GITHUB_USERNAME with your GitHub username
    docker login ghcr.io -u YOUR_GITHUB_USERNAME
    ```
    When prompted for a password, paste your PAT.

2.  **Pull and Run the Image**
    ```sh
    # Pull the latest image
    docker pull ghcr.io/[OWNER/REPO]:latest

    # Run the container. This maps the UI to port 3000 and the API to port 8080.
    docker run -p 3000:3000 -p 8080:8080 ghcr.io/[OWNER/REPO]:latest
    ```

3.  **Access the Application**
    Open your browser and navigate to `http://localhost:3000`.

---

### Option 2: Build and Run with Docker Compose (Recommended)

This approach uses the `docker-compose.yml` file in the repository to build and run the services from the source code. It's ideal for developers who will be making changes to the code.

**Prerequisites:**
-   Git
-   Docker and Docker Compose (included with Docker Desktop).

**Steps:**

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/[OWNER/REPO].git
    cd [REPO]
    ```

2.  **Build and Start the Services**
    ```sh
    docker compose up --build
    ```
    The application will be available at `http://localhost:3000`. Hot-reloading is enabled for the UI.

3.  **To Stop the Services**
    Press `Ctrl+C` in the terminal, then run: `docker compose down`

---

### Option 3: Run Services Manually

This method is useful if you want to work on a single service and need direct control over the development server.

**Prerequisites:**
-   Node.js 18+ (LTS recommended) and npm
-   Java 17+ (for the API)

**Instructions:**
You will need to run the API and the UI in two separate terminal windows.

**1. Run the Backend (API):**
```sh
cd api

# On macOS/Linux
./mvnw spring-boot:run

# On Windows
./mvnw.cmd spring-boot:run
```
The API will start on http://localhost:8080.

2. Run the Frontend (UI):
```sh
cd ui

# Install dependencies
npm install

# Start the development server
npm run dev
```
---
The UI development server will start on `http://localhost:3000`.

## CI/CD & Hosting

This project uses GitHub Actions for CI and Cloudflare Pages for automatic deployment.

-   **GitHub Actions (CI):** Runs on every push and pull request to validate the codebase (install, lint, type-check, and build). Merges to the `main` branch produce artifacts ready for deployment.

-   **Cloudflare Pages (CD):** The GitHub repository is connected to Cloudflare. On updates to the `main` branch, Cloudflare automatically kicks off a new build and deploys the latest version of the site. The frontend is hosted as static assets for speed, reliability, and low maintenance.

-   **Backend (API):** The API module remains in the repo for future upgrades (dynamic content, authenticated endpoints). A CI/CD pipeline can be enabled when dynamic features go live.

## Issues & Enhancements

All issues, feature enhancements, and other details are maintained in Notion.

-   **[View Project Board on Notion](https://blushing-crocodile-5b5.notion.site/24865be3d86080639944db6a9416f0c9?v=24865be3d86081b0a9dd000ce078d94a)**

## Roadmap (Side Quests)

-   **Side Quest Page:** A living journal of blog posts, research papers, and other side-hustles.
-   **Playable Interactions:** Add small, playable microgames.
-   **Dynamic Content:** Surface achievements, timelines, or project metadata from the API.
-   **Deeper Arcade Theming:** Unlockable Easter eggs (Konami code?).
-   **Testing:** Add unit, component, and visual regression tests for key UI flows.

## Credits and Inspiration

-   **Boilerplate:** The initial UI was generated with [lovable.dev](https://lovable.dev/).
-   **Visual Language:** Inspired by classic arcade cabinets, CRT UI hints, and playful microinteractions.
-   **Open-Source Libraries:** React, Vite, TypeScript, and lucide-react.

---

If you have ideas to push the arcade experience further—or want to team up on a side quest—reach out. **Insert coin to continue…** 🎮
