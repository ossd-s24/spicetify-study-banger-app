import styles from './css/app.module.scss'
import React from 'react'
import ReadyToStudyPage from './ReadyToStudyPage';
import StudyTimePage from './StudyTimePage';

class App extends React.Component<{}, { count: number; isStudyTime: boolean }> {
  state = {
    count: 0,
    isStudyTime: false,
  };

  toggleStudyTime = () => {
    this.setState((state) => ({
      count: state.count + 1,
      isStudyTime: !state.isStudyTime,
    }));
  };

  renderPage = () => {
    const { isStudyTime } = this.state;

    if (isStudyTime) {
      return <StudyTimePage onEndStudy={() => {
        this.toggleStudyTime();
      }} />;
    }

    return <ReadyToStudyPage onStartStudy={() => {
      this.toggleStudyTime();
    }} />;
  }

  render() {



    return <>
      {
        this.renderPage()
      }
    </>
  }
}

export default App;
