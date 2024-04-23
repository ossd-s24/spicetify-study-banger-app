import React from 'react';
import styles from './css/app.module.scss';

interface Playlist {
  id: string;
  name: string;
}

interface Props {
  onStartStudy: () => void;
  onSelectPlaylist: (playlistId: string) => void;
  userPlaylists: Playlist[];
}

const ReadyToStudyPage: React.FC<Props> = ({ onStartStudy, onSelectPlaylist, userPlaylists }) => {
  return (
    <div className={styles.readyToStudyPage}>
      <div className={styles.background_image}>
        <button className={`${styles.button} ${styles.border_red}`} onClick={onStartStudy}>
          <span className={`${styles.circle} ${styles.red}`} /> Study Off
        </button>
        <div className={styles.title}>Are You Ready to Study?</div>
      </div>

      <div className={styles.playlistContainer}>
        {userPlaylists.length > 0 ? (
          userPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className={styles.playlistItem}
              onClick={() => onSelectPlaylist(playlist.id)}
            >
              {playlist.name}
            </div>
          ))
        ) : (
          <div className={styles.noPlaylistsMessage}>You don't have any playlists yet.</div>
        )}
      </div>

      <div className={styles.motivation}>Time to Hit the Books!</div>

      <div className={styles.book}>
        <span className={styles.bookcover}></span>
        <span className={`${styles.flip} ${styles.bookpage}`}></span>
        <span className={`${styles.flip} ${styles.bookpage}`}></span>
        <span className={styles.bookpage}></span>
        <span className={`${styles.flip} ${styles.bookcover}`}></span>
      </div>
    </div>
  );
};

export default ReadyToStudyPage;
