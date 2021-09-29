import React from 'react';
import { useParams } from 'react-router-dom';

import './NewsItem.css';


function Index() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="App">
      {id}
    </div>
  );
}

export default Index;
