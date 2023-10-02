// import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
// import Layout from './hocs/Layout';
import Login from './components/Login';
import Sidebar from './components/Sidebar/Sidebar';



// const App = () => {
//   const [isLoggedIn, setisLoggedIn] = useState(false);

//   return (
//     <Provider store={store}>
//       <Router>
//         { localStorage.setLogin === 'true' ? (<Sidebar/>) : (<div></div>)}
//         <Routes>
//           {/* <Route exact path='/' element={<Login setisLoggedIn={setisLoggedIn} />} />
//           <Route exact path='/dashboard' element={<Sidebar setisLoggedIn={setisLoggedIn} />} /> */}
//           if (localStorage.setLogin === undefined){
//              <Route  path='/' element={<Login />} />
//           }
         
//          else {
//           <Route  path='/dashboard' element={<Sidebar/>} />
//          }
          
//           {/* <Route exact path='/chartofaccounts' Component={ChartofAccounts} /> */}
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

const App = () => (

  <Provider store={store}>
    <Router>
      {localStorage.setLogin !== undefined ? <Sidebar /> : <div></div>}
      <Routes>
        {localStorage.setLogin === undefined ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/dashboard" element={<Sidebar />} />
          
          
        )}

      </Routes>
    </Router>
  </Provider>
);
export default App;


// const App = () => (
//   <Provider store={store}>
//     <Router>  
//         <Sidebar />
//           <Routes>
//             <Route exact path='/' Component={Login} />
//             <Route exact path='/dashboard' Component={Sidebar} />
//           </Routes>
//     </Router>
//   </Provider>
// );
 
// export default App;
