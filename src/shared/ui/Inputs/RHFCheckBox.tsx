import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

type TRHFCheckBox<T extends FieldValues> = CheckboxProps & {
  name: Path<T>;
  label?: string;
};

function RHFCheckBox<T extends FieldValues>({ name, label }: TRHFCheckBox<T>) {
  const { control, watch } = useFormContext<T>();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });
  console.log({ error });

  return (
    <FormControl error={!!error}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            onChange={(e) => field.onChange(e.target.checked)}
            checked={!!field.value}
            onBlur={field.onBlur}
          />
        }
      />
    </FormControl>
  );
}

export default RHFCheckBox;
