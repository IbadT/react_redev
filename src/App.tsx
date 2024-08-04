import { Flex } from 'antd';
import { RouterProvider } from "react-router-dom";
import { Loading } from './components/Loading/Loading';
import { router } from './router/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Flex vertical>
      <RouterProvider router={router} fallbackElement={<Loading />} />
      <ToastContainer style={{ fontSize: "1.9vmin"}}/>
    </Flex>
  );
};

export default App;