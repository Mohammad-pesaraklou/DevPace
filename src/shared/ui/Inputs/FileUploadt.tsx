// components/FileUpload.tsx
"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  LinearProgress,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

export default function FileUpload({
  onFileSelect,
  onFileRemove,
  accept = { "image/*": [], ".txt": [] },
  maxSize = 5 * 1024 * 1024,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        console.log({ acceptedFiles });
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        onFileSelect(selectedFile);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      multiple: false,
    });

  const handleRemove = () => {
    setFile(null);
    onFileRemove();
  };
  console.log({ performance });
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {!file ? (
        <Paper
          {...getRootProps()}
          variant="outlined"
          sx={{
            py: 4,
            px: 2,
            textAlign: "center",
            cursor: "pointer",
            bgcolor: isDragActive ? "action.hover" : "background.paper",
            borderStyle: "dashed",
            borderColor: isDragActive ? "primary.main" : "divider",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "action.hover",
            },
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon
            sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
          />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? "فایل را اینجا رها کنید" : "انتخاب یا کشیدن فایل"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            حداکثر حجم فایل: {maxSize / (1024 * 1024)}MB
          </Typography>

          {/* نمایش خطاهای احتمالی (مثل حجم زیاد یا فرمت نامعتبر) */}
          {fileRejections.length > 0 && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 1, display: "block" }}
            >
              فایل انتخاب شده معتبر نیست.
            </Typography>
          )}
        </Paper>
      ) : (
        <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <InsertDriveFileIcon color="primary" />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="body2" noWrap>
                {file.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {(file.size / 1024).toFixed(1)} KB
              </Typography>
            </Box>
            <IconButton onClick={handleRemove} color="error" size="small">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
