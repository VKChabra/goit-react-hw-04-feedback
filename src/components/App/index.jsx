import { useState, useEffect } from 'react';
import Section from 'components/Section';
import Notification from 'components/Notification';
import FeedbackOptions from 'components/FeedbackOptions';
import Statistics from 'components/Statistics';
import styles from './app.module.css';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackState = { good, neutral, bad };

  const onLeaveFeedback = e => {
    const name = e.target.name;
    switch (name) {
      case 'good':
        return setGood(prevState => prevState + 1);
      case 'neutral':
        return setNeutral(prevState => prevState + 1);
      case 'bad':
        return setBad(prevState => prevState + 1);
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercent = () => {
    return Math.round((good * 100) / countTotalFeedback());
  };

  useEffect(() => {
    countTotalFeedback();
    countPositiveFeedbackPercent();
  });

  return (
    <div className={styles.wrapper}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedbackState)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercent()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
