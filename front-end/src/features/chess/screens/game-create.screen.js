import React from "react";
import { VStack } from "native-base";
import { Header } from "src/components/header.component";
import { Footer } from "src/components/footer.component";
// internal hooks
import { useCreateGame } from "src/features/chess/hooks/useCreateGame";
// internal components
import { GameBoard } from "src/features/chess/components/game-board.component";

export const GameCreateScreen = ({ navigation }) => {
  const [fen, setFen] = React.useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const createGame = useCreateGame();

  React.useEffect(() => {
    if (createGame.isSuccess) {
      console.debug(`🎉 Game created: ${createGame?.data?.data?.id}`);
      navigation.navigate("GameDetail", { gameId: createGame?.data?.data?.id });
    }
  }, [createGame.isSuccess]);

  return (
    <VStack flex={1} space={"2xl"}>
      <Header />
      <VStack flex={1} justifyContent="center">
        <GameBoard fen={fen} setFen={setFen} onAIMove={createGame} />
      </VStack>
      <Footer />
    </VStack>
  );
};
