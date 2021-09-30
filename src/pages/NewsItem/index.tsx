import React from 'react';
import { useParams } from 'react-router-dom';

import './NewsItem.css';
import { useTitle } from '../../app/hooks';


function Index() {
  const { id } = useParams<{ id: string }>();
  useTitle(() => `title ${id}`, [id]);

  return (
    <div className="App">
      {id}
    </div>
  );
}

export default Index;
