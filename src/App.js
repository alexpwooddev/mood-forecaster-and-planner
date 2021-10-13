import { useSelector } from "react-redux";

import './App.css';
import { Form } from './features/forms/Form';
import { Navbar } from './components/Navbar';

function App() {
  const formStatus = useSelector(state => state.forms.status);

  let contentToRender;

  if (formStatus === 'loading') {
    contentToRender = '';
  } else if (formStatus === 'succeeded') {
    contentToRender = <Form />;
  }

  return (
    <div className="App">
      <Navbar />
      {contentToRender}
    </div>
  );
}

export default App;
