// context/ReadLaterContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const ReadLaterContext = createContext();

export function ReadLaterProvider({ children }) {
  const [readLaterList, setReadLaterList] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedList = localStorage.getItem('readLaterList');
      if (savedList) {
        setReadLaterList(JSON.parse(savedList));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('readLaterList', JSON.stringify(readLaterList));
    }
  }, [readLaterList]);

  const addToReadLater = (book) => {
    setReadLaterList((prevList) => {
      if (!prevList.some((item) => item.id === book.id)) {
        return [...prevList, book];
      }
      return prevList;
    });
  };

  const removeFromReadLater = (bookId) => {
    setReadLaterList((prevList) => prevList.filter((item) => item.id !== bookId));
  };

  return (
    <ReadLaterContext.Provider value={{ readLaterList, addToReadLater, removeFromReadLater }}>
      {children}
    </ReadLaterContext.Provider>
  );
}

export function useReadLater() {
  return useContext(ReadLaterContext);
}