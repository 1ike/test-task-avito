import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Card, Container, Spinner,
} from 'react-bootstrap';

import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';
import { useTitle, useAppDispatch } from '../../app/hooks';
import { useGetNewStoriesQuery } from '../../features/story';
import Layout from '../../components/Layout';
import DelimiterVertical from '../../components/DelimiterVertical';
import NavbarComponent from './NavbarComponent';
import { POLLING_INTERVAL, STORIES_QTY } from '../../app/config';
import { addPrefixTo, formatDate } from '../../app/lib';
import { selectNumberOfDisplayedStories, increaseNumberOfDisplayedStories } from '../../features/numberOfDisplayedStories';


function Index() {
  useTitle('Hottest stories');

  const displayedQty = useSelector(selectNumberOfDisplayedStories);

  const {
    data: stories = [], refetch, isFetching, isLoading,
  } = useGetNewStoriesQuery(undefined, {
    pollingInterval: POLLING_INTERVAL,
  });

  const displayedStories = React.useMemo(
    () => stories.slice(0, displayedQty),
    [displayedQty, stories],
  );

  const dispatch = useAppDispatch();
  const showMore = useCallback(
    () => dispatch(increaseNumberOfDisplayedStories()),
    [dispatch],
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
                  to={addPrefixTo(`/${story.id}`)}
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
                        {formatDate(story.time)}
                        {story.kids && (
                          <>
                            <DelimiterVertical />
                            <span>Comments</span>
                          </>
                        )}
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
