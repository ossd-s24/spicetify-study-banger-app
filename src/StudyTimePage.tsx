import React, { useState, useEffect } from 'react';
import styles from './css/app.module.scss';

interface Props {
    onEndStudy: () => void;
    onChangeTheme: () => void; // Ensure this function is properly implemented in the parent component
}

const StudyTimePage: React.FC<Props> = ({ onEndStudy, onChangeTheme }) => {
    const [timer, setTimer] = useState<number>(25 * 60); // Start with a 25-minute timer
    const [isRunning, setIsRunning] = useState<boolean>(true); // Initially set to true
    const [isPaused, setIsPaused] = useState<boolean>(true); // Initially paused

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!isPaused) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        setIsRunning((prevIsRunning) => {
                            // Toggle between work and break
                            setTimer(prevIsRunning ? 5 * 60 : 25 * 60); // Set timer for break or work period
                            setIsPaused(true); // Pause timer when period ends
                            clearInterval(interval); // Important to stop the interval
                            return !prevIsRunning;
                        });
                        return isRunning ? 5 * 60 : 25 * 60;
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

    const playlists = [
        { id: 1, title: "chill lofi study beats", description: "The perfect study beats. Find your focus, crush yo..." },
        { id: 2, title: "chill lofi study beats", description: "The perfect study beats. Find your focus, crush yo..." },
        { id: 3, title: "chill lofi study beats", description: "The perfect study beats. Find your focus, crush yo..." },
    ];

    return (
        <>
            <div className={styles.hero}>

                <button className={`${styles.button} ${styles.border_green}`} onClick={onEndStudy}>
                    <span className={`${styles.circle} ${styles.green}`} />{"End Study"}
                </button>
                <button className={`${styles.button} ${styles.border_green}`} onClick={onChangeTheme}>
                    <span className={`${styles.circle} ${styles.green}`} />{"Change Theme"}
                </button>

                <h1 className='bigTitle'>Study Sessions with Study Banger</h1>
            </div>
            <div className={styles.container1}>
                <div className={styles.typetimer}>{isRunning ? 'Work' : 'Break'} Time!</div>
                <div className={styles.timer}>{formatTime(timer)}</div>
                <button className={styles.button1} onClick={toggleTimer}>
                    {isPaused ? 'Start' : 'Pause'}
                </button>
                <button className={styles.button1} onClick={() => {
                    setIsRunning(!isRunning);
                    setIsPaused(true);
                    setTimer(isRunning ? 5 * 60 : 25 * 60);
                }}>
                    Switch to {isRunning ? 'Break' : 'Work'}
                </button>
            </div>
            <div className={styles.container}>
                <div className={styles.title}>{isRunning ? 'Work' : 'Break'} Music</div>
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
