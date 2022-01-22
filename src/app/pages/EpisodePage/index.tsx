import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Form, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'app/components/Button';
import uuid from 'react-uuid';

export function EpisodePage() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [loading, setLoading] = useState(true);
  const [seasonId, setSeasonId] = useState('0');
  const [series, setSeries] = useState([{ id: '1', title: '' }]);
  const [seasons, setSeasons] = useState([
    { id: '0', seriesId: '0', number: '' },
  ]);
  const [episode, setEpisode] = useState({
    id: '0',
    title: '',
    description: '',
    reviewsCount: 0,
    avgRate: 0,
    seasonId: '0',
    seriesId: '0',
    reviews: [],
    duration: 0,
  });
  useEffect(() => {
    if (user.role == null) history.push('/login');
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    fetch('https://localhost:5001/series', requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            setSeries(result);
          });
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        alert(error);
      });
    fetch('https://localhost:5001/season', requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            setSeasons(result);
            setLoading(false);
          });
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        alert(error);
      });
    if (id !== '0') {
      fetch('https://localhost:5001/episode/' + id, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(result => {
              setEpisode(result);
              setSeasonId(episode.seasonId);
              setLoading(false);
              console.log(result)
            });
          } else {
            response.json().then(result => alert(result.message));
          }
        })
        .catch(error => {
          setLoading(false);
          alert(error);
        });
    } else setLoading(false);
  }, [history, id, user.role, user.token]);
  const renderCommentsTableData = () => {
    return episode.reviews.map((item, index) => {
      const { id, rate, review, userName } = item;
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{rate}</td>
          <td>{review}</td>
          <td>{userName}</td>
          <td
            style={{ visibility: user.role === 'admin' ? 'visible' : 'hidden' }}
          >
            <Button text="Delete" onClick={() => deleteReview(id)} />
          </td>
        </tr>
      );
    });
  };
  const save = event => {
    event.preventDefault();
    if (id === '0') episode.id = uuid();
    episode.title = event.target.elements.formTitle.value;
    episode.description = event.target.elements.formDescription.value;
    episode.seasonId = event.target.elements.formSeason.value;
    episode.seriesId = event.target.elements.formSeries.value;
    let requestOptions = {
      method: id === '0' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify(episode),
    };
    fetch('https://localhost:5001/episode', requestOptions)
      .then(response => {
        if (response.ok) {
          event.target.reset();
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  const seasonChange = event => {
    setSeasonId(event.target.value);
  };
  const deleteReview = id => {
    let requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    fetch('https://localhost:5001/episodeReview?id=' + id, requestOptions)
      .then(response => {
        if (response.ok) {
          let requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + user.token,
            },
          };
          fetch('https://localhost:5001/episode/' + episode.id, requestOptions)
            .then(response => {
              if (response.ok) {
                response.json().then(result => {
                  setEpisode(result);
                });
              } else {
                response.json().then(result => alert(result.message));
              }
            })
            .catch(error => {
              alert(error);
            });
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  return !loading ? (
    <>
      <Helmet>
        <title>Episode</title>
        <meta name="description" content="TEMPLATE" />
      </Helmet>
      <Container fluid>
        <div
          style={{
            background: 'white',
            width: '100%',
            margin: '3px',
            padding: '3px',
            textAlign: 'center',
            float: 'left',
            height: '800px',
            position: 'relative',
            marginTop: '50px',
          }}
        >
          <Form onSubmit={save}>
            <Form.Group as={Row} className="mb-3" controlId="formTitle">
              <Form.Label column sm="2">
                Title
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  defaultValue={episode.title}
                  readOnly={user.role === 'admin' ? false : true}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formSeries">
              <Form.Label column sm="2">
                Series
              </Form.Label>
              <Col sm="8">
                <Form.Select
                  defaultValue={episode.seriesId}
                  disabled={user.role !== 'admin' ? true : false}
                >
                  {series.map((item, index) => {
                    const { id, title } = item;
                    return <option key={id} value={id} label={title} />;
                  })}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formSeason">
              <Form.Label column sm="2">
                Season
              </Form.Label>
              <Col sm="8">
                <Form.Select
                  value={seasonId}
                  disabled={user.role !== 'admin' ? true : false}
                  onChange={seasonChange}
                >
                  {seasons
                    .filter(season => season.seriesId === episode.seriesId)
                    .map((item, index) => {
                      const { id, number } = item;
                      return <option key={id} value={id} label={number} />;
                    })}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDescription">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="textarea"
                  defaultValue={episode.description}
                  readOnly={user.role === 'admin' ? false : true}
                  rows={6}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDuration">
              <Form.Label column sm="2">
                Duration
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  defaultValue={episode.duration}
                  readOnly={user.role === 'admin' ? false : true}
                />
              </Col>
            </Form.Group>
            <div
              style={{
                visibility: user.role === 'admin' ? 'visible' : 'hidden',
              }}
            >
              <Button text="Save" />
            </div>
          </Form>
          <span
            style={{
              position: 'absolute',
              top: '5px',
              right: '10%',
              visibility: id !== '0' ? 'visible' : 'hidden',
            }}
          >
            <ReactStars
              count={1}
              size={40}
              activeColor="#ffd700"
              value={1}
              edit={false}
            />
          </span>
          <span
            style={{
              position: 'absolute',
              top: '18px',
              right: '8.5%',
              fontSize: 24,
              visibility: id !== '0' ? 'visible' : 'hidden',
            }}
          >
            {episode.avgRate.toFixed(1)}
          </span>
          <span
            style={{
              position: 'absolute',
              top: '50px',
              right: '6.5%',
              fontSize: 20,
              visibility: id !== '0' ? 'visible' : 'hidden',
            }}
          >
            Reviews count: {episode.reviewsCount}
          </span>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            style={{
              marginTop: '100px',
              visibility: id !== '0' ? 'visible' : 'hidden',
            }}
          >
            <Tab eventKey="reviews" title="Reviews">
              <Table style={{ visibility: id !== '0' ? 'visible' : 'hidden' }}>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Rate</th>
                    <th>Review</th>
                    <th>User</th>
                    <th
                      style={{
                        visibility:
                          user.role === 'admin' && id !== '0'
                            ? 'visible'
                            : 'hidden',
                      }}
                    >
                      Delete
                    </th>
                  </tr>
                  {renderCommentsTableData()}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '8%',
              visibility: id !== '0' ? 'visible' : 'hidden',
            }}
          >
            <Button
              text="Add review"
              onClick={() =>
                history.push('/episodeReview/0', {
                  title: episode.title,
                  seriesTitle: series.find(x => x.id === episode.seriesId)
                    ?.title,
                  seasonNumber: seasons.find(x => x.id === episode.seasonId)
                    ?.number,
                  episodeId: episode.id,
                })
              }
            />
          </div>
        </div>
      </Container>
    </>
  ) : (
    <div></div>
  );
}
