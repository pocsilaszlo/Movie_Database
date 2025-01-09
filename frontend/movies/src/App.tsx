import { Provider } from 'react-redux';
import { store } from './store/store';
import { Router } from './Router';

const App = () => {
  console.log(process.env.REACT_APP_API_URL);
  
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;