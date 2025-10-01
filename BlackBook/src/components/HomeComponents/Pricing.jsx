import React from 'react'

const Pricing = () => {
  return (
    <div>

    <section
        id="pricing"
        className="flex flex-col md:h-screen md:flex-row justify-between p-5 md:pt-[100px] md:p-16 gap-8 bg-zinc-900 text-white"
      >
        {/* Free Version Card */}
        <div className="w-full md:w-1/2 rounded-xl bg-black p-6 shadow-lg hover:scale-105 transition duration-300 border border-white flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Free Version</h2>
          <ul className="space-y-3 mb-6 text-gray-300 flex-1">
            <li>✔ Access to chapter one</li>
            <li>✔ Limited problem sets</li>
            <li>✔ Limited AI guidance</li>
            <li className="line-through">✘ Advanced analytics</li>
            <li className="line-through">✘ every sunday mock test</li>
            <li className="line-through">✘ weak/strong spots analysis</li>
            <li className="line-through">✘ leaderboard as problem solver</li>
            <li className="line-through">✘ leaderboard as per mock test</li>
            <li className="line-through">✘ Ranking in community</li>
            <li className="line-through">✘ parents Access</li>
          </ul>
          <a
            href="https://rzp.io/l/BlackBookAi"
            className="text-center bg-white py-2 rounded-lg font-semibold text-black"
          >
            Free Version
          </a>
        </div>

        {/* Paid Version Card */}
        <div className="w-full md:w-1/2 border-4 rounded-xl bg-white text-black p-6 shadow-lg hover:scale-105 transition duration-300 border-black flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Paid Version</h2>
          <ul className="space-y-3 mb-6 text-gray-700 flex-1">
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
      </section>



    </div>
  )
}

export default Pricing