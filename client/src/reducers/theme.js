// const initialState = {
//     theme: JSON.parse(localStorage.getItem('theme')) || true,
// };

// const themeReducer = ( state = initialState, action) => {
//     switch (action.type) {
//         case "SET_THEME":
//             localStorage.setItem("theme", JSON.stringify(action.payload))
//             return { ...state, theme: action.payload};
//         default:
//             return state;
//     }
// }

// export default themeReducer;