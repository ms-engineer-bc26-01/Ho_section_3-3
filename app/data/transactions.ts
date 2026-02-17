export type Transaction = {
  id: number;
  date: string;
  title: string;
  amount: number;
  type: '収入' | '支出';
};

export const transactions: Transaction[] = [
  { id: 1, date: '2025-02-01', title: '給料', amount: 300000, type: '収入' },
  { id: 2, date: '2025-02-02', title: 'スーパー', amount: -4500, type: '支出' },
  { id: 3, date: '2025-01-28', title: '家賃', amount: -80000, type: '支出' },
];