# ChessGPT

## Goal
The goal of this project is to build an interactive chess platform that allows users to play against an AI opponent named Magnus, powered by GPT-4. The project will use prompt engineering techniques and an understanding of chess rules and strategies to extract meaningful and competitive moves from the GPT-4 model.

## How We Plan to Achieve This
1. Develop an effective prompt for GPT-4: We will use prompt engineering best practices and mental models to create a well-structured and concise prompt that asks Magnus for a recommended move and the rationale behind it.

2. Implement a chessboard representation: The project will use the FEN (Forsyth-Edwards Notation) format to represent the chessboard state and provide it to GPT-4 as part of the prompt.

3. Extract and apply the AI's move: We will parse the AI's response to extract the recommended move, enclosed within <move> tags, and update the chessboard accordingly.

4. Render the updated chessboard: The project will display the new board position after applying the AI's move, allowing users to visualize the game and plan their next move.

5. Interact with users: The project will receive user inputs for their moves and update the chessboard state, alternating between the user and the AI until the game concludes.
