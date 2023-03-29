import React from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, Spinner, VStack } from "native-base";

export const GameBoard = ({ fen, setFen, onAIMove }) => {
  const [isHumanTurn, setIsHumanTurn] = React.useState(true);

  const chess = new Chess(fen);

  const onHumanMove = async ({ sourceSquare, targetSquare }) => {
    console.log("Human move");
    setIsHumanTurn(false);
    // Check if the move is legal
    const legalMove = chess.moves({ verbose: true }).some((move) => {
      return move.from === sourceSquare && move.to === targetSquare;
    });
    if (legalMove) {
      console.log("Legal move");
      // Prepare payload for API call with current state of the board
      const payload = {
        move: targetSquare,
        initial_board: {
          state: chess.fen(),
          possible_moves: chess.moves(),
        },
      };
      // Make the move
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      // Add the updated board to the payload
      payload.updated_board = {
        state: chess.fen(),
        possible_moves: chess.moves(),
      };
      console.log(payload);
      // Update the board
      setFen(chess.fen());
      // Call the API
      const aiMove = await onAIMove.mutateAsync(payload);
      // Make the AI move
      console.log(aiMove);
    }
    setIsHumanTurn(true);
  };

  return (
    <VStack space={"2xl"} alignItems="center" justifyContent={"center"}>
      <HStack>
        {onAIMove?.isLoading ? (
          <Spinner />
        ) : (
          <Icon size={"2xl"} name="play" as={Ionicons} color="darkText" />
        )}
      </HStack>
      {chess && (
        <Chessboard
          position={fen}
          onDrop={onHumanMove}
          enableDrag={!onAIMove?.isLoading && isHumanTurn}
          boardStyle={{
            borderRadius: "5px",
            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
          }}
        />
      )}
    </VStack>
  );
};
