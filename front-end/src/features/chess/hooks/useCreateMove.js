import React from "react";
import { useMutation } from "react-query";
import { AxiosContext } from "src/services/axios.context";
// internal utils
import { showToast } from "src/utils/toast";

export const useCreateMove = () => {
  const { client } = React.useContext(AxiosContext);

  return useMutation((payload) => client.post(`moves/`, payload), {
    onSuccess: (resp) => resp?.data,
    onError: (error) => {
      console.error(error.response?.data);
      showToast("Something went wrong 😢", "error");
    },
  });
};
