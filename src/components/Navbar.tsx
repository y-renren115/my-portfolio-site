import Link from 'next/link';
import DescriptionIcon from '@mui/icons-material/Description';

const Navbar = () => {
  return (
    <header className="flex items-center font-alice bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <DescriptionIcon width={50} height={50} />
            <span className="font-bold hover:underline text-xl ml-2">My Portfolio</span>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about">
                <span className="font-bold hover:underline cursor-pointer">About</span>
              </Link>
            </li>
            <li>
              <Link href="/works">
                <span className="font-bold hover:underline cursor-pointer">Works</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="font-bold hover:underline cursor-pointer">Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
