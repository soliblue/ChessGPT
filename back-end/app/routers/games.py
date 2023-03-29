from uuid import UUID

from app.daos.games import GamesDAO
from app.internal.ChessGPT import ChessGPT
from app.internal.config import log
from app.schemas.games import Board, Game, GameUpdate, Move, MoveCreate
from fastapi import APIRouter, HTTPException, status

router = APIRouter()


@router.post("/", response_model=Game, status_code=status.HTTP_200_OK)
async def create_game(payload: MoveCreate):
    log.info(f"Generating next move for a new game with payload {payload.dict()}")
    gameDao = GamesDAO()
    # Process user's move
    user_move = Move(
        role="user",
        **payload.dict(),
    )
    # Calculate Magnus's (AI) next move
    chessGPT = ChessGPT()
    move, updated_board_state, response = chessGPT.get_next_move(
        board_state=payload.updated_board.state,
        possible_moves=payload.updated_board.possible_moves,
    )
    # Process Magnus's move
    assistant_move = Move(
        move=move,
        role="assistant",
        response=response,
        initial_board=payload.updated_board,
        updated_board=Board(state=updated_board_state),
    )
    # Save a new game with both moves in firestore
    game_create = Game(
        board=Board(state=updated_board_state), moves=[user_move, assistant_move]
    )
    return gameDao.create(game_create)


@router.put("/{game_id}/", response_model=Game, status_code=status.HTTP_200_OK)
async def update_game(payload: MoveCreate, game_id: UUID):
    log.info(f"Generating next move for game {game_id} with payload {payload.dict()}")
    gameDao = GamesDAO()
    game = gameDao.get(game_id)
    if game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    user_move = Move(
        role="user",
        **payload.dict(),
    )
    # Calculate Magnus's (AI) next move
    chessGPT = ChessGPT()
    move, updated_board_state, response = chessGPT.get_next_move(
        board_state=payload.updated_board.state,
        possible_moves=payload.updated_board.possible_moves,
    )
    # Process Magnus's move
    assistant_move = Move(
        role="assistant",
        move=move,
        response=response,
        initial_board=payload.updated_board,
        updated_board=Board(state=updated_board_state),
    )
    # Save a new game with both moves in firestore
    game_update = GameUpdate(
        board=Board(state=updated_board_state),
        moves=game.moves
        + [
            user_move,
            assistant_move,
        ],
    )
    return gameDao.update(game_id, game_update)
