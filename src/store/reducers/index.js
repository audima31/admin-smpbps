import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import KelasReducer from "./KelasReducer";
import SiswaReducer from "./SiswaReducer";
import jenisTagihanReducer from "./JenisTagihanReducer";
import TagihanReducer from "./TagihanReducer";
import PaymentReducer from "./PaymentReducer";
import ProfileReducer from "./ProfileReducer";

const rootReducer = combineReducers({
  AuthReducer,
  KelasReducer,
  SiswaReducer,
  jenisTagihanReducer,
  PaymentReducer,
  TagihanReducer,
  ProfileReducer,
});

export default rootReducer;
