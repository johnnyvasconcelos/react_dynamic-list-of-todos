/* eslint-disable max-len */
import React from 'react';
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);

      return;
    }

    setUser(null);
    setUserLoading(true);

    getUser(selectedTodo.userId)
      .then(dataUser => setUser(dataUser))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setUserLoading(false);
      });
  }, [selectedTodo]);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('All');

  const filtredTodos = todos.filter(t => {
    if (selectValue === 'all') {
      return t.title.toLowerCase().includes(inputValue.toLowerCase().trim());
    }

    if (selectValue === 'active') {
      return (
        t.title.toLowerCase().includes(inputValue.toLowerCase().trim()) &&
        !t.completed
      );
    }

    if (selectValue === 'completed') {
      return (
        t.title.toLowerCase().includes(inputValue.toLowerCase().trim()) &&
        t.completed
      );
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList onSelectTodo={setSelectedTodo} todos={filtredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal
        onClose={handleCloseModal}
        user={user}
        todo={selectedTodo}
        loading={userLoading}
      />
    </>
  );
};
