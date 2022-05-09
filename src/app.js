import { useState } from "react";
import Header from "./components/header";

import initialEmails from "./data/emails";

import "./styles/app.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  console.log(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const toggleRead = (theEmail) => {
    setEmails(
      emails.map((email) => {
        if (email === theEmail) {
          return { ...email, read: !email.read };
        } else {
          return email;
        }
      })
    );
  };

  const toggleStar = (theEmail) => {
    setEmails(
      emails.map((email) => {
        if (email === theEmail) {
          return { ...email, starred: !email.starred };
        } else {
          return email;
        }
      })
    );
  };

  const emailsToDisplay = emails.filter((email) => {
    if (hideRead && email.read === false) {
      return false;
    } else {
      return true;
    }
  });

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              onChange={() => setHideRead(!hideRead)}
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emailsToDisplay.map((email) => {
          const { id, sender, title, starred, read } = email;
          return (
            <li key={id} className={read ? "email read" : "email unread"}>
              <div className="select">
                <input
                  onChange={() => toggleRead(email)}
                  className="select-checkbox"
                  type="checkbox"
                  checked={read}
                />
              </div>
              <div className="star">
                <input
                  onChange={() => toggleStar(email)}
                  className="star-checkbox"
                  type="checkbox"
                  checked={starred}
                />
              </div>
              <div className="sender">{sender}</div>
              <div className="title">{title}</div>
            </li>
          );
        })}
      </main>
    </div>
  );
}

// <li key={id} className={read ? "email read" : "email unread"}

export default App;
