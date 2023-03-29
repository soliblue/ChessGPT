import re
from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, Field, validator


class Board(BaseModel):
    state: str = Field(...)
    possible_moves: Optional[List[str]]

    @validator("state")
    def validate_state(cls, fen: str) -> str:
        fen_regex = r"^[\w/]+ [bw] [KQkq-]+ .*"
        if not re.match(fen_regex, fen):
            raise ValueError("Invalid FEN notation")
        return fen

    @validator("possible_moves", each_item=True)
    def validate_possible_moves(cls, move: str) -> str:
        move_regex = r"^[a-zA-Z0-9]{2,5}$"
        if not re.match(move_regex, move):
            raise ValueError("Invalid chess move in FEN notation")
        return move


class MoveCreate(BaseModel):
    move: str
    initial_board: Board = Field(...)
    updated_board: Board = Field(...)

    @validator("move")
    def validate_move(cls, move: str) -> str:
        move_regex = r"^[a-zA-Z0-9]{2,5}$"
        if not re.match(move_regex, move):
            raise ValueError("Invalid chess move in FEN notation")
        return move


class Move(MoveCreate):
    role: str = Field(...)
    response: Optional[str] = None
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class GameUpdate(BaseModel):
    board: Board = Field(...)
    moves: List[Move] = Field(..., min_items=1)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Game(GameUpdate):
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
