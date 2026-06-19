import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { Container, Typography } from "@mui/material";

const INITIAL_ITEM_COUNT = 10000;

const generateMessages = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: nanoid(),
    text: faker.lorem.sentences(Math.floor(Math.random() * 5) + 1),
    sender: faker.person.firstName(),
    time: new Date().toLocaleTimeString(),
  }));
};

function useUser() {
  return "user_123";
}

type TMessage = ReturnType<typeof generateMessages>[number];
type TNormalizedState = Record<string, TMessage>;

function normalizedState(state: TMessage[]) {
  return state.reduce((acc, cur) => {
    acc[cur.id] = cur;

    return acc;
  }, {} as TNormalizedState);
}

export const ProfessionalChat = () => {
  const [messages, setMessages] = useState<TNormalizedState>(
    normalizedState(generateMessages(15)),
  );
  const userId = "8xP7EZ8jCwCvCsxz3I_o9";
  const [loading, setLoading] = useState(false);
  const messageList = useMemo(() => Object.values(messages), [messages]);
  const firstItemIndex = useMemo(() => {
    return INITIAL_ITEM_COUNT - messageList.length;
  }, [messageList.length]);
  console.log({ messages });
  const prependMessages = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newBatch = normalizedState(generateMessages(5));
      setMessages((prev) => ({ ...newBatch, ...prev }));
      setLoading(false);
    }, 1000);
  }, [loading, messages]);

  return (
    <Container className="flex flex-col h-[80dvh]">
      <Typography
        variant="h1"
        sx={{ padding: "20px", background: "#0088cc", color: "#fff" }}
      >
        Telegram Web Pro (Virtualization Demo)
      </Typography>

      <Virtuoso
        style={{ flexGrow: 1 }}
        data={messageList}
        itemContent={(index, msg) => (
          <div
            style={{
              padding: "12px",
              margin: "8px",
              background: msg.id === userId ? "#e1ffc7" : "#fff",
              borderRadius: "8px",
              alignSelf: msg.id === userId ? "flex-end" : "flex-start",
              maxWidth: "70%",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ display: "block", fontSize: "0.8rem", color: "#888" }}
            >
              {msg.sender} (ID: {msg.id})
            </Typography>
            <Typography variant="body2" sx={{ margin: "5px 0" }}>
              {msg.text}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "0.7rem", float: "right" }}
            >
              {msg.time}
            </Typography>
          </div>
        )}
        // ۴. شروع از آخرین پیام
        firstItemIndex={firstItemIndex}
        // برای شروع از انتها در حالت داینامیک:
        initialTopMostItemIndex={messageList.length - 1} // ۵. اسکرول معکوس: وقتی به سقف رسید، دیتای قدیمی لود کن
        startReached={prependMessages}
        components={{
          Header: () =>
            loading ? (
              <Typography
                variant="caption"
                style={{ textAlign: "center", padding: "10px" }}
              >
                Loading older messages...
              </Typography>
            ) : null,
        }}
      />
    </Container>
  );
};
