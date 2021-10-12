import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function TransactionTable(){
    const { transactions } = useTransactions();

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                    <td>{transaction.title}</td>
                    <td className={transaction.type}>
                        {transaction.type === 'withdraw' && '- '}
                        {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'EUR'
                        }).format(transaction.amount)}
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                        {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
    );
}