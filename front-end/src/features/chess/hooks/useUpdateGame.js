import React from "react";
import { Toast } from "native-base";
import { useMutation, useQueryClient } from "react-query";
// internal
import { AxiosContext } from "src/services/axios.context";

export const useUpdateGame = (gameId) => {
  const { client } = React.useContext(AxiosContext);

  const queryClient = useQueryClient();

  return useMutation((payload) => client.put(`games/${gameId}/`, payload), {
    onSuccess: (resp) => {
      Toast.show({
        placement: "top",
        bg: "primary.600",
        title: "♜♝ Next move calculated successfully",
      });
      console.log(resp);
      queryClient.refetchQueries(["games", resp.data?.id]);
      return resp?.data;
    },
    onError: (error) => {
      console.error(error.response?.data);
      Toast.show({
        bg: "danger.900",
        title: i18n.t("general_error_toast_title"),
        description: "Something went wrong 😢 ...",
      });
    },
  });
};
