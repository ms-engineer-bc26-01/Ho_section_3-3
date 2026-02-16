"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Separator,
  Badge,
  Stack,
} from "@chakra-ui/react";

import type { Transaction } from "./data/transactions";
import { TransactionList } from "./components/TransactionList";
import { MonthlySummary } from "./components/MonthlySummary";
import { TransactionForm } from "./components/TransactionForm";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selected, setSelected] = useState<Transaction | null>(null);

  // 初期データ取得
  useEffect(() => {
    fetch("http://localhost:3001/transactions")
      .then((res) => res.json())
      .then(setTransactions)
      .catch(console.error);
  }, []);

  // 新規追加
  const handleCreate = async (newData: Omit<Transaction, "id">) => {
    const res = await fetch("http://localhost:3001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    const created = await res.json();
    setTransactions((prev) => [...prev, created]);
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-b, gray.50, gray.200)"
      justify="center"
      align="start"
      py="10"
      fontFamily="'Kosugi Maru', sans-serif"
    >
      <Box maxW="1100px" w="100%" px="4">
        <Heading fontSize={{ base: "3xl", md: "5xl" }} color="orange.400" mb="10" textAlign="center">
          家計簿アプリ
        </Heading>

        <MonthlySummary transactions={transactions} />

        <Stack direction={{ base: "column", md: "row" }} gap="8" align="flex-start" mt="8">
          {/* 一覧 */}
          <Box flex="1" bg="white" p="6" rounded="xl" shadow="lg">
            <Heading fontSize="2xl" mb="4">取引一覧</Heading>
            <Separator mb="4" />
            <TransactionList
              transactions={transactions}
              onSelect={setSelected}
            />
          </Box>

          {/* 詳細 + フォーム */}
          <Box flex="1" bg="white" p="6" rounded="xl" shadow="lg">
            <Heading fontSize="2xl" mb="4">詳細</Heading>
            <Separator mb="4" />

            {selected ? (
              <VStack align="start" gap="4" mb="8">
                <Text><Text as="span" fontWeight="bold">日付:</Text> {selected.date}</Text>
                <Text><Text as="span" fontWeight="bold">内容:</Text> {selected.title}</Text>
                <Badge
                  colorPalette={selected.type === "収入" ? "green" : "red"}
                  fontSize="1.1em"
                >
                  {selected.amount.toLocaleString()} 円
                </Badge>
                <Text>種別: {selected.type}</Text>
              </VStack>
            ) : (
              <Text color="gray.500" mb="8">項目を選択してください</Text>
            )}

            <TransactionForm onCreate={handleCreate} />
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default App;