import { Link } from "react-router-dom";
import { Code2 } from "lucide-react"; // icon package

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl mx-auto flex items-center gap-3 py-4 px-6">
        {/* Logo icon */}
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
          <Code2 className="text-white" size={22} />
        </div>

        {/* Title */}
        <Link to="/" className="text-xl font-semibold text-gray-900">
          DeveloperTheExplore
        </Link>
      </div>
    </header>
  );
}
