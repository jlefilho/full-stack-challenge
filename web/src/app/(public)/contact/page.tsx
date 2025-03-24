import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <main
      className="min-h-screen bg-primary px-6 md:px-[280px] py-10 overflow-y-auto"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto px-4">
        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--text-dark)" }}
          >
            ENTRE EM CONTATO
          </h2>
          <p>
            Se você tiver dúvidas, sugestões ou precisar de mais informações,
            fique à vontade para entrar em contato conosco!
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-start gap-6 sm:gap-10">
            <a
              href="mailto:jlespindolaf@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--text-dark)] text-white rounded-lg shadow-md hover:bg-[var(--orange-low)] transition-all duration-100 ease-in-out w-full sm:w-auto"
            >
              <FaEnvelope className="w-5 h-5" />
              <span>E-mail</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jlefilho"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--text-dark)] text-white rounded-lg shadow-md hover:bg-[var(--orange-low)] transition-all duration-100 ease-in-out w-full sm:w-auto"
            >
              <FaLinkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/jlefilho"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--text-dark)] text-white rounded-lg shadow-md hover:bg-[var(--orange-low)] transition-all duration-100 ease-in-out w-full sm:w-auto"
            >
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
