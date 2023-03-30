import React from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { VStack, Text, Button } from "native-base";
import { showToast } from "src/utils/toast";
import { useCreateMove } from "src/features/chess/hooks/useCreateMove";

export const GameBoard = ({ initialFen = new Chess().fen() }) => {
  const [fen, setFen] = React.useState(initialFen);
  const [chess] = React.useState(new Chess());
  const createMove = useCreateMove();

  const makeLegalMove = (sourceSquare, targetSquare) => {
    try {
      chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      setFen(chess.fen());
    } catch (error) {
      showToast("Illegal move", "error");
    }
  };

  const handlePieceDrop = ({ sourceSquare, targetSquare }) => {
    makeLegalMove(sourceSquare, targetSquare);
  };

  const makeAiMove = async () => {
    const payload = {
      board_state_fen: chess.fen(),
      board_state_ascii: chess.ascii(),
      possible_moves: chess.moves().join(", "),
    };
    console.log(JSON.stringify(payload, null, 2));
    const resp = await createMove.mutateAsync(payload);
    makeLegalMove(resp?.data?.from_square, resp?.data?.to_square);
  };

  React.useEffect(() => {
    chess.load(fen);
  }, [fen]);

  return (
    <VStack space={"2xl"} alignItems="center" justifyContent={"center"}>
      <Button onPress={makeAiMove}>AI Move</Button>
      <Text fontWeight="bold" fontSize="3xl">
        {createMove?.isLoading ? "ChatGPT is thinking..." : "Your turn"}
      </Text>
      <Chessboard
        width={Math.min(
          window?.innerWidth * 0.9,
          window?.innerHeight * 0.75,
          500
        )}
        lightSquareStyle={{
          backgroundColor: "#f0f0f0",
        }}
        darkSquareStyle={{
          backgroundColor: "lightgray",
        }}
        position={fen}
        onDrop={handlePieceDrop}
      />
    </VStack>
  );
};
