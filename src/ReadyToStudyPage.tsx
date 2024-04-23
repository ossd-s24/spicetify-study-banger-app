import React, { useState } from 'react';
import styles from './css/app.module.scss';
import SpotifyService from './SpotifyService';

interface Props {
  onStartStudy: () => void;
  onSelectPlaylist: (playlistId: string) => void;
}

interface Playlist {
  id: string;
  name: string;
}

const ReadyToStudyPage: React.FC<Props> = ({ onStartStudy, onSelectPlaylist }) => {
  const [query, setQuery] = useState('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const handleSearch = async () => {
    const results = await SpotifyService.searchPlaylists(query);
    setPlaylists(results);
  };

  return (
    <>
      <div className={styles.background_image}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Playlists"
        />
        <button onClick={handleSearch}>Search</button>
        <button className={`${styles.button} ${styles.border_red}`} onClick={onStartStudy}>
          <span className={`${styles.circle} ${styles.red}`} />{"Study Off"}
        </button>
        <div className={styles.title}>{"Are You Ready to Study?"}</div>
      </div>
      {playlists.map((playlist) => (
        <div key={playlist.id} onClick={() => onSelectPlaylist(playlist.id)}>
          {playlist.name}
        </div>
      ))}
      <div className={styles.motivation}>{"Time to Hit the Books!"}</div>
    </>
  );
};

export default ReadyToStudyPage;
