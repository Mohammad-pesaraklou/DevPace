"use client";

// import FileUpload from "@/shared/ui/Inputs/FileUploadt";
// import { ImportContacts } from "@mui/icons-material";
// import {
//   Container,
//   Divider,
//   Grid2,
//   Paper,
//   Stack,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
// } from "@mui/material";
// import { useEffect } from "react";

// function TestPage() {
//   const triggerLongTask = () => {
//     console.log("Start heavy task...");

//     const start = performance.now();
//     while (performance.now() - start < 800) {
//       // این بخش ترد اصلی را مسدود می‌کند
//       // هیچ کاری انجام نمی‌شود ولی پردازنده درگیر است
//     }

//     console.log("Task finished!");
//   };

//   useEffect(() => {
//     const observer = new PerformanceObserver((list) => {
//       list.getEntries().forEach((entry) => {
//         console.log("🚨 Long Task Detected:", {
//           duration: entry.duration,
//           startTime: entry.startTime,
//         });
//       });
//     });

//     observer.observe({ entryTypes: ["longtask"] });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <Container sx={{ p: "20px 10px" }} className="h-[calc(100%-_74px)]">
//       <button onClick={triggerLongTask} className="p-4 bg-blue-500 text-white">
//         Trigger Long Task
//       </button>
//       <Stack
//         divider={
//           <Divider
//             sx={{ background: "primary.main" }}
//             orientation="horizontal"
//             flexItem
//           />
//         }
//         spacing={8}
//         direction={"column"}
//       >
//         <Stack spacing={2} direction={"row"}>
//           <ImportContacts />
//           <Typography variant="h3">Hello world</Typography>
//         </Stack>
//         <ToggleButtonGroup exclusive fullWidth>
//           <ToggleButton value="pending">Pending</ToggleButton>
//           <ToggleButton value="done">Done</ToggleButton>
//           <ToggleButton value="block">Blocked</ToggleButton>
//         </ToggleButtonGroup>
//         <FileUpload
//           onFileRemove={() => {}}
//           onFileSelect={(f) => console.log(f)}
//         />
//         <Grid2 container spacing={2}>
//           <Grid2 size={{ xs: 12, md: 4 }}>
//             <Paper sx={{ minHeight: "120px" }}>Hi</Paper>
//           </Grid2>
//           <Grid2 size={{ xs: 12, md: 4 }}>
//             <Paper sx={{ minHeight: "120px" }}>Hi</Paper>
//           </Grid2>
//           <Grid2 size={{ xs: 12, md: 4 }}>
//             <Paper sx={{ minHeight: "120px" }}>Hi</Paper>
//           </Grid2>
//           <Grid2 direction={"row"} size={{ xs: 12, md: 4 }} container>
//             <Grid2 size={{ xs: 12, md: 3 }}>
//               <Paper sx={{ minHeight: "120px" }}>Hi</Paper>
//             </Grid2>
//             <Grid2 size={{ xs: 12, md: 3 }}>
//               <Paper sx={{ minHeight: "120px" }}>Hi</Paper>
//             </Grid2>{" "}
//             <Grid2 size={{ xs: 12, md: 3 }}>
//               <Paper sx={{ minHeight: "120px" }}>Hi</Paper>
//             </Grid2>{" "}
//             <Grid2 size={{ xs: 12, md: 3 }}>
//               <Paper sx={{ minHeight: "120px" }}>Hi</Paper>
//             </Grid2>
//           </Grid2>
//         </Grid2>
//       </Stack>
//     </Container>
//   );
// }

// export default TestPage;

// ****************************************************************************************************
// "use client";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import UserCreateForm from "@/features/user/components/UserCreateForm";
// import { Control, useForm, useWatch } from "react-hook-form";
// import { Button, Divider } from "@mui/material";
// import TextFieldInp from "@/shared/ui/Inputs/TextFieldInp";
// import RHFAutocomplete from "@/shared/ui/components/RHFAutocomplete";

// function TestPage() {
//   const { register, control, handleSubmit } = useForm<FormValues>();
//   const onSubmit = handleSubmit((data) => console.log(data));
//   console.log("im re render X");
//   const MyFormValues = {
//     email: "",
//     password: "",
//     user: { firstName: "" },
//   };
//   return (
//     <Container maxWidth="sm">
//       <Stack spacing={3}>
//         <Typography variant="h4">Create User</Typography>
//         <UserCreateForm />
//         <Divider variant="fullWidth" />
//         <form onSubmit={onSubmit}>
//           <IsolateReRender control={control} />
//           <TextFieldInp
//             name="lastName"
//             type="text"
//             register={register}
//             placeholder="last name"
//           />
//           <Button type="submit">submit</Button>
//         </form>
//       </Stack>
//     </Container>
//   );
// }

