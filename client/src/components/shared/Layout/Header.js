import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { BiDonateBlood } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        alert("Logout Successfully");
        navigate("/login");
    };

    const user = useSelector(state => state.auth?.user);

    const getUserDisplayName = () => {
        if (!user) return 'Welcome User';
        return `Welcome ${user.name || user.hopitalName || user.orgnisationName}`;
    };

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <BiDonateBlood color="red" />
                    Blood Bank App
                </div>
                <ul className="navbar-nav flex-row">
                    <li className="nav-item mx-3">
                        <p className="nav-link">
                            <FaCircleUser color="white" />
                            {getUserDisplayName()}
                            &nbsp;
                            {user && (
                                <span className="badge bg-secondary">{user.role}</span>
                            )}
                        </p>
                    </li>
                    <li className="nav-item mx-3">
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
