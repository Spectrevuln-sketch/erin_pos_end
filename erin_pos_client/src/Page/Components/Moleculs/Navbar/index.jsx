import React from 'react'
import {
    Link
} from 'react-router-dom'

const Navbar = ({ }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-transparent  bg-primary mb-4">
                <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                            <button type="button" className="navbar-toggler">
                                <span className="navbar-toggler-bar bar1" />
                                <span className="navbar-toggler-bar bar2" />
                                <span className="navbar-toggler-bar bar3" />
                            </button>
                        </div>

                    </div>

                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navigation"
                    >

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#pablo">
                                    <i className="now-ui-icons media-2_sound-wave text-black font-semibold" />
                                    <p>
                                        <span className="d-lg-none d-md-block">Stats</span>
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown text-black">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    to=""
                                >
                                    <i className="now-ui-icons location_world font-semibold" />
                                    <p>
                                        <span className="d-lg-none d-md-block">Some Actions</span>
                                    </p>
                                </Link>
                                <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <Link className="dropdown-item" to="#">
                                        Action
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                        Another action
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                        Something else here
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="">
                                    <i className="now-ui-icons users_single-02 text-black font-semibold" />
                                    <p>
                                        <span className="d-lg-none d-md-block">Account</span>
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
