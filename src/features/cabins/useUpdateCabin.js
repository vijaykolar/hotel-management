import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ cabinData, id }) => createUpdateCabin(cabinData, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success(`Cabin ${data.name} updated`);
    },
    onError: (error) => toast.error(error.message),
  });
  return { isUpdating, updateCabin };
}
