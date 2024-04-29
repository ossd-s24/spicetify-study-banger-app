import React, { useState, useEffect } from 'react';
import styles from './css/app.module.scss';

interface Props {
    onEndStudy: () => void;
    onChangeTheme: () => void;
}

const StudyTimePage: React.FC<Props> = ({ onEndStudy, onChangeTheme }) => {
    const [timer, setTimer] = useState<number>(25 * 60);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const [isPaused, setIsPaused] = useState<boolean>(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!isPaused) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        setIsRunning((prevIsRunning) => {
                            if (prevIsRunning) {
                                // Switch to break
                                setTimer(5 * 60); // 5 minutes
                            } else {
                                // Switch to work
                                setTimer(25 * 60); // 25 minutes
                            }
                            setIsPaused(true); // Pause the timer
                            clearInterval(interval); // Clear the interval to stop the timer
                            return !prevIsRunning;
                        });
                        return isRunning ? 5 * 60 : 25 * 60; // Return the new timer value
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isPaused, isRunning]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const toggleTimer = (): void => {
        setIsPaused((prevIsPaused) => !prevIsPaused);
    };

    // TODO: replace this with state and backend data
    // TODO: Classical music to study or sleep, classical bangers, Lofi study 2024
    const playlists = [
        // This would actually be dynamic data
        {
            id: 1,
            title: "Classical music to study or sleep",
            description: "The perfect study beats. Find your focus, crush yo...",
            link: 'spotify:playlist:5cwPclg5ZtafoBPWgZMHMb',
            image: 'https://i2o.scdn.co/image/ab67706c0000cfa33dcdcb8727cd0038e662f4c4'
        },
        {
            id: 2,
            title: "classical bangers",
            description: "The perfect study beats. Find your focus, crush yo...",
            link: 'spotify:playlist:27Zm1P410dPfedsdoO9fqm',
            image: 'https://i2o.scdn.co/image/ab67706c0000cfa3434a1c3fd09a2e8a26f57397',
        },
        {
            id: 3,
            title: "Lofi study 2024",
            description: "The perfect study beats. Find your focus, crush yo...",
            link: 'spotify:playlist:6zCID88oNjNv9zx6puDHKj',
            image: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84e8fcb214bcd7d054018d9fe4',
        },
        // ... more playlists
    ];

    const tags = [
        'Study Music',
        'Pop Classical Music'
    ]
    return (
        <>

            <div
                className={`${styles.hero}`}
            // style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <button className={`${styles.button} ${styles.border_green}`} onClick={onEndStudy}>
                    <span className={`${styles.circle} ${styles.green}`} />{"Study on"}
                </button>
                <button className={`${styles.button} ${styles.border_green}`} onClick={onChangeTheme}>
                    <span className={`${styles.circle} ${styles.green}`} />{"Change theme"}
                </button>
                <h1 className='bigTitle'>Study Sessions with Study Banger</h1>
            </div>
            <div className={styles.container1}>
                <div className={styles.typetimer}>{!isRunning ? 'Work' : 'Break'} Time!</div>
                <div className={styles.timer}>{formatTime(timer)}</div>
                <button className={`${styles.button1}`} onClick={toggleTimer}>
                    {isPaused ? 'Start' : 'Pause'}
                </button>
                <button className={`${styles.button1}`} onClick={() => {
                    setIsRunning(!isRunning);
                    setIsPaused(true); // Pause the timer when switching manually
                    setTimer(isRunning ? 5 * 60 : 25 * 60); // Switch between 5 minutes and 25 minutes
                }}>
                    Switch to {isRunning ? 'Work' : 'Break'}
                </button>
            </div>
            <div className={styles.container}>
                <div className={styles.title}>{isRunning ? 'Work' : 'Break'} Music</div>
                <div className={styles.playlists}>
                    {playlists.map((playlist) => (
                        <a href={playlist.link}>
                            <div key={playlist.id} className={styles.card}>
                                <img className={styles.cardImage} src={playlist.image} alt={playlist.title} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{playlist.title}</h3>
                                    <p className={styles.cardDescription}>{playlist.description}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StudyTimePage;
