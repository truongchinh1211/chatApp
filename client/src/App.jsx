import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
    <Router>
    <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            theme="dark"
          />
      <AppRoutes />
    </Router>
    </>
  )
}

export default App
