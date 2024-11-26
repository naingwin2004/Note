import { Toaster } from "react-hot-toast";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

import Main from "./layouts/Main.jsx";
import Notes from "./pages/Notes.jsx";
import EditNote from "./pages/EditNote.jsx";
import { NavBar } from "./components/index.js";
import CreateNote from "./pages/CreateNote.jsx";
import NoteDetails from "./pages/NoteDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import { useAuthStore } from "./store/auth.store.js";

const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated } = useAuthStore();
	if (isAuthenticated) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}
	return children;
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				index: true,
				element: <Notes />,
			},
			{
				path: "create",
				element: <CreateNote />,
			},
			{
				path: "details/:id",
				element: <NoteDetails />,
			},
			{
				path: "edit/:id",
				element: <EditNote />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "register",
				element: (
					<RedirectAuthenticatedUser>
						<Register />
					</RedirectAuthenticatedUser>
				),
			},
			{
				path: "login",

				element: (
					<RedirectAuthenticatedUser>
						<Login />
					</RedirectAuthenticatedUser>
				),
			},
		],
	},
]);

const App = () => {
	return (
		<div>
			<RouterProvider router={router} />
			<Toaster />
		</div>
	);
};

export default App;
