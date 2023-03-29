export const themeConfig = () => {
  return {
    useSystemColorMode: true,
    initialColorMode: "light",
    colors: {
      primary: {
        50: "#1b1b1b",
        100: "#171717",
        200: "#141414",
        300: "#101010",
        400: "#0d0d0d",
        500: "#0a0a0a",
        600: "#070707",
        700: "#040404",
        800: "#010101",
        900: "#000000",
      },
      secondary: {
        50: "#fefefe",
        100: "#fdfdfe",
        200: "#fcfcfd",
        300: "#fafbfc",
        400: "#f9fafb",
        500: "#f8f9fa",
        600: "#f7f8f9",
        700: "#f6f7f9",
        800: "#f5f6f8",
        900: "#f3f5f6",
      },
      tertiary: {
        50: "#e5f0fd",
        100: "#c8dff7",
        200: "#a7cdf0",
        300: "#85bce9",
        400: "#6caee4",
        500: "#316dca",
        600: "#2c63b7",
        700: "#264d9a",
        800: "#20377d",
        900: "#1a2260",
      },
    },
    fontConfig: {
      Recursive: {
        300: {
          normal: "Recursive_300Light",
        },
        400: {
          normal: "Recursive_400Regular",
        },
        500: {
          normal: "Recursive_500Medium",
        },
        600: {
          normal: "Recursive_600SemiBold",
        },
        700: {
          normal: "Recursive_700Bold",
        },
        800: {
          normal: "Recursive_800ExtraBold",
        },
        900: {
          normal: "Recursive_900Black",
        },
      },
    },
    fonts: {
      heading: "Recursive",
      body: "Recursive",
      mono: "Recursive",
    },
  };
};
