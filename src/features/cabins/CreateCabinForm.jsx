import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { createUpdateCabin } from "../../services/apiCabins.js";
import { useCreateCabin } from "./useCreateCabin.js";
import { useUpdateCabin } from "./useUpdateCabin.js";

function CreateCabinForm({ cabinToUpdate = {} }) {
  const { id: cabinId, ...cabinUpdateValues } = cabinToUpdate;
  const isEditSession = Boolean(cabinId);

  const { register, handleSubmit, formState, reset, getValues } = useForm({
    defaultValues: isEditSession ? cabinUpdateValues : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  // const { mutate: createCabin, isLoading: isCreating } = useMutation({
  //   mutationFn: createUpdateCabin,
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     toast.success(`Cabin ${data.name} created`);
  //     reset();
  //   },
  //   onError: (error) => toast.error(error.message),
  // });
  // Update cabin
  // const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
  //   mutationFn: ({ cabinData, id }) => createUpdateCabin(cabinData, id),
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     toast.success(`Cabin ${data.name} updated`);
  //     reset();
  //   },
  //   onError: (error) => toast.error(error.message),
  // });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      updateCabin({
        cabinData: { ...data, image },
        id: cabinId,
      });
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => reset(),
        },
      );
    }
  }

  function onError(errors) {
    console.log("Failed validation!", errors);
  }

  const isWorking = isCreating || isUpdating;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Can't be empty, make it at least 0",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount should be less than regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          // onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Save" : "Create a cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
