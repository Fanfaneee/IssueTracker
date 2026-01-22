import { useReducer, useEffect, useState } from 'react';
import { issueReducer, initialState } from './reducer';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';

const API_URL = "http://localhost:3001/issues";

const sortIssues = (issues, sortBy) => {
  const sorted = [...issues];
  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'priority':
      const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case 'status':
      return sorted.sort((a, b) => a.status.localeCompare(b.status));
    default:
      return sorted;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(issueReducer, initialState);
  const [sortBy, setSortBy] = useState('none');

  const loadIssues = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: "Impossible de charger les données" });
    }
  };

  useEffect(() => { loadIssues(); }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>Issue Tracker</h1>
      <IssueForm dispatch={dispatch} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2>Issues ({state.issues.length})</h2>
        <button onClick={loadIssues}>Refresh</button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Trier par: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '5px' }}>
          <option value="none">Aucun</option>
          <option value="title">Titre (A-Z)</option>
          <option value="priority">Priorité</option>
          <option value="status">Statut</option>
        </select>
      </div>

      {state.loading && <p>Chargement...</p>}
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}

      <IssueList issues={sortIssues(state.issues, sortBy)} dispatch={dispatch} />
    </div>
  );
}