import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Assume JWT token stored in localStorage after login
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        // Get user info
        const { data: userData } = await axios.get('/api/users/me', { headers });
        setUser(userData);

        // Get dashboard data (quizzes, materials, scores, etc)
        const { data: dashData } = await axios.get('/api/users/me/dashboard', { headers });
        setDashboard(dashData.dashboard || {});

        // Get achievements
        const { data: achData } = await axios.get('/api/users/me/achievements', { headers });
        setAchievements(Array.isArray(achData.achievements) ? achData.achievements : []);

        // Get connections/friends
        const { data: connData } = await axios.get('/api/users/me/connections', { headers });
        setConnections(Array.isArray(connData.connections) ? connData.connections : []);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '5rem' }}>Loading...</div>;
  if (!user) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '5rem' }}>Profile not found!</div>;

  // Defensive assignment for arrays
  const dash = dashboard || {};
  const recentQuizzes = Array.isArray(dash.scores?.quizzes) ? dash.scores.quizzes : [];
  const materialsAccessed = Array.isArray(dash.materialsAccessed) ? dash.materialsAccessed : [];
  const recentActivity = Array.isArray(dash.recentActivity) ? dash.recentActivity : [];
  const suggestedQuizzes = Array.isArray(dash.suggestedQuizzes) ? dash.suggestedQuizzes : [];
  const suggestedMaterials = Array.isArray(dash.suggestedMaterials) ? dash.suggestedMaterials : [];

  return (
    <div style={{
      background: '#18181c',
      color: '#f5f6fa',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 1100,
        margin: 'auto',
        background: '#23232a',
        borderRadius: 24,
        boxShadow: '0 4px 32px #0a0a0e',
        padding: '2.5rem'
      }}>
        {/* Top section */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}>
          <img src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
            alt="Avatar"
            style={{ width: 130, height: 130, borderRadius: '50%', marginRight: 40, border: '4px solid #5d5dff' }} />
          <div>
            <h1 style={{ fontSize: '2.4rem', marginBottom: 8 }}>
              {user.name} <span style={{
                fontSize: '1.25rem', color: '#5d5dff', background: '#23234c', borderRadius: 8, padding: '3px 12px', marginLeft: 12
              }}>{user.role}</span>
            </h1>
            <div style={{ fontSize: '1.15rem', marginBottom: 8 }}>
              <strong>@{user.userName}</strong>
            </div>
            <div style={{ color: '#b5b5cc', fontSize: '1.1rem' }}>{user.bio}</div>
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
            <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Contact & Institute</h3>
            <div>Email: <span style={{ color: '#b5b5cc' }}>{user.email}</span></div>
            <div>Phone: <span style={{ color: '#b5b5cc' }}>{user.phone || 'NA'}</span></div>
            <div>Institution: <span style={{ color: '#b5b5cc' }}>{user.institutionId?.name || 'NA'}</span></div>
            <div>Department: <span style={{ color: '#b5b5cc' }}>{user.departmentId?.name || 'NA'}</span></div>
            <div>Year: <span style={{ color: '#b5b5cc' }}>{user.year || dash.year || 'NA'}</span></div>
            <div>Joined: <span style={{ color: '#b5b5cc' }}>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'NA'}</span></div>
          </div>
          <div>
            <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Achievements</h3>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {achievements.length > 0
                ? achievements.map((ach, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>{ach}</li>
                ))
                : <li>No achievements yet.</li>}
            </ul>
          </div>
        </div>

        {/* Scores & Quizzes & Analysis */}
        <div style={{
          marginBottom: '2rem',
          background: '#1b1b24',
          borderRadius: 14,
          padding: '1.5rem'
        }}>
          <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Exam Scores & Quiz Analysis</h3>
          <div>
            <strong>JEE Score:</strong> {dash.scores?.jee ?? 'NA'}
            <span style={{ marginLeft: 20 }}><strong>GATE Score:</strong> {dash.scores?.gate ?? 'NA'}</span>
          </div>
          <div style={{ marginTop: 12, marginBottom: 8 }}>Recent Quizzes:</div>
          <ul style={{ paddingLeft: 20 }}>
            {recentQuizzes.length > 0
              ? recentQuizzes.map((quiz, i) => (
                <li key={i}>{quiz.title} - <strong>{quiz.score}</strong></li>
              ))
              : <li>No quizzes taken yet.</li>}
          </ul>
          <div style={{ marginTop: 16 }}>
            <strong>Overall Quiz Average:</strong> {dash.quizAverage ?? '--'}
            <span style={{ marginLeft: 20 }}><strong>Best Subject:</strong> {dash.bestSubject ?? '--'}</span>
            <span style={{ marginLeft: 20 }}><strong>Quizzes Attempted:</strong> {dash.totalQuizzes ?? '--'}</span>
          </div>
        </div>

        {/* Friends/Connections */}
        <div style={{
          marginBottom: '2rem',
          background: '#22222c',
          borderRadius: 14,
          padding: '1.5rem'
        }}>
          <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Friends / Connections</h3>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {connections.length > 0
              ? connections.map((friend, i) => (
                <div key={i} style={{ textAlign: 'center', minWidth: 90 }}>
                  <img src={friend.avatarUrl || `https://ui-avatars.com/api/?name=${friend.name}&background=333333&color=fff`} alt={friend.name} style={{
                    width: 54, height: 54, borderRadius: '50%', border: '2px solid #5d5dff', marginBottom: 6
                  }} />
                  <div style={{ fontSize: '1rem', color: '#b5b5cc' }}>{friend.name}</div>
                  <div style={{ fontSize: '0.95rem', color: '#5d5dff' }}>@{friend.userName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#b5b5cc' }}>{friend.role}</div>
                </div>
              ))
              : <div>No connections yet.</div>}
          </div>
        </div>

        {/* Materials Accessed & Analysis */}
        <div style={{
          marginBottom: '2rem',
          background: '#262634',
          borderRadius: 14,
          padding: '1.5rem'
        }}>
          <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Materials Accessed</h3>
          <ul style={{ paddingLeft: 20 }}>
            {materialsAccessed.length > 0
              ? materialsAccessed.map((mat, i) => (
                <li key={i}>{mat.title} <span style={{ color: '#b5b5cc' }}>({mat.subject})</span></li>
              ))
              : <li>No materials accessed yet.</li>}
          </ul>
          <div style={{ marginTop: 12 }}>
            <strong>Total Materials Downloaded:</strong> {dash.totalMaterials ?? '--'}
            <span style={{ marginLeft: 20 }}><strong>Favorite Subject:</strong> {dash.favoriteMaterialSubject ?? '--'}</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: '#1a1a1f',
          borderRadius: 14,
          padding: '1.5rem'
        }}>
          <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Recent Activity</h3>
          <ul style={{ paddingLeft: 20 }}>
            {recentActivity.length > 0
              ? recentActivity.map((act, i) => (
                <li key={i}>{act.detail} <span style={{ color: '#b5b5cc' }}>({act.date ? new Date(act.date).toLocaleDateString() : ''})</span></li>
              ))
              : <li>No recent activity.</li>}
          </ul>
        </div>

        {/* Advanced Analysis Section */}
        <div style={{
          background: '#14141c',
          borderRadius: 14,
          padding: '1.5rem',
          marginTop: '2rem'
        }}>
          <h3 style={{ color: '#5d5dff', marginBottom: 8 }}>Advanced Performance Analysis</h3>
          <div>
            <strong>Progress Trend:</strong> {dash.progressTrend ?? 'No data'}
            <span style={{ marginLeft: 20 }}><strong>Rank in Department:</strong> {dash.rankInDepartment ?? 'NA'}</span>
            <span style={{ marginLeft: 20 }}><strong>Rank in Institution:</strong> {dash.rankInInstitution ?? 'NA'}</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <strong>Suggested Next Quizzes:</strong>
            <ul style={{ paddingLeft: 20 }}>
              {suggestedQuizzes.length > 0
                ? suggestedQuizzes.map((sq, i) => (
                  <li key={i}>{sq.title} ({sq.subject})</li>
                ))
                : <li>No suggestions yet.</li>}
            </ul>
          </div>
          <div style={{ marginTop: 16 }}>
            <strong>Suggested Materials:</strong>
            <ul style={{ paddingLeft: 20 }}>
              {suggestedMaterials.length > 0
                ? suggestedMaterials.map((sm, i) => (
                  <li key={i}>{sm.title} ({sm.subject})</li>
                ))
                : <li>No suggestions yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;