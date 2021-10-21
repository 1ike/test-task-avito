import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Card, Container, Spinner,
} from 'react-bootstrap';

import classNames from 'classnames';
import styles from './Home.module.scss';
import { useTitle } from '../../app/hooks';
import { useGetNewStoriesQuery } from '../../features/story';
import Layout from '../../components/Layout';
import DelimiterVertical from '../../components/DelimiterVertical';
import NavbarComponent from './NavbarComponent';
import { POLLING_INTERVAL, STORIES_QTY_PER_PAGE, STORIES_QTY } from '../../app/config';


function Index() {
  useTitle('Hottest stories');

  const [displayedQty, setDisplayedQty] = useState(STORIES_QTY_PER_PAGE);

  const {
    data: stories = [], refetch, isFetching, isLoading,
  } = useGetNewStoriesQuery(undefined, {
    pollingInterval: POLLING_INTERVAL,
  });
  console.log(stories);

  const displayedStories = React.useMemo(
    () => stories.slice(0, displayedQty),
    [displayedQty, stories],
  );

  const showMore = useCallback(
    () => setDisplayedQty((prev) => prev + STORIES_QTY_PER_PAGE),
    [],
  );

  const NavbarComponentWrapper = () => (
    <NavbarComponent onClick={refetch} isFetching={isFetching} />
  );

  return (
    <Layout navbarComponent={NavbarComponentWrapper}>
      <Container
        className={classNames(styles.content, { [styles['content--loading']]: isLoading })}
      >
        { isLoading
          ? <Spinner animation="border" variant="primary" />
          : (
            <>
              {displayedStories.map((story) => (
                <Link
                  key={story.id}
                  to={`/${story.id}`}
                  className="text-start text-decoration-none d-block mb-2"
                >
                  <Card bg="light">
                    <Card.Body>
                      <Card.Title>{story.title}</Card.Title>
                      <Card.Subtitle>
                        {`${story.score} points`}
                        <DelimiterVertical />
                        {story.by}
                        <DelimiterVertical />
                        {(new Date(story.time)).toLocaleString('en', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                        <DelimiterVertical />
                        {story.kids && <span>Comments</span>}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
              {displayedQty < STORIES_QTY && (
                <Button
                  variant="outline-primary"
                  onClick={showMore}
                  className="mt-3"
                >
                  Show more
                </Button>
              )}
            </>
          )}
      </Container>
    </Layout>
  );
}

export default Index;
