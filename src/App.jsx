import LoadingScreen from './components/LoadingScreen';

import Home from './pages/Home';

function App() {
  return (
    <LoadingScreen logoStr={"FREAKSITE"} children={<Home/>}/>
  );
}

export default App;