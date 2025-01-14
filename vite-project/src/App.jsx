import { RouterProvider } from "react-router-dom";
import { router } from "./router/index"; // Vérifiez que le chemin est correct

function App() {
  return <RouterProvider router={router} />;
}

export default App;
