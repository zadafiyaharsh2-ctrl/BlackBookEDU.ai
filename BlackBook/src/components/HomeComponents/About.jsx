import React from 'react'

const About = () => {
  return (
    <div>
       <section id="about" className="px-6 md:px-20 py-16 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-10 text-center tracking-wide">
            About BlackBookEDU.ai - How It Works
          </h2>

          {/* Mock Test */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Mock Tests</h3>
            <p className="text-gray-300">
              Every Sunday, a full-length mock test is conducted to help
              students evaluate their preparation and improve their exam
              strategy.
            </p>
          </div>

          {/* Problem Sets */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Problem Sets</h3>
            <p className="text-gray-300">
              Physics, Mathematics, Chemistry, and Biology – each chapter
              contains four types of problem sets:{" "}
              <span className="text-yellow-400">
                Basic Level, Medium Level, Hard Level, and Very Hard Level.
              </span>
            </p>
          </div>

          {/* Leaderboard 1 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Leaderboard 1</h3>
            <p className="text-gray-300">
              A leaderboard based on the number of problems solved. Each problem
              in the four sets carries different points to ensure fair ranking.
            </p>
          </div>

          {/* Leaderboard 2 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Leaderboard 2</h3>
            <p className="text-gray-300">
              A leaderboard based on mock test ratings, including individual
              rankings for each mock test.
            </p>
          </div>

          {/* AI Analytics */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">AI Analytics</h3>
            <p className="text-gray-300">
              Based on your performance, AI identifies your weak topics and
              highlights them on your personalized dashboard. and there is
              generate button to generate the path way with problems + topic
              explaination.
            </p>
          </div>

          {/* Gamified Problem Sets */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">
              Gamified Problem Sets
            </h3>
            <p className="text-gray-300">
              Problem sets are designed in a gamified way to make learning
              enjoyable, along with downloadable PDF versions for offline
              practice.
            </p>
          </div>

          {/* AI Trigger */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">
              AI Trigger - “I Don't Know”
            </h3>
            <p className="text-gray-300">
              An <span className="text-yellow-400">“I Don’t Know”</span> option
              allows students to trigger AI assistance. AI suggests which topic
              should be learned first before attempting the problem. Students
              can use this feature up to{" "}
              <span className="text-yellow-400">15 times per day</span>.
            </p>
          </div>

          {/* AI Guidance */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">AI Guidance</h3>
            <p className="text-gray-300">
              AI provides step-by-step guidance to help solve problems using
              your current knowledge. Some questions combine multiple chapters,
              and these will remain locked until you’ve mastered the required
              foundational topics.
            </p>
          </div>

          {/* Parents Access */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Parent Access</h3>
            <p className="text-gray-300">
              Parents can view detailed performance reports of their child,
              helping them track progress and improvement areas.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About