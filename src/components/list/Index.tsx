import React, { useEffect, useState, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import "./list.scss";

// Components
import ListItem from "../listItem";
import ItemModal from "../itemModal";

// Redux
import { getTodos, getTodoList } from "../../store/todos";

const List: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(getTodoList);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    setIsOpen(true);
  };

  const rowsToRender = data.map((item: any) => (
    <ListItem key={item.id} item={item} />
  ));

  if (data?.length === 0 || !data) {
    return (
      <>
        {isLoading ? (
          <div className="loader">
            <Loader type="Audio" />
          </div>
        ) : (
          <>
            <p className="p__empty__list">There's no todo's added yet.</p>
            <button onClick={() => handleAddTodo()}>Add one!</button>
            <ItemModal onClose={() => setIsOpen(false)} open={isOpen}>
              fancy modal
            </ItemModal>{" "}
          </>
        )}
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <Loader type="Audio" />
        </div>
      ) : (
        <>
          <ItemModal onClose={() => setIsOpen(false)} open={isOpen}>
            fancy modal
          </ItemModal>
          <div className="list">
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
              {" "}
              Add{" "}
            </button>
            <div className="d-flex justify-content-center mt-4">
              <span className="todo__span">TODO'S:</span>
            </div>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>{rowsToRender}</tbody>
            </table>
          </div>
        </>
      )}{" "}
    </>
  );
};

export default List;
