import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ChatProvider } from "./context/chatContext.jsx"; // Adjust the path

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChatProvider>
			<App />
		</ChatProvider>
	</React.StrictMode>
);
