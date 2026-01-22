import { useState } from 'react';

export default function IssueForm({ dispatch }) {
    const [fields, setFields] = useState({ title: '', description: '', priority: 'MEDIUM' });

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/issues", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields)
        });
        const newItem = await res.json();
        dispatch({ type: 'ADD_ISSUE', payload: newItem });
        setFields({ title: '', description: '', priority: 'MEDIUM' });
    };

    return (
        <form onSubmit={onSubmit} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Créer une issue</h3>
            <input
                placeholder="Titre"
                value={fields.title}
                onChange={e => setFields({ ...fields, title: e.target.value })}
                required
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <textarea
                placeholder="Description"
                value={fields.description}
                onChange={e => setFields({ ...fields, description: e.target.value })}
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <select
                value={fields.priority}
                onChange={e => setFields({ ...fields, priority: e.target.value })}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>
            <button type="submit" style={{ width: '100%', padding: '10px', background: '#000', color: '#fff' }}>Créer</button>
        </form>
    );
}