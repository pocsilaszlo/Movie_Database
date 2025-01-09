import { Provider } from 'react-redux';
import { store } from './store/store';
import { Router } from './Router';

const App = () => {
  console.log(import.meta.env.BACKEND_URL);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;