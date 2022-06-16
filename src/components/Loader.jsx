import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import FadeIn from './FadeIn';

export default function Loader({ height = '100vh', showQuotes = false }) {
  const [quotes, setQuotes] = useState({});
  const [progress, setProgress] = useState(0);

  async function getQuotes() {
    try {
      const { data } = await axios.get('https://type.fit/api/quotes');
      const item = data[Math.floor(Math.random() * data.length)];
      setQuotes(item);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuotes();
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center px-md-5"
        style={{ height: height }}
      >
        <div style={{ width: '100vw' }}>
          {showQuotes && (
            <FadeIn>
              <div className="text-center mb-5">
                <h4 className="mb-2 loader-quote fst-italic">{quotes.text}</h4>
                <p className="fw-light">- {quotes.author}</p>
              </div>
            </FadeIn>
          )}
          <LinearProgress variant="determinate" value={progress} />
        </div>
      </div>
    </>
  );
}
