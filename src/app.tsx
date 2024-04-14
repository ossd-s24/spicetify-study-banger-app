import styles from './css/app.module.scss'
import React from 'react'
import backgroundImage from '../assets/top-background.jpeg'

class App extends React.Component<{}, { count: number }> {
  state = {
    count: 0,
  };

  stopConfettiTimeout: NodeJS.Timeout | null = null;

  onButtonClick = () => {
    this.setState((state) => {
      return {
        count: state.count + 1,
      }
    });
  };

  render() {

    // TODO: replace this with state and backend data
    const playlists = [
      // This would actually be dynamic data
      { id: 1, title: "chill lofi study beats", description: "The perfect study beats. Find your focus, crush yo..." },
      { id: 2, title: "chill lofi study beats", description: "The perfect study beats. Find your focus, crush yo..." },
      { id: 3, title: "chill lofi study beats", description: "The perfect study beats. Find your focus, crush yo..." },
      // ... more playlists
    ];

    return <>
      <div
        className={`${styles.hero}`}
      // style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className='bigTitle'>Study Sessions with Study Banger</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>{"Study Music"}</div>
        <div className={styles.playlists}>
          {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.card}>
              <img className={styles.cardImage} src="path-to-playlist-image" alt={playlist.title} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{playlist.title}</h3>
                <p className={styles.cardDescription}>{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  }
}

export default App;
