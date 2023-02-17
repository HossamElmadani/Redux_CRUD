// initial state object
const initialState = {
    users: [
    { id: 1, name: "Hossam", email: "hossam@gmail.com" },
    { id: 2, name: "Muhssine", email: "muhssinelkelb@gmail.com" },
    { id: 3, name: "Alami", email: "alami@gmail.com" },
    { id: 4, name: "John", email: "john@gmail.com" },
    { id: 5, name: "Jane", email: "jane@gmail.com" },
    { id: 6, name: "Alex", email: "alex@gmail.com" },
    { id: 7, name: "Sara", email: "sara@gmail.com" },],
    searchQuery: "",
  };

  function Reducer_user(state = initialState, action) {
    switch (action.type) {
      case "ADD_USER":
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case "DELETE_USER":
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.payload),
        };
      case "UPDATE_USER":
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        };
      case "SET_SEARCH_QUERY":
        return {
          ...state,
          searchQuery: action.payload,
        };
      default:
        return state;
    }
  }
  

  export default Reducer_user
  