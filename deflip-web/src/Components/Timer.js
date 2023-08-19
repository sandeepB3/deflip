import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetTime = targetDate.getTime();
    const timeDifference = targetTime - now;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div>
      <p>
        {timeLeft.days}d:{timeLeft.hours}h:{timeLeft.minutes}m
      </p>
    </div>
  );
};

const Timer = () => {
    const now = new Date().getTime();
    const targetDate = new Date(now + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 15 * 60 * 1000); 

  return (
    <div>
      <CountdownTimer targetDate={targetDate} />
    </div>
  );
};

export default Timer;
