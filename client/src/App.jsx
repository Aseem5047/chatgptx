import React from "react";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";

const App = () => {
	return (
		<div className="relative flex items-center gap-4">
			{/* sidebar */}
			<Sidebar />

			{/* main section */}
			<Feed />
		</div>
	);
};

export default App;
