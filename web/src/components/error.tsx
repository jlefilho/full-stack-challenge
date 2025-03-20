import { AiOutlineWarning } from "react-icons/ai";

interface ErrorProps {
  onRetry: () => void;
}

export function Error({ onRetry }: ErrorProps) {
  return (
    <div className="flex flex-col justify-center items-center text-center bg-white p-8 rounded-lg shadow-lg">
      <AiOutlineWarning size={60} color="var(--orange-low)" className="mb-6" />
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-[var(--logo-color)]">
          Ocorreu um erro
        </h2>
        <p className="mt-2 text-lg text-[var(--logo-color)]">
          Não foi possível carregar os dados. Tente novamente mais tarde.
        </p>
        <button
          onClick={onRetry}
          className="mt-6 px-6 py-2 bg-[var(--logo-color)] text-white font-semibold rounded-lg hover:bg-[var(--orange-low)] focus:outline-none transition-colors duration-100"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
