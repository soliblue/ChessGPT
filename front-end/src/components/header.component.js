import React from "react";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Button, Icon, VStack } from "native-base";
// internal components
import { Logo } from "src/components/logo.component";
import { AboutUs } from "src/components/about-us.component";

export const Header = () => (
  <VStack>
    <HStack p={5} bg="gray.900" justifyContent={"center"}>
      <HStack
        flex={1}
        maxW={992}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack space={1} alignItems="center">
          <Logo />
          <AboutUs />
        </HStack>

        <Button
          variant="solid"
          borderRadius={"full"}
          colorScheme={"secondary"}
          _text={{ color: "darkText" }}
          onPress={() => {
            Linking.openURL("https://github.com/SoliMouse/chessGPT");
          }}
          leftIcon={<Icon color="darkText" as={Ionicons} name="logo-github" />}
        >
          Star on GitHub
        </Button>
      </HStack>
    </HStack>
  </VStack>
);
