import React from 'react';
import styles from './css/app.module.scss';

interface Props {
    onEndStudy: () => void;
}

const StudyTimePage: React.FC<Props> = ({onEndStudy}) => {
    return (
        <>

            <div
                className={`${styles.hero}`}
            // style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <button className={`${styles.button} ${styles.border_green}`} onClick={onEndStudy}>
                    <span className={`${styles.circle} ${styles.green}`} />{"Study on"}
                </button>
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
    );
};

export default StudyTimePage;