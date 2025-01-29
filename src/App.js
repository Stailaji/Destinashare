import { useEffect, useState } from 'react';
import supabase from './supabase';

import './style.css';

// Kategorien für Reiseziele (Farben für die UI)
const CATEGORIES = [
  { name: 'city', color: '#3b82f6' },
  { name: 'nature', color: '#16a34a' },
  { name: 'beach', color: '#ef4444' },
  { name: 'adventure', color: '#eab308' },
  { name: 'culture', color: '#db2777' },
  { name: 'relaxation', color: '#14b8a6' },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

// Holt Reiseziele aus der Datenbank, wenn sich die Kategorie ändert
  useEffect(() => {
    async function getDestinations() {
      setIsLoading(true);

      let query = supabase.from('destinations').select('*');

      if (currentCategory !== 'all') query = query.eq('category', currentCategory);

      const { data: destinations, error } = await query
        .order('votesRecommended', { ascending: false })
        .limit(1000);

      if (!error) setDestinations(destinations);
      else alert('There was a problem fetching the destinations');
      setIsLoading(false);
    }

    getDestinations();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm && <NewDestinationForm setDestinations={setDestinations} setShowForm={setShowForm} />}
      <main className="main-content">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <DestinationList destinations={destinations} setDestinations={setDestinations} />}
      </main>
    </>
  );
}

// Header mit Logo und Button zum Öffnen des Formulars
function Header({ showForm, setShowForm }) {
  const appTitle = 'Destinashare';

  return (
    <header className="app-header">
      <div className="header-logo">
        <img src="logo.png" height="68" width="68" alt="Explore Destinations Logo" />
        <h1>{appTitle}</h1>
      </div>

      <button className="btn btn-large btn-toggle-form" onClick={() => setShowForm((show) => !show)}>
        {showForm ? 'Close' : 'Add Destination'}
      </button>
    </header>
  );
}

// Ladeanzeige während des Datenabrufs
function Loader() {
  return <p className="loading-message">Loading...</p>;
}

// Kategorie-Filter für die Reiseziele
function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside className="category-filter">
      <ul>
        <li className="category-item">
          <button className="btn btn-all-categories" onClick={() => setCurrentCategory('all')}>
            All
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category-item">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Zeigt die Liste der gespeicherten Reiseziele an
function DestinationList({ destinations, setDestinations }) {
  if (destinations.length === 0)
    return <p className="no-destinations-message">No destinations found! Add the first one ✌️</p>;

  return (
    <section className="destination-list">
      <ul>
        {destinations.map((destination) => (
          <DestinationItem key={destination.id} destination={destination} setDestinations={setDestinations} />
        ))}
      </ul>
      <p className="destination-count">There are {destinations.length} destinations in the database. Add your own!</p>
    </section>
  );
}

// Einzelnes Reiseziel mit Abstimmungsbuttons
function DestinationItem({ destination, setDestinations }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedDestination, error } = await supabase
      .from('destinations')
      .update({ [columnName]: destination[columnName] + 1 })
      .eq('id', destination.id)
      .select();
    setIsUpdating(false);

// Aktualisiert die Liste mit dem neuen Voting-Status
    if (!error) {
      setDestinations((prev) =>
        prev.map((d) => (d.id === destination.id ? updatedDestination[0] : d))
      );
    }
  }

  return (
    <li className="destination-item">
      <p>
        {destination.text}
        <a className="destination-source" href={destination.source} target="_blank" rel="noreferrer">
          (Source)
        </a>
      </p>
      <span
        className="destination-category"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === destination.category)?.color,
        }}
      >
        {destination.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVote('votesRecommended')} disabled={isUpdating}>
          👍 {destination.votesRecommended}
        </button>
        <button onClick={() => handleVote('votesMustVisit')} disabled={isUpdating}>
          🏞️ {destination.votesMustVisit}
        </button>
        <button onClick={() => handleVote('votesNotWorthIt')} disabled={isUpdating}>
          ❌ {destination.votesNotWorthIt}
        </button>
      </div>
    </li>
  );
}

// Formular zum Hinzufügen neuer Reiseziele
function NewDestinationForm({ setDestinations, setShowForm }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (text && source && category) {
      setIsUploading(true);
      
    // Fügt ein neues Reiseziel zur Datenbank hinzu
      const { data: newDestination, error } = await supabase
        .from('destinations')
        .insert([
          {
            text,
            source,
            category,
            votesRecommended: 0,
            votesMustVisit: 0,
            votesNotWorthIt: 0,
          },
        ])
        .select();

      setIsUploading(false);

      if (!error) {
        setDestinations((prev) => [newDestination[0], ...prev]);
        setText('');
        setSource('');
        setCategory('');
        setShowForm(false);
      }
    }
  }

  return (
    <form className="new-destination-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter destination name..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <input
        type="text"
        placeholder="Enter source URL..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={isUploading}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" type="submit" disabled={isUploading}>
        Add
      </button>
    </form>
  );
}

export default App;
