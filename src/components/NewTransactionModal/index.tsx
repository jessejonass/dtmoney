import { FormEvent, useState, useContext } from 'react';

import Modal from 'react-modal';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImage from '../../assets/close.svg';
import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import { TransactionsContext } from '../../TransactionContext';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    // const data = {title, amount, category, type};

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle('');
    setAmount(0);
    setCategory('deposit');
    setType('');

    onRequestClose();
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImage} alt="Fechar modal"/>
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={e => setAmount(+e.target.value)}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImage} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImage} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        
        <input
          placeholder="Categoria"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        
        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
};
