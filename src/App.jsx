import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

import './App.css';
import Form from './features/forms/Form';
import Navbar from './components/Navbar';
import store from './app/store';
import { fetchFormsOnStart } from "./features/forms/formsSlice";


function App() {
  const formStatus = useSelector(state => state.forms.status);

  useEffect(() => {
    store.dispatch(fetchFormsOnStart());
  }, [])

  let contentToRender = 'loading...';
  if (formStatus === 'loading') {
    contentToRender = 'loading...';
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
