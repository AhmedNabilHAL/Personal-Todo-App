import Navbar from './components/navbar';
import Footer from './components/footer';
import TodoLists from './components/todo_lists';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from './components/auth';
import { Fragment, useState } from 'react';
import { UserProvider } from './components/user_context';

function App() {

  const [user, setUser] = useState(null);

  return (
    <UserProvider user={user}>
      <BrowserRouter>
        <div className='w-full min-h-screen flex flex-col text-slate-300 overflow-hidden'>
          <Navbar />
          <main className='w-5/6 md:w-2/3 lg:w-3/5 mx-auto py-5 flex-1 text-center'>
            <Routes>
              <Route path='/' element={ 
                <Fragment>
                  <h2 className='text-6xl mb-5'>Todos</h2>
                  <TodoLists /> 
                </Fragment>
              } />
              <Route path="/auth" element={<Auth setUser={setUser} />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </BrowserRouter>
    </UserProvider>
    
  );
}

export default App;
