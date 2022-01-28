import React from 'react'
import {

    Link,
    useMatch,
    useResolvedPath,
} from "react-router-dom";
const SidebarMenu = ({ uri, label, icon, onClick, actived }) => {
    let resolved = useResolvedPath(uri);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <>
            <li>
                <Link onClick={onClick} className={match ? 'bg-blue-600 hover:bg-blue-400 text-natural-800 rounded-full' : ''} to={uri}>
                    <i className={match ? `text-neutral-800 scale-150 ${icon}` : `scale-150 ${icon}`} />
                    <p className={match ? 'text-white' : ''}>{label}</p>
                </Link>
            </li>

        </>
    )
}

export default SidebarMenu
