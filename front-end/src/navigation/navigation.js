import * as React from "react";
import { Platform } from "react-native";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// internal
import { appRoutesConfig } from "./route.config";
import { GameCreateScreen } from "src/features/chess/screens/game-create.screen";
import { GameDetailScreen } from "src/features/chess/screens/game-detail.screen";

const Stack = createStackNavigator();

export const Navigation = () => (
  <NavigationContainer
    documentTitle={{
      enabled: false,
    }}
    linking={
      Platform.OS === "web"
        ? {
            enabled: true,
            config: appRoutesConfig,
            prefixes: [Linking.createURL("/"), "https://chessGPT.xyz/"],
          }
        : undefined
    }
  >
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GameCreate" component={GameCreateScreen} />
      <Stack.Screen name="GameDetail" component={GameDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
