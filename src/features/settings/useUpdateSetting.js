import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings.js";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const {
    isLoading: isUpdating,
    mutate: updateSetting,
    error,
  } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success(`Settings updated`);
    },
    onError: (error) => toast.error(error.message),
  });
  return { isUpdating, updateSetting, error };
}
