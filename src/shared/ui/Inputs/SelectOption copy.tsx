import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
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
import { getBoards } from "@/features/bord/actions/bord.actions";

export default function SelectOption() {
  const [value, setValue] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const { isLoading, data, error, isError, isPending } = useQuery({
    queryKey: ["bords"],
    queryFn: getBoards,
    select(data) {
      if (Array.isArray(data)) {
        return data.map((bord) => ({ _id: bord._id, title: bord.title }));
      }
    },
  });

  const form_error = touched && value.length === 0;

  const filtredData = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data ?? [];
    return (
      data?.filter((bord) => bord.title.toLowerCase().includes(query)) || []
    );
  }, [data, search]);

  function handleChangeEvent(e: SelectChangeEvent<typeof value>) {
    const next =
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value;
    setValue(next);
  }

  const allFilteredIds = React.useMemo(
    () => filtredData.map((o) => String(o._id)),
    [filtredData],
  );

  const isAllFilteredSelected =
    allFilteredIds.length > 0 &&
    allFilteredIds.every((id) => value.includes(id));

  const handleSelectAllFiltered = () => {
    // union(current value, filtered ids)
    const next = Array.from(new Set([...value, ...allFilteredIds]));
    setValue(next);
  };

  const handleClearFiltered = () => {
    // remove filtered ids from selection
    const filteredSet = new Set(allFilteredIds);
    setValue(value.filter((id) => !filteredSet.has(id)));
  };

  const getLabel = (id: string) =>
    filtredData.find((o) => String(o._id) === id)?.title ?? id;

  console.log({ filtredData, isAllFilteredSelected, allFilteredIds, value });
  return (
    <Box sx={{ maxWidth: 520 }}>
      <FormControl fullWidth error={form_error}>
        <InputLabel id="skills-label">{isLoading ? "" : "Bords"}</InputLabel>

        <Select
          labelId="skills-label"
          multiple
          input={isLoading ? <Select /> : <OutlinedInput label="Skills" />}
          value={value}
          onClose={() => setTouched(true)}
          onChange={handleChangeEvent}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0 && isLoading)
              return <span style={{ opacity: 0.6 }}>Select skills…</span>;
            console.log({ selected });
            return (
              <Stack direction="row" gap={1} key={selected[0]} flexWrap="wrap">
                {selected.map((id) => (
                  <Chip
                    key={id}
                    size="small"
                    label={getLabel(id)}
                    onMouseDown={(e) => e.stopPropagation()} // prevent opening menu on chip click
                    onDelete={() =>
                      setValue((prev) => prev.filter((x) => x !== id))
                    }
                  />
                ))}
              </Stack>
            );
          }}
        >
          {/* input section */}
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
              className="outline-none"
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
                {error.message ||
                  "something went wrong in fetching bords try again"}
              </FormHelperText>
            </MenuItem>
          )}
          {!isLoading && (
            <MenuItem disableRipple sx={{ cursor: "default" }}>
              <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    isAllFilteredSelected
                      ? handleClearFiltered()
                      : handleSelectAllFiltered();
                  }}
                >
                  {isAllFilteredSelected
                    ? "Clear filtered"
                    : "Select all filtered"}
                </Button>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setValue([]);
                  }}
                >
                  Clear all
                </Button>
              </Stack>
            </MenuItem>
          )}
          {!isLoading &&
            Array.isArray(filtredData) &&
            filtredData.map((bord) => {
              const checked = value.includes(String(bord._id));
              return (
                <MenuItem
                  key={String(bord._id)}
                  disableRipple
                  value={String(bord._id)}
                >
                  <Checkbox checked={checked} />
                  <Typography variant="body1">{bord.title}</Typography>
                </MenuItem>
              );
            })}
        </Select>
        <FormHelperText>
          {form_error
            ? "At least one bord is required."
            : "Pick bord you wanna move this column to it."}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
