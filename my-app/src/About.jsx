// About.jsx
export default function About() {
  return (
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
            contains five types of problem sets:{" "}
            <span className="text-yellow-400">
              Basic Level, Medium Level, Hard Level, and Very Hard Level and numeric level + some extra.
            </span>
          </p>
        </div>

        {/* Leaderboard 1 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">Leaderboard 1</h3>
          <p className="text-gray-300">
            A leaderboard based on the number of problems solved. Each problem
            in the five sets carries different points to ensure fair ranking.
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
            enjoyable, example student will select the level then select the problem
            by solving this problem the student will aswer few qutions which will take them near the answer.
            if sill student is not abel to solve the problem then aour AI will help them to solve the problem.
            ai will not directly give answer it will mentore them to solve the problem by teching some topics and the mcqs related to the problem.
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
            <span className="text-yellow-400">15 times per day per subject</span>.
          </p>
        </div>

        {/* AI Guidance */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">AI Guidance</h3>
          <p className="text-gray-300">
            Some questions combine multiple chapters,
            and these will remain locked until you’ve mastered the required
            foundational topics. as you complete the required topics, the AI will unlock the locked qutions and
             place it in your learning path way so student dont need to find thos locked qutions.
          </p>
        </div>

        {/* Parents Access */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">Parent Access</h3>
          <p className="text-gray-300">
            Parents can view detailed performance reports of their child,
            helping them track progress and improvement areas. and here you can make friends too.
            and can talk with your friends too.
          </p>
        </div>


        {/* institute Access */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">institute Access</h3>
          <p className="text-gray-300">
            institute can view detailed performance reports of their students,
            so that they will find out which student is wasing their time and not doing anything for progess.
            
          </p>
        </div>
      </div>
    </section>
  );
}
