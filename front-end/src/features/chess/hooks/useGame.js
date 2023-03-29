import React from "react";
import { useQuery } from "react-query";
import { doc, getDoc, collection } from "firebase/firestore";
// internal
import { FirebaseContext } from "src/services/firebase.context";

export const useGame = (gameId) => {
  const { firestore } = React.useContext(FirebaseContext);

  return useQuery(
    ["game", gameId],
    () => {
      console.debug(`💬 Game ${gameId}`);
      return getDoc(doc(collection(firestore, "games"), gameId)).then((doc) =>
        doc.data()
      );
    },
    {
      onError: (error) => console.error(error),
      enabled: !!gameId,
    }
  );
};
