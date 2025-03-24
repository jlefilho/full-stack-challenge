import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-white py-4 shadow-[0px_-4px_10px_2px_rgba(0,0,0,0.1)]">
      <div className="mx-auto px-6 sm:px-10 md:px-20 max-w-screen-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Currenzy. Todos os direitos
              reservados.
            </p>
          </div>

          <div className="flex justify-center sm:justify-end gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link
              href="mailto:jlespindolaf@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--text-dark)] text-white rounded-lg shadow-md hover:bg-[var(--orange-low)] transition-all duration-300 ease-in-out"
            >
              <FaEnvelope className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/jlefilho"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--text-dark)] text-white rounded-lg shadow-md hover:bg-[var(--orange-low)] transition-all duration-300 ease-in-out"
            >
              <FaLinkedin className="w-5 h-5" />
            </Link>
            <Link
              href="https://github.com/jlefilho"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--text-dark)] text-white rounded-lg shadow-md hover:bg-[var(--orange-low)] transition-all duration-300 ease-in-out"
            >
              <FaGithub className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
