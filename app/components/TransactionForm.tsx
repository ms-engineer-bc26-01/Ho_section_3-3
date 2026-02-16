import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Select,
  createListCollection,
  Field, // ラベル管理用に追加
} from "@chakra-ui/react";
import type { Transaction } from "../data/transactions";

type Props = {
  onCreate: (data: Omit<Transaction, "id">) => void;
};

export function TransactionForm({ onCreate }: Props) {
  // フォームの状態管理
  const [form, setForm] = useState({
    date: "",
    title: "",
    amount: 0,
    type: "支出" as "収入" | "支出",
  });

  const typeCollection = createListCollection({
    items: [
      { label: "収入", value: "収入" },
      { label: "支出", value: "支出" },
    ],
  });

  // 送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(form);
    
    // フォームのリセット
    setForm({
      date: "",
      title: "",
      amount: 0,
      type: "支出",
    });
  };

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit} 
      p="4" 
      borderWidth="1px" 
      borderRadius="lg"
      shadow="sm"
    >
      <Stack gap="4">
        {/* 日付入力 */}
        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="bold">日付</Field.Label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </Field.Root>

        {/* 内容入力 */}
        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="bold">内容</Field.Label>
          <Input
            placeholder="例：ランチ"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </Field.Root>

        {/* 金額入力 */}
        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="bold">金額</Field.Label>
          <Input
            type="number"
            placeholder="0"
            value={form.amount || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, amount: Number(e.target.value) }))
            }
          />
        </Field.Root>

        {/* カテゴリー*/}
        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="bold">タイプ</Field.Label>
          <Select.Root
            collection={typeCollection}
            value={[form.type]}
            onValueChange={(details) =>
              setForm((prev) => ({
                ...prev,
                type: details.value[0] as "収入" | "支出",
              }))
            }
          >
            <Select.Trigger>
              <Select.ValueText placeholder="タイプを選択" />
            </Select.Trigger>
            
            <Select.Content>
              {typeCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Field.Root>

        <Button colorPalette="orange" type="submit" width="full" mt="2">
          登録する
        </Button>
      </Stack>
    </Box>
  );
}