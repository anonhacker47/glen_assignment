import Logo from '@/assets/react.svg'
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header className="w-full relative bg-white shadow-md px-6 py-3 flex items-center justify-start">
            <div className='flex items-center gap-6'>
                <img src="/glen.webp" alt="" className='w-30' />
                <h1 className="text-3xl font-semibold tracking-wide text-gray-800">
                    Scheduler Assignment
                </h1>
            </div>

            <nav className="flex ml-80 gap-12 text-gray-600 font-bold">
                <Link to="/" className="hover:text-gray-900 transition">Assign Jobs</Link>
                <Link to="/employees" className="hover:text-gray-900 transition">Employees</Link>
                <Link to="/jobs" className="hover:text-gray-900 transition">Jobs</Link>
                <Link to="/schedule" className="hover:text-gray-900 transition">Schedule</Link>
            </nav>
        </header>
    );
}

export default Header;