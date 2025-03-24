export default function About() {
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
            COMO FUNCIONA
          </h2>
          <p>
            O objetivo deste projeto é fornecer cotações de câmbio em tempo
            real, especificamente para a moeda USD/BRL (dólar americano para
            real brasileiro). As cotações são coletadas periodicamente de
            diversas fontes e apresentadas ao usuário de forma clara e
            organizada.
          </p>
          <p className="mt-4">
            O sistema analisa qual fonte possui os melhores preços em relação à
            média das cotações. Dessa forma, é possível comparar a cotação de
            compra e venda de cada fonte e verificar qual delas está oferecendo
            as melhores condições no momento.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--text-dark)" }}
          >
            COMO COLETAMOS OS DADOS
          </h2>
          <p>
            Todos os dados de cotações são coletados de plataformas financeiras,
            utilizando nossa{" "}
            <a
              href="https://api-currenzy.onrender.com"
              className="text-blue-500"
            >
              API
            </a>
            . Os dados são processados a cada 15 segundos para garantir que as
            informações exibidas estejam sempre atualizadas.
          </p>
        </section>
      </div>
    </main>
  );
}
