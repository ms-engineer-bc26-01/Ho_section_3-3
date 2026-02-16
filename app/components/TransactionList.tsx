import { Table, Text } from "@chakra-ui/react";
import type { Transaction } from "../data/transactions";

type Props = {
  transactions: Transaction[];
  onSelect: (transaction: Transaction) => void;
};

export function TransactionList({ transactions, onSelect }: Props) {
  if (transactions.length === 0) {
    return <Text color="gray.500" fontSize="sm" p="4">取引データがありません。</Text>;
  }

  return (
    <Table.Root size="sm" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>日付</Table.ColumnHeader>
          <Table.ColumnHeader>内容</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">金額</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {transactions.map((t) => (
          <Table.Row
            key={t.id}
            onClick={() => onSelect(t)}
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
          >
            <Table.Cell fontSize="sm">{t.date}</Table.Cell>
            <Table.Cell fontWeight="medium">{t.title}</Table.Cell>
            <Table.Cell textAlign="end" color={t.type === "支出" ? "red.500" : "green.500"}>
              {t.amount.toLocaleString()}円
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
