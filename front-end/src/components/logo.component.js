import React from "react";
import { Box, HStack, Text, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";

export const Logo = () => {
  const size = 5;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.push("GameCreate");
      }}
    >
      <HStack alignItems={"center"} space={"xs"}>
        <Box
          width={size}
          height={size}
          alignSelf={"center"}
          borderRadius={"full"}
          bg={{
            linearGradient: {
              end: [1, 1],
              start: [0, 1],
              colors: ["lightgray", "white"],
            },
          }}
        />
        <Text color="lightText" fontWeight={"bold"} fontSize="lg">
          chessGPT.xyz
        </Text>
      </HStack>
    </Pressable>
  );
};
