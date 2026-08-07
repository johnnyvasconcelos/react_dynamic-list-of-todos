interface Props {
  inputValue: string;
  setInputValue: (value: string) => void;
  selectValue: string;
  setSelectValue: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  setInputValue,
  selectValue,
  setSelectValue,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              setSelectValue(event.target.value);
            }}
            value={selectValue}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => {
            setInputValue(event.target.value);
          }}
          value={inputValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue.length > 0 && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setInputValue('')}
              />
            </span>
          )}
        </span>
      </p>
    </form>
  );
};
