# Contributing to Tribe MUD DApp Scaffold

We welcome contributions to the Tribe MUD DApp Scaffold! By following these guidelines, you can help us maintain a consistent and high-quality codebase.

## 1. Getting Started

To set up your development environment, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/Tribe-MUD-DApp-Scaffold.git
    cd Tribe-MUD-DApp-Scaffold
    ```

2.  **Install dependencies:** This project uses `pnpm` as a package manager.
    ```bash
    pnpm install
    ```

3.  **Start Docker services:** The `eveworld` package uses Docker for its services.
    ```bash
    docker-compose -f packages/eveworld/docker-compose.yaml up -d
    ```
    Ensure Docker Desktop or your Docker environment is running.

## 2. Code Style

We strive for a consistent code style across the project.

*   **Editor Configuration:** Please ensure your editor is configured to respect the settings in the project's [`.editorconfig`](.editorconfig) file. This helps maintain consistent indentation and formatting.
*   **Commenting Guidelines:** Refer to the [COMMENTING_GUIDELINES.md](docs/COMMENTING_GUIDELINES.md) for best practices on writing clear and effective comments in the codebase.

## 3. Pull Request Process

When submitting a Pull Request (PR), please adhere to the following:

*   **Branching:** Create a new branch from `main` for your changes.
    ```bash
    git checkout -b feature/your-feature-name
    ```
*   **Commit Messages:** Write clear and concise commit messages that explain the purpose of each commit.
*   **PR Description:** Provide a detailed description of your changes, including:
    *   What problem does this PR solve?
    *   How was it solved?
    *   Any relevant screenshots or GIFs for UI changes.
    *   Reference any related issues (e.g., `Fixes #123`, `Closes #456`).
*   **Review:** Your PR will be reviewed by maintainers. Be prepared to address feedback and make necessary adjustments.

## 4. Package-specific Guidelines

This monorepo consists of several packages, each with its own characteristics:

*   **`packages/client` (React/TypeScript):** This is the frontend application built with React and TypeScript. Follow standard React component patterns, TypeScript best practices, and ensure responsive design where applicable.
*   **`packages/contracts` (Solidity):** This package contains the smart contracts written in Solidity. Adhere to secure coding practices, write comprehensive tests, and ensure gas efficiency.
*   **`packages/eveworld` (Docker):** This package manages Docker-based services. Ensure `docker-compose.yaml` files are well-documented and services are configured for development and production environments.

## 5. License

By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).

---

Thank you for contributing to the Tribe MUD DApp Scaffold!