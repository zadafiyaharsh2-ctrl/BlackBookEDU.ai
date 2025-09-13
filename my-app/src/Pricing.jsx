export default function Pricing() {
  return (
    <section
      id="pricing"
      className="flex flex-col md:h-screen md:flex-row justify-between p-5 md:pt-[100px] md:p-16 gap-8 bg-zinc-900 text-white"
    >
     

      {/* Paid Version Card */}
      <div className="w-full md:w-1/2 border-4 rounded-xl bg-white text-black p-6 shadow-lg hover:scale-105 transition duration-300 border-black flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Paid Version for students</h2>
        <ul className="space-y-3 mb-6 text-gray-700 text-center flex-1">
          <li>✔ Access to all the chapter</li>
          <li>✔ Unlimited problem sets</li>
          <li>✔ Advanced analytics</li>
          <li>✔ every sunday mock test</li>
          <li>✔ weak/strong spots analysis</li>
          <li>✔ Ai guidence</li>
          <li>✔ leaderboard as problem solver</li>
          <li>✔ leaderboard as per mock test</li>
          <li>✔ ranking in community</li>
          <li>✔ parents Access</li>
        </ul>
        <a
          href="https://rzp.io/l/BlackBookEDU.ai"
          className="text-center bg-black py-2 rounded-lg font-semibold text-white"
        >
          Buy Premium
        </a>
      </div>

      {/* Paid Version Card */}
      <div className="w-full md:w-1/2  rounded-xl bg-black text-white p-6 shadow-lg hover:scale-105 border border-white transition duration-300 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Paid Virssion For Institutes</h2>
        <ul className="space-y-3 mb-6 text-white flex-1 text-center">
          <li>✔ Access to all the chapter</li>
          <li>✔ Unlimited problem sets institute can customize</li>
          <li>✔ Advanced analytics</li>
          <li>✔ every sunday mock test</li>
          <li>✔ weak/strong spots analysis</li>
          <li>✔ Ai guidence</li>
          <li>✔ leaderboard as problem solver</li>
          <li>✔ leaderboard as per mock test</li>
          <li>✔ ranking in community</li>
          <li>✔ parents Access</li>
          <li>✔ institute Access</li>
        </ul>
        <a
          href="https://rzp.io/l/BlackBookEDU.ai"
          className="text-center bg-white py-2 rounded-lg font-semibold text-black"
        >
          Buy Premium
        </a>
      </div>
    </section>
  );
}
