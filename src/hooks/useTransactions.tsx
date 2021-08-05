import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  createdAt: string;
  type: string;
}

// Omit - tudo de Transaction exceto id e createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// Pick - tudo que eu selecionar
// type TransactionInputTwo = Pick<Transaction, 'title' | 'category' | '...'>;

// se esse contexto está englobando o App ou outros componentes,
// precisa receber um children para renderizar
interface TransactionsProviderProps {
  children: ReactNode;
}

// tipo dos retornos - usado em TransactionsContext.Provider value={}
interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children } :TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions));
  }, []);

  // precisa de uma transação - não pode ser do tipo Transaction pq tem o ID
  // usar o tipo TransactionInput que usa o Omit
  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

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
