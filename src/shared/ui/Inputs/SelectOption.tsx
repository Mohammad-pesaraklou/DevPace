import * as React from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getBoardsClient } from "@/features/bord/actions/bord.actions";
import useBordStore from "@/store/createBoardSlice";
import useAuth from "@/store/authSlice";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectOption({ setValue, value }: Props) {
  const [search, setSearch] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const borderId = useBordStore((state) => state.bord?._id);
  const userId = useAuth((state) => state.user?.id)?.toString()!;
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["bords"],
    enabled: !!userId,
    queryFn: () => getBoardsClient(userId),
    select(data) {
      if (Array.isArray(data)) {
        return data
          .map((bord) => ({ _id: bord._id, title: bord.title }))
          .filter((item) => item._id !== borderId);
      }

      return [];
    },
  });

  const form_error = touched && !value;

  const filtredData = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data ?? [];

    return (
      data?.filter((bord) => bord.title.toLowerCase().includes(query)) ?? []
    );
  }, [data, search]);

  function handleChangeEvent(e: SelectChangeEvent<string>) {
    setValue(e.target.value);
  }

  const getLabel = React.useCallback(
    (id: string) => data?.find((o) => String(o._id) === id)?.title ?? id,
    [data],
  );

  return (
    <Box sx={{ maxWidth: 520 }}>
      <FormControl fullWidth error={form_error}>
        <InputLabel id="bords-label">{isLoading ? "" : "Bords"}</InputLabel>

        <Select
          labelId="bords-label"
          input={isLoading ? <Select /> : <OutlinedInput label="Bords" />}
          value={value}
          onClose={() => setTouched(true)}
          onChange={handleChangeEvent}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return (
                <span style={{ opacity: 0.6 }}>
                  {isLoading ? "Select a bord…" : ""}
                </span>
              );
            }

            return (
              <Typography variant="body1">{getLabel(selected)}</Typography>
            );
          }}
        >
          <MenuItem
            sx={{ cursor: "default", p: "10px 16px" }}
            disableRipple
            disableTouchRipple
          >
            <TextField
              disabled={isLoading || !Array.isArray(data)}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              size="small"
              fullWidth
              placeholder="search..."
              name="search"
              aria-label="search through your bords"
            />
          </MenuItem>

          {isLoading && (
            <MenuItem disableRipple sx={{ justifyContent: "center" }}>
              <CircularProgress size={18} />
            </MenuItem>
          )}

          {isError && (
            <MenuItem disableRipple sx={{ justifyContent: "center" }}>
              <FormHelperText variant="filled">
                {(error as Error)?.message ||
                  "something went wrong in fetching bords try again"}
              </FormHelperText>
            </MenuItem>
          )}

          {!isLoading && (
            <MenuItem disableRipple sx={{ cursor: "default" }}>
              <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                <Typography
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setValue("");
                  }}
                  sx={{ cursor: "pointer", color: "primary.main" }}
                >
                  Clear selection
                </Typography>
              </Stack>
            </MenuItem>
          )}

          {!isLoading &&
            filtredData.map((bord) => {
              const selected = value === String(bord._id);

              return (
                <MenuItem
                  key={String(bord._id)}
                  disableRipple
                  value={String(bord._id)}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: selected ? 700 : 400 }}
                  >
                    {bord.title}
                  </Typography>
                </MenuItem>
              );
            })}
        </Select>

        <FormHelperText>
          {form_error
            ? "Selecting a bord is required."
            : "Pick the bord you want to move this column to."}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