// export default TestPage;
// type FormValues = {
//   firstName: string;
//   lastName: string;
// };

// function IsolateReRender({ control }: { control: Control<FormValues> }) {
//   const firstName = useWatch({
//     control,
//     name: "firstName",
//     defaultValue: "mohmmad",
//   });
//   console.log("im re render IsolateReRender");
//   return <div>{firstName}</div>;
// }

// ****************************************************************************************************
//!×××××××××××××××××××××××××××××× interview

const tasks = [
  { id: 1, title: "Fix bug", priority: "high", archived: false },
  { id: 2, title: "Add feature", priority: "low", archived: false },
  { id: 1, title: "Fix bug", priority: "high", archived: false }, // Duplicate
  { id: 3, title: "Update docs", priority: "high", archived: true }, // Archived
  { id: 4, title: "Code review", priority: "low", archived: true },
];

// ! remove duplicate tasks by id
// ! filter out archived tasks
// ! group tasks by priority
// ! return an normalized object with priority as keys and arrays of tasks as values

// import React from "react";

// function Test() {
//   type Priority = "low" | "high";
//   type ITasks = (typeof tasks)[number];
//   type MyReturnType = Record<Priority, ITasks[]>;

//   function processTasks(tasks: ITasks[]): MyReturnType | [] {
//     const uniqueArray = [
//       ...new Map(tasks.map((tsk) => [tsk.id, tsk])).values(),
//     ];
//     const archivedTask = uniqueArray.filter((item) => !item.archived);
//     const normalizedState = uniqueArray.reduce((acc, cur) => {
//       if (cur.archived) return acc;
//       acc[cur.priority] = archivedTask.filter(
//         (item) => item.priority === cur.priority,
//       );
//       return acc;
//     }, {} as MyReturnType);

//     return normalizedState;
//   }

//   const filteredTasks = processTasks(tasks);
//   console.log({ filteredTasks });
//   // خروجی مورد انتظار:
//   // {
//   //   high: [ { id: 1, ... } ],
//   //   low: [ { id: 2, ... }, { id: 4, ... } ]
//   // }

//   return <div>Test</div>;
// }

// export default Test;

// ***********************************************************************************************

// import React from "react";
// import { url } from "zod";

// function Test() {
//   async function fetcher(url: string, init: RequestInit) {
//     const req = await fetch(url, { ...init });
//     console.log("object", req);
//     if (req.ok) throw new Error("Request failed");
//     return req.json();
//   }

//   let My_urls = [
//     "https://jsonplaceholder.typicode.com/posts/1",
//     "https://jsonplaceholder.typicode.com/posts/2",
//     "https://jsonplaceholder.typicode.com/posts/3",
//     "https://jsonplaceholder.typicode.com/posts/4",
//     "https://jsonplaceholder.typicode.com/posts/5",
//     "https://jsonplaceholder.typicode.com/posts/6",
//     "https://jsonplaceholder.typicode.com/posts/7",
//     "https://jsonplaceholder.typicode.com/posts/8",
//     "https://jsonplaceholder.typicode.com/posts/9",
//     "https://jsonplaceholder.typicode.com/posts/10",
//   ];
//   async function limitConcurrentRequests(urls: string[], limit = 3) {
//     const results = new Array(urls.length); // Pre-allocate to keep order
//     let index = 0;

//     async function worker() {
//       while (index < urls.length) {
//         const currentIndex = index++; // Lock the index for this task
//         try {
//           const response = await fetcher(urls[currentIndex], { method: "GET" });
//           results[currentIndex] = response;
//         } catch (error) {
//           console.log({ error });
//           results[currentIndex] = { error: error.message };
//         }
//       }
//     }

//     // Start initial workers based on limit
//     const workers = Array.from(
//       { length: Math.min(limit, urls.length) },
//       worker,
//     );
//     await Promise.all(workers);

//     return results;
//   }
//   limitConcurrentRequests(My_urls).then((res) => console.log(res));

//   return <div>Test</div>;
// }

// export default Test;

import React from "react";
import MainComp from "./components/design-patterns";
import { Container } from "@mui/material";
import MainIndex from "./components/general";
import { ProfessionalChat } from "./components/virtualization/Index";

function TestPage() {
  return (
    <Container sx={{ pt: "50px" }} className="flex flex-col gap-8">
      <MainComp />
      <ProfessionalChat />
      {/* <MainIndex /> */}
    </Container>
  );
}

export default TestPage;
