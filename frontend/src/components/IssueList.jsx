export default function IssueList({ issues, dispatch }) {

    const handleUpdate = async (id, status) => {
        await fetch(`http://localhost:3001/issues/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        dispatch({ type: 'UPDATE_STATUS', payload: { id, status } });
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3001/issues/${id}`, { method: 'DELETE' });
        dispatch({ type: 'DELETE_ISSUE', payload: id });
    };

    return (
        <div>
            {issues.map(issue => (
                <div key={issue.id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                    <h4>{issue.title}</h4>
                    <p>{issue.description}</p>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ background: '#fef3c7', padding: '2px 5px' }}>{issue.status}</span>
                        <span style={{ background: '#ede9fe', padding: '2px 5px' }}>{issue.priority}</span>
                    </div>
                    <select value={issue.status} onChange={(e) => handleUpdate(issue.id, e.target.value)}>
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                    <button onClick={() => handleDelete(issue.id)} style={{ marginLeft: '10px', color: 'red' }}>Supprimer</button>
                </div>
            ))}
        </div>
    );
}