import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { removeTodo, Todo } from "../../store/todos";

interface ListItemProps {
  item: Todo;
}

const ListItem: FC<ListItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const handleTodoDelete = (id: string) => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      <tr key={item.id} className={item.checked ? "checked" : ""}>
        <td>
          <p className="name">{item.name}</p>
        </td>
        <td className="icon" onClick={() => handleTodoDelete(item.id!)}>
          <i className="fa fa-trash"></i>
        </td>
      </tr>
    </>
  );
};

export default ListItem;
