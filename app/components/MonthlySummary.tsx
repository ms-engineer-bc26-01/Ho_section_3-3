import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import type { Transaction } from "../data/transactions";

type Props = {
  transactions: Transaction[];
};

export function MonthlySummary({ transactions }: Props) {
  const monthly = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7);

    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }

    if (tx.type === "収入") {
      acc[month].income += tx.amount;
    } else {
      acc[month].expense += tx.amount;
    }

    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  return (
    <Box bg="white" p="6" rounded="xl" shadow="lg">
      <Heading fontSize="2xl" mb="4">
        月別サマリー
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
        {Object.entries(monthly).map(([month, data]) => (
          <Box
            key={month}
            p="4"
            bg="gray.50"
            rounded="md"
          >
            <Text fontWeight="bold">{month}</Text>
            <Text color="green.500">
              収入: {data.income.toLocaleString()} 円
            </Text>
            <Text color="red.500">
              支出: {data.expense.toLocaleString()} 円
            </Text>
            <Text fontWeight="bold">
              差額:{" "}
              {(data.income - data.expense).toLocaleString()} 円
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
