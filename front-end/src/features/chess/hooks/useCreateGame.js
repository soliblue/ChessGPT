import React from "react";
import { Toast } from "native-base";
import { useMutation } from "react-query";
import { AxiosContext } from "src/services/axios.context";

export const useCreateGame = () => {
  const { client } = React.useContext(AxiosContext);

  return useMutation((payload) => client.post(`games/`, payload), {
    onSuccess: (resp) => {
      Toast.show({
        title: "Game created successfully 🎶",
      });
      return resp?.data;
    },
    onError: (error) => {
      console.error(error.response?.data);
      Toast.show({
        title: "Something went wrong 😢 ...",
      });
    },
  });
};
