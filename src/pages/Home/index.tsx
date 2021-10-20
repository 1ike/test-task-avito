import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Spinner } from 'react-bootstrap';

import classNames from 'classnames';
import styles from './Home.module.scss';
import { useTitle } from '../../app/hooks';
import { useGetNewStoriesQuery } from '../../features/story';
import Layout from '../../components/Layout';
import DelimiterVertical from '../../components/DelimiterVertical';
import NavbarComponent from './NavbarComponent';
import { POLLING_INTERVAL } from '../../config';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const stories = [
//   {
//     by: 'dhouston',
//     descendants: 71,
//     id: 8863,
//     kids: [8952, 9224],
//     score: 111,
//     time: 1175714200,
//     title: 'My YC app: Dropbox - Throw away your USB drive',
//     type: 'story',
//     url: 'http://www.getdropbox.com/u/2/screencast.html',
//   },
//   {
//     by: 'dhouston',
//     descendants: 71,
//     id: 8862,
//     kids: [8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 9125, 8998, 8934, 8876],
//     score: 101,
//     time: 1175714200,
//     title: 'Lorem ipsum dolor sit amet.',
//     type: 'story',
//     url: 'http://www.getdropbox.com/u/2/screencast.html',
//   },
//   {
//     by: 'dhouston',
//     descendants: 71,
//     id: 8861,
//     kids: [8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8876],
//     score: 11,
//     time: 1175714200,
//     title: 'Architecto asperiores sed, suscipit. My YC app: Dropbox - Throw away your USB drive',
//     type: 'story',
//     url: 'http://www.getdropbox.com/u/2/screencast.html',
//   },
//   {
//     by: 'dhouston',
//     descendants: 71,
//     id: 8860,
//     kids: [8952, 9224, 8917, 8884],
//     score: 1111,
//     time: 1175714200,
//     title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
//     type: 'story',
//     url: 'http://www.getdropbox.com/u/2/screencast.html',
//   }, {
//     by: 'dhouston',
//     descendants: 71,
//     id: 8859,
//     kids: [9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876],
//     score: 100,
//     time: 1175714200,
//     title: 'Throw away your USB drive',
//     type: 'story',
//     url: 'http://www.getdropbox.com/u/2/screencast.html',
//   },
// ];

function Index() {
  useTitle('Hottest stories');

  const {
    data: stories = [], refetch, isFetching, isLoading,
  } = useGetNewStoriesQuery(undefined, {
    pollingInterval: POLLING_INTERVAL,
  });
  console.log(stories);

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
          : stories.map((story) => (
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
      </Container>
    </Layout>
  );
}

export default Index;
