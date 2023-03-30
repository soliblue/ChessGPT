import os
import re

from app.internal.config import log
from fastapi import APIRouter, status
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate
from pydantic import BaseModel

router = APIRouter()


class MoveCreate(BaseModel):
    board_state_ascii: str
    board_state_fen: str
    possible_moves: str


class Move(BaseModel):
    message: str
    from_square: str
    to_square: str


@router.post("/", response_model=Move, status_code=status.HTTP_200_OK)
async def get_move(payload: MoveCreate):
    log.info(f"Generating next move payload {payload.dict()}")
    os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
    sm_prompt = SystemMessagePromptTemplate.from_template(
        """
        Hello Magnus, given the current chessboard position in FEN format: {board_state},
        and considering the following possible moves: {possible_moves}, please analyze the
        board and explain the strategic rationale behind your suggested move.

        Your primary goal is to find the strongest move available, taking into account
        tactics, material gains, and overall position. After your explanation, provide the
        optimal move you recommend in algebraic notation, enclosed in corresponding tags
        (e.g. <from>e2</from><to>e3</to>).

        Please ensure your response is concise, well-structured, and accurate.
        """
    )
    # Initialize the ChatPromptTemplate with the three prompts
    chat_prompt = ChatPromptTemplate.from_messages([sm_prompt])
    # Initialize the LLMChain with the ChatOpenAI model and the ChatPromptTemplate
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.0, top_p=1)
    chain = LLMChain(llm=llm, prompt=chat_prompt)
    message = chain.run(
        board_state=payload.board_state_fen,
        possible_moves=payload.possible_moves,
    )
    print(message)
    # get <move>...</move> and <final>...</final> tags
    return {
        "message": message,
        "to_square": re.search(r"<to>(.*?)<\/to>", message).group(1),
        "from_square": re.search(r"<from>(.*?)<\/from>", message).group(1),
    }
