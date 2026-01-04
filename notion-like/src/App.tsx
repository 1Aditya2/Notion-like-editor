import './App.css';
import TopBar from './components/TopBar/TopBar';
import Editor from './pages/Editor';

function App() {
  return (
    <div className="w-full min-h-screen flex items-center flex-col gap-12">
      <TopBar/>
      <Editor/>
    </div>
  );
}

export default App;
