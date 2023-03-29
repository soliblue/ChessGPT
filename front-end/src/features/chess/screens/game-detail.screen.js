import React from "react";
import { Spinner, VStack } from "native-base";
import { Header } from "src/components/header.component";
import { Footer } from "src/components/footer.component";
// internal hooks
import { useGame } from "src/features/chess/hooks/useGame";
import { useUpdateGame } from "src/features/chess/hooks/useUpdateGame";
// internal components
import { GameChat } from "src/features/chess/components/game-chat.component";
import { GameBoard } from "src/features/chess/components/game-board.component";

export const GameDetailScreen = ({ route }) => {
  const { gameId } = route.params;

  const game = useGame(gameId);
  const updateGame = useUpdateGame(gameId);

  console.log("game?.data?.board?.state", game?.data?.board?.state);

  return (
    <VStack flex={1} space={"sm"} justifyContent="space-between">
      <Header />
      <VStack space={"xl"} justifyContent="center">
        {game?.isLoading || !game?.data ? (
          <Spinner />
        ) : (
          <>
            <GameChat moves={game?.data?.moves} />
            <GameBoard
              onAIMove={updateGame}
              initialFen={game?.data?.board?.state}
            />
          </>
        )}
      </VStack>

      <Footer />
    </VStack>
  );
};
