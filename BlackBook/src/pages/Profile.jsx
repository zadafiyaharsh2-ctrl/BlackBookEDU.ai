import React from 'react';

const dummyData = {
  avatarUrl: 'https://ui-avatars.com/api/?name=Harsh+Zadafiya&background=0D8ABC&color=fff',
  name: 'Harsh Zadafiya',
  userName: 'harshzada',
  email: 'harsh@example.com',
  phone: 'idk',
  institution: 'ABC Engineering College',
  department: 'Computer Science',
  role: 'student',
  year: '3rd Year',
  bio: 'Aspiring JEE/GATE topper. Loves coding, cricket, and coffee.',
  achievements: ['Topper - Semester 2', 'Quiz Master', 'Hackathon Winner'],
  scores: {
    jee: 97,
    gate: 85,
    quizzes: [
      { title: 'JEE Physics', score: 88 },
      { title: 'GATE Maths', score: 92 },
      { title: 'NEET Chemistry', score: 78 }
    ]
  },
  friends: [
    { name: 'Amit', userName: 'amit123', avatarUrl: 'https://ui-avatars.com/api/?name=Amit&background=333333&color=fff' },
    { name: 'Priya', userName: 'priya456', avatarUrl: 'https://ui-avatars.com/api/?name=Priya&background=222222&color=fff' }
  ],
  materialsAccessed: [
    { title: 'JEE 2022 PYQ', subject: 'Physics' },
    { title: 'GATE Prep Video', subject: 'Maths' }
  ],
  recentActivity: [
    { type: 'quiz', detail: 'Completed JEE Physics Quiz', date: '2025-09-28' },
    { type: 'material', detail: 'Viewed GATE Prep Video', date: '2025-09-29' }
  ]
};

const Profile = () => {
  return (
    <div style={{
      background: '#18181c',
      color: '#f5f6fa',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 900,
        margin: 'auto',
        background: '#23232a',
        borderRadius: 20,
        boxShadow: '0 4px 32px #0a0a0e',
        padding: '2rem'
      }}>
        {/* Top section */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <img src={dummyData.avatarUrl} alt="Avatar" style={{ width: 120, height: 120, borderRadius: '50%', marginRight: 32, border: '3px solid #5d5dff' }} />
          <div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: 8 }}>{dummyData.name} <span style={{
              fontSize: '1.2rem', color: '#5d5dff', background: '#23234c', borderRadius: 6, padding: '2px 8px', marginLeft: 10
            }}>{dummyData.role}</span></h1>
            <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>
              <strong>@{dummyData.userName}</strong>
            </div>
            <div style={{ color: '#b5b5cc' }}>{dummyData.bio}</div>
          </div>
        </div>

        {/* Details section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Contact</h3>
            <div>Email: <span style={{ color: '#b5b5cc' }}>{dummyData.email}</span></div>
            <div>Phone: <span style={{ color: '#b5b5cc' }}>{dummyData.phone}</span></div>
            <div>Institution: <span style={{ color: '#b5b5cc' }}>{dummyData.institution}</span></div>
            <div>Department: <span style={{ color: '#b5b5cc' }}>{dummyData.department}</span></div>
            <div>Year: <span style={{ color: '#b5b5cc' }}>{dummyData.year}</span></div>
          </div>
          <div>
            <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Achievements</h3>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {dummyData.achievements.map((ach, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{ach}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scores & Quizzes */}
        <div style={{
          marginBottom: '2rem',
          background: '#1b1b24',
          borderRadius: 12,
          padding: '1.2rem'
        }}>
          <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Exam Scores & Quizzes</h3>
          <div>JEE Score: <strong>{dummyData.scores.jee}</strong></div>
          <div>GATE Score: <strong>{dummyData.scores.gate}</strong></div>
          <div style={{ marginTop: 8, marginBottom: 4 }}>Recent Quizzes:</div>
          <ul style={{ paddingLeft: 20 }}>
            {dummyData.scores.quizzes.map((quiz, i) => (
              <li key={i}>{quiz.title} - <strong>{quiz.score}</strong></li>
            ))}
          </ul>
        </div>

        {/* Friends */}
        <div style={{
          marginBottom: '2rem',
          background: '#22222c',
          borderRadius: 12,
          padding: '1.2rem'
        }}>
          <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Friends</h3>
          <div style={{ display: 'flex', gap: 24 }}>
            {dummyData.friends.map((friend, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <img src={friend.avatarUrl} alt={friend.name} style={{ width: 50, height: 50, borderRadius: '50%', border: '2px solid #5d5dff' }} />
                <div style={{ fontSize: '1rem', color: '#b5b5cc' }}>{friend.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#5d5dff' }}>@{friend.userName}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Materials Accessed */}
        <div style={{
          marginBottom: '2rem',
          background: '#262634',
          borderRadius: 12,
          padding: '1.2rem'
        }}>
          <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Materials Accessed</h3>
          <ul style={{ paddingLeft: 20 }}>
            {dummyData.materialsAccessed.map((mat, i) => (
              <li key={i}>{mat.title} <span style={{ color: '#b5b5cc' }}>({mat.subject})</span></li>
            ))}
          </ul>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: '#1a1a1f',
          borderRadius: 12,
          padding: '1.2rem'
        }}>
          <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Recent Activity</h3>
          <ul style={{ paddingLeft: 20 }}>
            {dummyData.recentActivity.map((act, i) => (
              <li key={i}>{act.detail} <span style={{ color: '#b5b5cc' }}>({act.date})</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;