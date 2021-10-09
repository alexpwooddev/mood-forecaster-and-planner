import { useSelector } from "react-redux";

import './App.css';
import { Form } from './features/forms/Form';
import { Navbar } from './components/Navbar';

// On initial load: always show current date
// Current date COULD have no form values OR have values already
// on initial load of any Form, we read from storage for selectedDate (whose initial state is always today)
    //if exists, we render that, i.e. useSelector and get the form object
    //if not, we render blank
// whenever we navigate to a form, it needs to know its date (from: chevrons/today/picker), i.e. we need selectedDate
// Navigating between forms = between dates (which are basically unique keys)
// 

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
