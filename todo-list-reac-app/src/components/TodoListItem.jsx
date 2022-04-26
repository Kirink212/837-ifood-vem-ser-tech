import { useEffect, useState } from "react";

export default function TodoListItem({ id, text, checked }) {
  const [checkedState, setCheckedState] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(id));
    return saved === null ? checked : saved;
  });

  useEffect(
    () => localStorage.setItem(id, JSON.stringify(checkedState)), [id, checkedState]
  );

  return (
    <div>
      <input id={`check-${id}`} type="checkbox" onChange={({ target }) => setCheckedState(target.checked)} checked={checkedState} />
      <label htmlFor={`check-${id}`}>{text}</label>
    </div>
  );
}