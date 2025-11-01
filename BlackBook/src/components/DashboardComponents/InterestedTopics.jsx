import React from 'react'

const InterestedTopics = () => {
    const interestedTopics = [
        "Machine Learning", "Data Structures", "Web Development",
        "Cloud Computing", "Algorithms", "Database Systems",
        "Cybersecurity", "Mobile Development"
    ];
  return (
     <div className="mt-6 border-t border-gray-700 pt-4">
                    <h2 className="text-xl font-bold mb-3">Interested Topics</h2>
                    <div className="flex flex-wrap gap-2">
                        {interestedTopics.map((topic, index) => (
                            <span key={index} className="bg-gray-700 text-sm px-3 py-1 rounded-full text-gray-300">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
  )
}

export default InterestedTopics