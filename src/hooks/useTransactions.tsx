import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  type: string,
  category: string,
  amount: number,
  createdAt: string,
}

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// provider pode receber um children
interface TransactionsProviderProps {
  children: ReactNode;
}

// como será retornado o contexto
interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

// tipo de dados | criação do contexto
const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

// ações
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  };

  // retorno | children
  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}