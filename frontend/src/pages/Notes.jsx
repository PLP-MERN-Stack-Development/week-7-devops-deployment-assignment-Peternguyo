import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch notes
  useEffect(() => {
    fetch(`${API_URL}/api/notes`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotes(data);
        } else {
          setNotes([]);
          setError(data.error || 'Unexpected response');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch notes');
        setLoading(false);
      });
  }, []);

  // Add note
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error('Failed to add note');
      const newNote = await res.json();
      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
    } catch {
      setError('Failed to add note');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Notes</h2>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Content"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Add Note</button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {notes.map(note => (
            <li key={note._id} className="bg-gray-100 rounded p-4 shadow-sm">
              <strong className="block text-lg text-gray-800 mb-1">{note.title}</strong>
              <div className="text-gray-700 mb-2">{note.content}</div>
              <small className="text-gray-500">{new Date(note.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 