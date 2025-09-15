//import { Routes, Route, Link } from 'react-router-dom';
import {Link } from 'react-router-dom';

function Page() {
    return (
    <div>
        <Link to="/" class="ms-2">Home</Link>
        <Link to="/sort" class="ms-2">[ sort ]</Link>
        <Link to="/table" class="ms-2">[ table ]</Link>
        <Link to="/table2" class="ms-2">[ table2 ]</Link>
        <Link to="/about" class="ms-2">[ about ]</Link>
        <hr />
    </div>
    );
}
export default Page;
