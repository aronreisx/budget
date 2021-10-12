import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface GetResponseTransactions {
    transactions: [Transaction];
}

//* Solve TrasactionInput Any before production
// interface PostResponseTransaction {
//     data: {
//         transaction: Omit<Transaction, 'createdAt'>;
//     }
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>(
        {} as TransactionsContextData
    );

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get<GetResponseTransactions>('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    //* Solve TrasactionInput Any before production
    async function createTransaction(transactionInput: TransactionInput | any){
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });
        const {transaction} = response.data;
        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext);
    return context;
}