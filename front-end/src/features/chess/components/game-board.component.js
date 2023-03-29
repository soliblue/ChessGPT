import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { VStack, Text } from "native-base";

export const GameBoard = ({ initialFen = new Chess().fen() }) => {
  const [fen, setFen] = useState(initialFen);
  const [chess] = useState(new Chess());
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    chess.load(fen);
  }, [fen]);

  const handlePieceDrop = ({ sourceSquare, targetSquare }) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move) {
      setFen(chess.fen());
      makeAiMove();
    }
  };

  const makeAiMove = () => {
    setIsAiThinking(true);

    // Simulating an API call with a setTimeout
    setTimeout(() => {
      const legalMoves = chess.moves();
      const randomIndex = Math.floor(Math.random() * legalMoves.length);
      const randomMove = legalMoves[randomIndex];

      chess.move(randomMove);
      setFen(chess.fen());
      setIsAiThinking(false);
    }, 1000); // Feel free to adjust the delay
  };

  return (
    <VStack space={"2xl"} alignItems="center" justifyContent={"center"}>
      <Text fontWeight="bold" fontSize="3xl">
        {isAiThinking ? "AI is thinking..." : "Your turn"}
      </Text>
      <Chessboard position={fen} onDrop={handlePieceDrop} />
    </VStack>
  );
};
