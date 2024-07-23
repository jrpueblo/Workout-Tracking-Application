import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar(){
    const navRef = useRef();
    return (
        <header>
			<h3>Workout Tracking</h3>
			<nav ref={navRef}>
				<a href="/#">Today's Workout</a>
				<a href="/#">Archive</a>
				{/* <a href="/#">Blog</a>
				<a href="/#">About me</a> */}
				<button
					className="nav-btn nav-close-btn">
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn">
				<FaBars />
			</button>
		</header>

    );
}

export default Navbar