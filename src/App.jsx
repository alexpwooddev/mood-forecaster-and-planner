import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import Form from './features/forms/Form';
import Navbar from './components/Navbar';
import { fetchFormsOnStart } from './features/forms/formsSlice';

function App() {
  const formStatus = useSelector((state) => state.forms.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFormsOnStart());
  }, []);

  let contentToRender;
  if (formStatus === "loading") {
    contentToRender = "loading...";
  } else if (formStatus === "succeeded") {
    contentToRender = <Form />;
  } else {
    contentToRender = "idle";
  }

  return (
    <AppContainer>
      <Navbar />
      {contentToRender}
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
  background-color: var(--blue-steel);
  color: var(--white);
  width: 90%;
  margin: auto;
  margin-top: var(--margin-s);
  margin-bottom: var(--margin-s);
  border-radius: 10px;
  padding: var(--padding-s);
  padding-top: var(--padding-m);
  padding-bottom: var(--padding-m);
  box-shadow: 0px 2px 4px grey;

  @media (min-width: 768px) {
    width: 85%;
    padding: var(--padding-m);
  }
`;
