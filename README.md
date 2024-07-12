# Rock Paper Scissors (RPS) Basic Game

This project implements a simple Rock, Paper, Scissors game where two players can compete against each other or against a computer. It features basic game mechanics, player input, game mode selection, saving/loading game states, and UI interactions. The game is built using HTML, CSS, and JavaScript, with a focus on modularity, responsiveness, and user experience. Due to time constraints, the project is a basic implementation and can be further enhanced with additional features and improvements in the future.

## Features

- **Game Modes**:
  - **vs computer**: Play against the computer.
  - **vs player**: Play against another player.

- **Player Input**:
  - Players can enter their names to personalize the game experience.

- **Game Interface**:
  - Displays a scoreboard showing the number of wins for each player.
  - Controls for selecting rock, paper, or scissors.
  - Results section to display game outcomes and messages.

- **Save/Load Game**:
  - Allows saving the game state to local storage.
  - Provides the ability to load previously saved games.

## Why It Was Built This Way

The project was designed to provide a straightforward implementation of the classic Rock, Paper, Scissors game with the following considerations:

- **Simple UI**: The UI is minimalistic and easy to understand, focusing on the core gameplay elements without unnecessary distractions.

- **Modular JavaScript**: Using an object-oriented approach (`game` object) organizes the game's state and functionality neatly, making it easier to maintain and extend.

- **Responsive Design**: The layout adapts well to different screen sizes, ensuring a consistent user experience across devices.

## To-Dos for Improvements

1. **Separation of Concerns**:
   - Refactoring `game` Object: Separate game state management from DOM manipulation for better code organization and maintainability.

2. **Error Handling**:
   - Validation of Player Names: Implement validation to ensure player names are entered before starting the game to avoid errors during gameplay.

3. **Game Logic Centralization**:
   - Centralizing Game Logic: Move game logic (e.g., determining the winner) into dedicated modules or functions to improve reusability and testability.

4. **Reusable Components**:
   - Button Component: Create a reusable function for generating buttons with specific attributes (e.g., data attributes) to reduce redundancy and enhance code modularity.

5. **Enhanced AI for Computer Mode**:
   - AI Strategy Pattern: Implement a more sophisticated AI strategy for the computer player instead of random choices, providing a more challenging experience.

6. **Consistent Naming and Code Style**:
   - Ensure consistent naming conventions (e.g., camelCase) and code style across the entire codebase for improved readability and maintainability.

7. **Visual Feedback and UX**:
   - Animations and Transitions: Introduce animations/transitions for UI elements to enhance visual feedback and user engagement.

8. **Accessibility Enhancements**:
   - Keyboard Navigation: Implement keyboard accessibility for users who prefer navigating with keyboards.
   - Screen Reader Compatibility: Ensure all game elements are accessible to screen readers with appropriate ARIA roles and labels.

9. **Optimized Event Handling**:
   - Event Delegation: Use event delegation where applicable to optimize event handling and improve performance, especially with multiple DOM elements.
 