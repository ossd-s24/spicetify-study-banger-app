import React from 'react';
import styles from './css/app.module.scss';
import ReadyToStudyPage from './ReadyToStudyPage';
import StudyTimePage from './StudyTimePage';
import SpotifyService from './SpotifyService';

class App extends React.Component<{}, { count: number; isStudyTime: boolean; selectedPlaylistId: string | null; }> {
  state = {
    count: 0,
    isStudyTime: false,
    selectedPlaylistId: null,
  };

  toggleStudyTime = () => {
    this.setState((state) => ({
      count: state.count + 1, 
      isStudyTime: !state.isStudyTime,
    }), () => {
      if (this.state.isStudyTime && this.state.selectedPlaylistId) {
        SpotifyService.playPlaylist(this.state.selectedPlaylistId);
      }
    });
  };

  handleSelectPlaylist = (playlistId: string) => {
    this.setState({ selectedPlaylistId: playlistId });
  }

  renderPage = () => {
    const { isStudyTime } = this.state;

    if (isStudyTime) {
      return <StudyTimePage onEndStudy={this.toggleStudyTime} />;
    }

    return <ReadyToStudyPage onStartStudy={this.toggleStudyTime} onSelectPlaylist={this.handleSelectPlaylist} />;
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderPage()}
      </div>
    );
  } 
}

export default App;
