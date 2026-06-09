import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import FormProvider from "@/shared/ui/Forms/FormProvider";
import RHFTextField from "@/shared/ui/Inputs/RHFTextField";
import { UserFormValues, userSchema } from "../schema/user.schema";
import AppButton from "@/shared/ui/Buttons/AppButton";
import RHFSwitch from "@/shared/ui/Inputs/RHF.Switch";
import RHFCheckBox from "@/shared/ui/Inputs/RHFCheckBox";
import RHFAutocomplete from "@/shared/ui/components/RHFAutocomplete";

const roleOptions = [
  { label: "Admin", id: "admin" },
  { label: "Editor", id: "editor" },
  { label: "User", id: "user" },
];

export default function UserCreateForm() {
  const methods = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      isActive: true,
      isAwsome: false,
      bio: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  console.log({ errors });
  const onSubmit = handleSubmit(async (values) => {
    console.log("submitted values", values);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <RHFTextField<UserFormValues> name="fullName" label="Full Name" />

        <RHFTextField<UserFormValues> name="email" label="Email" type="email" />

        {/* <RHFSelect<UserFormValues>
          name="role"
          label="Role"
          options={roleOptions}
        /> */}

        <RHFTextField<UserFormValues>
          name="bio"
          label="Bio"
          multiline
          minRows={4}
        />
        <RHFCheckBox name="isAwsome" />
        <RHFSwitch<UserFormValues> name="isActive" label="Active User" />
        <RHFAutocomplete label="role" name="roles" options={roleOptions} />
        <AppButton type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Create User"}
        </AppButton>
      </Stack>
    </FormProvider>
  );
}
