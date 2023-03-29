import React from "react";
import { Linking } from "react-native";
import { HStack, Text, Pressable, VStack } from "native-base";

const openURL = (url) => {
  Linking.openURL(url);
};

const FooterLink = ({ url, children }) => (
  <Pressable onPress={() => openURL(url)}>
    <Text fontWeight={"bold"}>{children}</Text>
  </Pressable>
);

export const Footer = () => (
  <VStack bg="gray.50" py={3} space={"sm"}>
    <HStack justifyContent={"center"}>
      <Text
        color="black"
        fontSize={"sm"}
        letterSpacing="lg"
        fontWeight={"semibold"}
      >
        {"Made with 🖤 by "}
        <FooterLink url="https://twitter.com/_xSoli">Soli</FooterLink>{" "}
      </Text>
    </HStack>
  </VStack>
);
