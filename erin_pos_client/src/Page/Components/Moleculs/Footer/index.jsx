import React from 'react'
import {
    Link
} from 'react-router-dom'
const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className=" container-fluid ">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/help">Help</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </>
    )
}

export default Footer
