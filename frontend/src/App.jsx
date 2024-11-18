import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./layouts/Main.jsx";
import Notes from "./pages/Notes.jsx";
import EditNote from "./pages/EditNote.jsx";
import { NavBar } from "./components/index.js";
import CreateNote from "./pages/CreateNote.jsx";
import NoteDetails from "./pages/NoteDetails.jsx";

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
