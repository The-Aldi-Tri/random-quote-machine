import { useState, useEffect } from "react";
import "./Quote.css";

function Quote() {
  function getQuote() {
    fetch("https://api.quotable.io/quotes/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuoteText(data[0].content);
        setQuoteAuthor(data[0].author);
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  }
  
  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];

  const [quoteText, setQuoteText] = useState();
  const [quoteAuthor, setQuoteAuthor] = useState(() => getQuote());
  const [color, setColor] = useState("#333");

  useEffect(() => {
    (() => {
      document.body.style.color = color;
      document.body.style.backgroundColor = color;
    })()
  }, [quoteText, quoteAuthor, color]);

  return (
    <div id="wrapper" style={{ backgroundColor: color }}>
      <div id="quote-box">
        <div className="quote-text">
          <i className="fa fa-quote-left"> </i>
          <span id="text">{quoteText || "Loading"}</span>
        </div>
        <div className="quote-author">
          - <span id="author">{quoteAuthor || "Loading"}</span>
        </div>
        <div className="buttons">
          <a
            style={{ backgroundColor: color }}
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_top"
            href="twitter.com/intent/tweet"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <button
            style={{ backgroundColor: color }}
            onClick={() => {
              getQuote();
              setColor(colors[Math.floor(Math.random() * colors.length)]);
            }}
            className="button"
            id="new-quote"
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quote;
