import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import './App.css';
import Form from './features/forms/Form';
import Navbar from './components/Navbar';
import { fetchFormsOnStart } from "./features/forms/formsSlice";


function App() {
  const formStatus = useSelector(state => state.forms.status);
  const dispatch = useDispatch();
  // console.log(formStatus);

  useEffect(() => {
    dispatch(fetchFormsOnStart());
  }, [])

  let contentToRender;
  if (formStatus === 'loading') {
    contentToRender = 'loading...';
  } else if (formStatus === 'succeeded') {
    contentToRender = <Form />;
  } else {
    contentToRender = 'idle';
  }

  return (
    <div className="App">
      <Navbar />
      {contentToRender}
    </div>
  );
}

export default App;
