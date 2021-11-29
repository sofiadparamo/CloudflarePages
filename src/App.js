import { Router } from "@reach/router";

import Posts from './components/posts'

function App() {
  return (
    <Router>
      <Posts path="/" />
    </Router>
  );
}

export default App;
