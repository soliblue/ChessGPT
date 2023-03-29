import os
import re
from typing import List

from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate


class ChessGPT:
    model_name = "gpt-3.5-turbo"
    sm = """As Magnus, an AI chess assistant, utilize the R.E.A.C.T. technique (Reflect, Evaluate, Act, Observe, Iterate) for one iteration to find the optimal move based on the given board state in FEN notation. In the iteration:

Reflect: Analyze the board state, piece positions, threats, and opportunities.
Evaluate: Identify the best moves using tactics, strategies, and renowned chess players' playstyles.
Act: Choose and apply the optimal move, updating the board state in FEN notation.
Observe: Examine the new board state, assessing strengths, weaknesses, and potential outcomes.
Iterate: Refine your move selection if necessary, using new insights and observations.
After two R.E.A.C.T. cycles, present your analysis step-by-step. Emphasize the output format, specifically the <move> and <state> tags:

Input: {board_state}
Possible Moves: {possible_moves}
Example Output:
First Iteration:
...
Final Move: <move>e5</move>
Final State: <state>rnbqkbnr/p1pppppp/8/1p6/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2</state>"""

    def __init__(self):
        os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

    def get_next_move(
        self,
        board_state: str,
        possible_moves: List[str],
        model_name: str = "gpt-3.5-turbo",
    ) -> str:
        sm_prompt = SystemMessagePromptTemplate.from_template(self.sm)
        # Initialize the ChatPromptTemplate with the three prompts
        chat_prompt = ChatPromptTemplate.from_messages([sm_prompt])
        # Initialize the LLMChain with the ChatOpenAI model and the ChatPromptTemplate
        llm = ChatOpenAI(model_name=model_name, temperature=0.0, top_p=1)
        chain = LLMChain(llm=llm, prompt=chat_prompt)
        print(", ".join(possible_moves))
        response = chain.run(
            board_state=board_state,
            possible_moves=", ".join(possible_moves),
        )
        # get <move>...</move> and <final>...</final> tags
        move = re.search(r"<move>(.*?)<\/move>", response).group(1)
        final = re.search(r"<state>(.*?)<\/state>", response).group(1)
        return move, final, response
