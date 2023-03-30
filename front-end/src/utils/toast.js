import { Ionicons } from "@expo/vector-icons";
import { Toast, Text, Icon, HStack } from "native-base";

export const showToast = (title, status) => {
  const statusToIconName = {
    success: "checkmark-circle",
    error: "close-circle",
    warning: "alert-circle",
  };

  Toast.show({
    position: "top",
    render: () => (
      <HStack
        px={3}
        py={2}
        space={3}
        maxWidth={500}
        borderWidth={2}
        alignSelf="center"
        bg={`${status}.200`}
        borderColor={`${status}.800`}
      >
        <Icon
          size="xl"
          as={Ionicons}
          color={`${status}.800`}
          name={statusToIconName[status]}
        />
        <Text fontSize={"xl"} color={`${status}.900`}>
          {title}
        </Text>
      </HStack>
    ),
  });
};
