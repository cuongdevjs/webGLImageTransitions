import { RouterState } from 'connected-react-router';
// import { DashboardState } from 'app/containers/Dashboard/types';
import { AppState } from 'app/containers/App/types';
// import { LoginPageState } from 'app/containers/LoginPage/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  app?: AppState;
  router?: RouterState;
  // dashboard?: DashboardState;
  // loginPage?: LoginPageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
