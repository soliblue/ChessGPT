import React from "react";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

export const FirebaseContext = React.createContext(null);

export const FirebaseContextProvider = ({ children }) => {
  const firebaseConfig = Constants.manifest.extra.firebase;
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const analytics = getAnalytics(app);
  console.debug("🔥  Firestore + Storage + Anlaytics");

  return (
    <FirebaseContext.Provider
      value={{
        app,
        storage,
        firestore,
        analytics,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
