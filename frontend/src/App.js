import Home from "./components/Home";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from "./components/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: < Login />,
  }, {
    path: "/home",
    element: <Home />
  }
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
