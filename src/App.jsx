import { useContext, useState } from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import SellProduct from './pages/SellProduct';
import ProductView from './pages/ProductView';
import AuthProvider,{AuthContext} from './context/AuthContext';


function App() {
  const [count, setCount] = useState(0)
  const user = useContext(AuthContext)
 console.log(user,"wait and see")

  return (
    <>
    < AuthProvider >
    <Router>
      <Routes>
        <Route  path="/" element={< Home />  } />   
        {
          user && user.name ?
          <Route path="/product-details" element={<ProductView />} />
          :
        <Route path="/product-details" element={< Navigate to='/' /> } />
        }
        {
          user && user?.name ?
          <Route  path="/sellProduct" element={< SellProduct />  } />   
          :
        <Route path="/sellProduct" element={< Navigate to='/' /> } />
        }
      </Routes>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App
