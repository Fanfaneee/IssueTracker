import { useReducer, useEffect } from 'react';
import { issueReducer, initialState } from './reducer';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';

const API_URL = "http://localhost:3001/issues";

export default function App() {
  const [state, dispatch] = useReducer(issueReducer, initialState);

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Issues ({state.issues.length})</h2>
        <button onClick={loadIssues}>Refresh</button>
      </div>

      {state.loading && <p>Chargement...</p>}
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}

      <IssueList issues={state.issues} dispatch={dispatch} />
    </div>
  );
}