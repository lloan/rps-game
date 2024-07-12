const game = {
    state: {
        mode: null,
        players: [],
        id: Math.random().toString(36).substring(2, 9),
        turn: 0,
        choosing: false,
        winner: null,
    },
    elements: {
        gameMode: document.getElementById('game-mode'),
        players: document.getElementById('players'),
        startButton: document.getElementById('start'),
        scoreboard: document.getElementById('scoreboard'),
        controls: document.getElementById('controls'),
        results: document.getElementById('results'),
        gameOptions: document.getElementById('game-options'),
        resultsText: document.getElementById('results-text'),
        message: document.getElementById('message'),
        messageText: document.getElementById('message-text'),
        playerOneWins: document.getElementById('player1-wins'),
        playerTwoWins: document.getElementById('player2-wins'),
        playerOneLabel: document.getElementById('player1-label'),
        playerTwoLabel: document.getElementById('player2-label'),
        loadGames: document.getElementById('load-games'),
        savedGames: document.getElementById('saved-games'),
    },
    loadGame: () => {
        document.getElementById('saved-games').classList.remove('hidden');

        const states = JSON.parse(localStorage.getItem('game'));
        const gamesList = document.getElementById('games-list');

        states.forEach((state) => {
            const li = document.createElement('li');
            li.innerHTML = `Game ID: ${state.id} | Mode: ${state.mode}`;

            const loadButton = document.createElement('button');
            loadButton.innerHTML = 'Load';
            loadButton.addEventListener('click', () => {
                // load the state of the game
                game.state = state;

                // remove the list of saved games
                game.elements.savedGames.remove();

                game.elements.gameMode.remove();
                // show the game interface
                game.showGameInterface();

                game.activateGameControls();

                game.gameOptions();

                game.elements.loadGames.remove();
            });
            li.appendChild(loadButton);

            gamesList.appendChild(li);
        });
    },
    getGameMode: () => {

        const load = document.getElementById('load');

        // add event listeners to the game mode buttons
        game.elements.gameMode.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', () => {
                // set game mode
                game.state.mode = button.dataset.mode;

                // remove game mode buttons - don't need them anymore
                game.elements.gameMode.remove();

                game.elements.loadGames.remove();

                // remove the list of saved games
                game.elements.savedGames.remove();

                if (game.state.mode === 'computer') {

                    // remove player 2 input from DOM
                    game.elements.players.querySelector('#player2').remove();

                    // show the input for player 1 name
                    game.elements.players.classList.remove('hidden');

                } else {
                    // show the input for player 1 and 2 names
                    game.elements.players.classList.remove('hidden');
                }
            });
        });

        load.addEventListener('click', () => {
            game.loadGame();
        });
    },
    getPlayers: () => {
        return new Promise((resolve, reject) => {
            game.elements.startButton.addEventListener('click', (e) => {
                // Get values from input fields for player names
                const player1 = document.getElementById('player1-name').value;
                const player2 = game.state.mode === 'player' ? document.getElementById('player2-name').value : 'computer';

                // Set players in game state 
                game.state.players = [{
                        name: player1,
                        wins: 0,
                        lastChoice: null,
                        turn: null,
                    },
                    {
                        name: player2,
                        wins: 0,
                        lastChoice: null,
                        turn: null,
                    }
                ];

                // Remove players input from DOM 
                game.elements.players.remove();

                resolve();
            });
        });
    },
    showGameInterface: () => {
        game.elements.scoreboard.classList.remove('hidden');
        game.elements.controls.classList.remove('hidden');
        game.elements.results.classList.remove('hidden');
        game.elements.scoreboard.classList.remove('hidden');
        game.elements.message.classList.remove('hidden');
        game.elements.gameOptions.classList.remove('hidden');

        game.elements.playerOneWins.innerHTML = game.state.players[0].wins;
        game.elements.playerTwoWins.innerHTML = game.state.players[1].wins;

        game.elements.playerOneLabel.innerText = game.state.players[0].name;
        game.elements.playerTwoLabel.innerText = game.state.players[1].name;


    },
    determineWinner: (player1Choice, player2Choice) => { 
        if (player1Choice === player2Choice) {
            game.elements.resultsText.innerHTML = 'tie';
        } else if (
            (player1Choice === 'rock' && player2Choice === 'scissors') ||
            (player1Choice === 'paper' && player2Choice === 'rock') ||
            (player1Choice === 'scissors' && player2Choice === 'paper')
        ) {
            game.state.players[0].wins++;
            game.elements.playerOneWins.innerHTML = game.state.players[0].wins;
            game.elements.resultsText.innerHTML = `${player1Choice} beats ${player2Choice}`;
        } else {
            game.state.players[1].wins++;
            game.elements.playerTwoWins.innerHTML = game.state.players[1].wins;
            game.elements.resultsText.innerHTML = `${player2Choice} beats ${player1Choice}`;
        }

        if (game.state.players[0].wins === 3) {
            game.state.winner = game.state.players[0].name;
            game.elements.resultsText.innerHTML = `${game.state.players[0].name} wins the game!`;
        } else if (game.state.players[1].wins === 3) {
            game.state.winner = game.state.players[1].name;
            game.elements.resultsText.innerHTML = `${game.state.players[1].name} wins the game!`;
        }
    },
    activateGameControls: () => {
        return new Promise((resolve, reject) => {
            game.elements.messageText.innerHTML = `It's ${game.state.players[game.state.turn].name}'s turn!`;

            // add event listeners to the game controls
            game.elements.controls.querySelectorAll('button').forEach((button) => {
                button.addEventListener('click', () => {
                    if (game.state.winner !== null) return;

                    // Get the player who clicked the button
                    const player = game.state.players[game.state.turn];

                    // Set the player's choice in the game state
                    player.lastChoice = button.dataset.choice;



                    if (game.state.mode === 'computer') {
                        // Set the computer's choice
                        game.elements.messageText.innerHTML = `It's ${game.state.players[game.state.turn].name}'s turn!`;

                        const choices = ['rock', 'paper', 'scissors'];
                        game.state.players[1].lastChoice = choices[Math.floor(Math.random() * choices.length)];

                        game.state.turn = 0;

                        setTimeout(() => {
                            game.elements.messageText.innerHTML = `It's ${game.state.players[game.state.turn].name}'s turn!`;

                            game.determineWinner(game.state.players[0].lastChoice, game.state.players[1].lastChoice)
                        }, 1000);
                    }

                    if (game.state.turn === 1 && game.state.mode !== 'computer') {
                        game.determineWinner(game.state.players[0].lastChoice, game.state.players[1].lastChoice)
                    }

                    // Update the turn in the game state
                    game.state.turn = game.state.turn === 0 ? 1 : 0;

                    if (game.state.mode !== 'computer') {
                        game.elements.messageText.innerHTML = `It's ${game.state.players[game.state.turn].name}'s turn!`;
                    }

                    if (game.state.winner !== null) {
                        game.elements.messageText.innerHTML = `Game is over!`;
                        game.elements.resultsText.innerHTML = `${game.state.winner} wins the game!`;
                    }
                });
            });

            resolve();
        });
    },
    clearText: () => {
        game.elements.resultsText.innerHTML = 'No winner yet';
        game.elements.messageText.innerHTML = `It's ${game.state.players[game.state.turn].name}'s turn!`;
    },
    gameOptions: () => {
        const save = document.getElementById('save');
        const reset = document.getElementById('reset');

        reset.addEventListener('click', () => {
            window.location.reload();
        });

        save.addEventListener('click', () => {
            // if there is a storage item by that name, add our state to the list of states
            if (localStorage.getItem('game')) {
                const states = JSON.parse(localStorage.getItem('game'));
                states.push(game.state);
                localStorage.setItem('game', JSON.stringify(states));
            } else {
                // otherwise, create a new list with our state
                localStorage.setItem('game', JSON.stringify([game.state]));
            }
        });
    },
    init: async () => {
        game.getGameMode();

        await game.getPlayers();

        game.showGameInterface();

        await game.activateGameControls();

        game.gameOptions();
    },
};