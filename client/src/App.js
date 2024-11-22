import { Outlet } from 'react-router-dom';
import './App.css';
// import { toast } from 'react-hot-toast'

function App() {
  return (
    <>
      <main className="">
        <Outlet/>
      </main>
    </>
  );
}

export default App;
