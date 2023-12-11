import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { CitiesProvider } from "./contexts/CitiesContext";
import City from "./components/City";
import Form from "./components/Form";
import { FakeAuthProvider } from "./contexts/FakeAuthContext";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }
            >
              <Route index element={<Navigate to="cities" />} replace />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </FakeAuthProvider>
  );
}

export default App;
