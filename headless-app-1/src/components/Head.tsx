//import { Routes, Route, Link } from 'react-router-dom';
import {Link } from 'react-router-dom';

function Page() {
    return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about" class="ms-2">[ about ]</Link>
        <Link to="/todo13" class="ms-2">[ todo13 ]</Link>
        <hr />
    </div>
    );
}
export default Page;
