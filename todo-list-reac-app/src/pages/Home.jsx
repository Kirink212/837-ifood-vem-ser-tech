import { useEffect, useState } from 'react';
import TodoListItem from '../components/TodoListItem';
import './Home.css';

export function Home() {
  const [itemsArray, setItemsArray] = useState(() => {
    const inicialValue = [
      { text: "Acordar 7 horas da manhã", checked: false },
      { text: "Lavar toda a louça suja que está dentro ou fora da pia", checked: false },
      { text: "Levar os cachorros para passear por 30 min", checked: false },
      { text: "Lavar o carro todo", checked: true },
    ];

    const saved = JSON.parse(localStorage.getItem('itemsArray'));

    if (saved === null) return inicialValue;
    return saved.length >= inicialValue.length ? saved : inicialValue;
  });
  const [task, setTask] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
    setDisabled(task.length < 5);
  }, [itemsArray, task]);

  return (
    <>
      <div className="input-home">
        <label htmlFor='input-task'>
          Adicionar tarefa:
          <input type="text" id="input-task" onChange={({ target }) => setTask(target.value)} />
        </label>
        <button
          onClick={ () => setItemsArray([...itemsArray, { text: task, checked: false }]) }
          disabled={ disabled }
        >
          Enviar
        </button>
      </div>
      <div className="container">
        <div>
          {itemsArray.map(({ text, checked }, id) => {
            return (
              <TodoListItem
                id={id}
                text={text}
                key={id}
                checked={checked}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}