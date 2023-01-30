import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import KelasReducer from "./KelasReducer";
import SiswaReducer from "./SiswaReducer";
import jenisTagihanReducer from "./JenisTagihanReducer";
import WaktuReducer from "./WaktuReducer";
import TagihanReducer from "./TagihanReducer";

const rootReducer = combineReducers({
  AuthReducer,
  KelasReducer,
  SiswaReducer,
  jenisTagihanReducer,
  WaktuReducer,
  TagihanReducer,
});

export default rootReducer;
