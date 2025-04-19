import { useState } from 'react';
import { zariya_final_backend } from 'declarations/zariya_final_backend';
import Auth from './components/Auth';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    zariya_final_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <Auth/>
  );
}

export default App;
