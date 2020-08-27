import { RouterState } from 'connected-react-router';
import { LoginPageState } from 'app/containers/LoginPage/types';
import { AppState } from 'app/containers/App/types';
import { DashboardState } from 'app/containers/Dashboard/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  app?: AppState;
  router?: RouterState;
  loginPage?: LoginPageState;
  dashboard?: DashboardState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
