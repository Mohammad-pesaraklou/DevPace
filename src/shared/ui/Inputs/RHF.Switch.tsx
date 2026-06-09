import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

type RHFSwitchProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
};

export default function RHFSwitch<TFieldValues extends FieldValues>({
  name,
  label,
}: RHFSwitchProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl error={!!error}>
      <FormControlLabel
        label={label}
        control={
          <Switch
            checked={!!field.value}
            onChange={(_, checked) => field.onChange(checked)}
            onBlur={field.onBlur}
            slotProps={{
              input: {
                ref: field.ref,
              },
            }}
          />
        }
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
