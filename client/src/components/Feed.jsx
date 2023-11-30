import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chat from "./Chat";

const Feed = () => {
	return (
		<>
			<section className="h-screen w-full relative flex-1 flex flex-col justify-between items-center">
				<Navbar />
				<Chat />
				<Footer />
			</section>
		</>
	);
};

export default Feed;
