// src/components/form/RHFAutocomplete.tsx
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

export type OptionBase = {
  id: string;
  label: string;
};
type RHFAutocompleteProps<
  TFieldValues extends FieldValues,
  TOption extends OptionBase,
  TMultiple extends boolean = false,
> = Omit<
  AutocompleteProps<TOption, TMultiple, false, false>,
  "value" | "onChange" | "renderInput" | "options"
> & {
  name: Path<TFieldValues>;
  options: TOption[];
  multiple?: TMultiple;
  label: string;
  textFieldProps?: TextFieldProps;
  loading?: boolean;
};

export default function RHFAutocomplete<
  TFieldValues extends FieldValues,
  TOption extends OptionBase,
  TMultiple extends boolean = false,
>({
  name,
  options,
  multiple,
  label,
  textFieldProps,
  loading,
  ...props
}: RHFAutocompleteProps<TFieldValues, TOption, TMultiple>) {
  const { control } = useFormContext<TFieldValues>();
  const { field, fieldState } = useController({ name, control });

  // form state: string | string[] (ids)
  const ids = (field.value ?? (multiple ? [] : null)) as any;

  const value = multiple
    ? options.filter((o) => (ids as string[]).includes(o.id))
    : (options.find((o) => o.id === (ids as string | null)) ?? null);

  return (
    <Autocomplete
      {...(props as any)}
      multiple={multiple as any}
      options={options}
      value={value as any}
      loading={loading}
      //   isOptionEqualToValue={(a, b) => a.id === b.id}
      //   getOptionLabel={(o) => o.label}
      onChange={(_, newValue) => {
        if (multiple) {
          const arr = (newValue as TOption[]).map((x) => x.id);
          field.onChange(arr);
        } else {
          const v = (newValue as TOption | null)?.id ?? null;
          field.onChange(v);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message || textFieldProps?.helperText}
          onBlur={field.onBlur}
          inputRef={field.ref}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          {...textFieldProps}
        />
      )}
    />
  );
}
