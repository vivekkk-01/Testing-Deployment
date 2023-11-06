import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login, { loader as loginLoader } from "./pages/Login";
import Register, { loader as registerLoader } from "./pages/Register";
import Home, { loader as homeLoader } from "./pages/Home";
import ApplyDoctor, { loader as applyDoctorLoader } from "./pages/ApplyDoctor";
import Notifications, {
  loader as notificationsLoader,
} from "./pages/Notifications";
import Doctors, { loader as doctorsLoader } from "./pages/admin/Doctors";
import Users, { loader as usersLoader } from "./pages/admin/Users";
import Profile, { loader as profileLoader } from "./pages/Profile";
import Booking, { loader as bookingLoader } from "./pages/Booking";
import Appointments, {
  loader as appointmentsLoader,
} from "./pages/Appointments";
import DoctorAppointments, {
  loader as doctorAppointmentsLoader,
} from "./pages/doctor/DoctorAppointments";

const router = createBrowserRouter([
  { path: "/", element: <Home />, loader: homeLoader },
  { path: "/login", element: <Login />, loader: registerLoader },
  { path: "/register", element: <Register />, loader: loginLoader },
  {
    path: "/apply-doctor",
    element: <ApplyDoctor />,
    loader: applyDoctorLoader,
  },
  {
    path: "/notifications",
    element: <Notifications />,
    loader: notificationsLoader,
  },

  { path: "/admin/doctors", element: <Doctors />, loader: doctorsLoader },
  { path: "/admin/users", element: <Users />, loader: usersLoader },
  {
    path: "/doctor/profile/:doctorId",
    element: <Profile />,
    loader: profileLoader,
  },
  {
    path: "/book-appointment/:doctorId",
    element: <Booking />,
    loader: bookingLoader,
  },
  {
    path: "/appointments",
    element: <Appointments />,
    loader: appointmentsLoader,
  },
  {
    path: "/doctor-appointments",
    element: <DoctorAppointments />,
    loader: doctorAppointmentsLoader,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
