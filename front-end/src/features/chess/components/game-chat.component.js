import React from "react";
import Chessboard from "chessboardjsx";
import { VStack, Text, FlatList, ScrollView, HStack, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const GameChat = ({ moves, width = 200 }) => {
  return (
    <FlatList
      data={moves}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <VStack m={5} shadow={1} key={item.id} width={width}>
          <HStack justifyContent={"center"}>
            <Chessboard
              width={width}
              position={item?.initial_board?.state}
              boardStyle={{
                borderRadius: "5px",
              }}
            />
          </HStack>
          <HStack
            p={3}
            space={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Icon
              size={"xl"}
              as={Ionicons}
              color={"darkText"}
              name="calculator"
            />
            <Text fontSize={"xl"} color={"darkText"}>
              {item?.move}
            </Text>
          </HStack>
        </VStack>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
