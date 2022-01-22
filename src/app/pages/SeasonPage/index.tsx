import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Form, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'app/components/Button';
import uuid from 'react-uuid';

export function SeasonPage() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [series, setSeries] = useState([]);
  const [season, setSeason] = useState({
    id: '0',
    seriesTitle: '',
    number: '',
    description: '',
    reviewsCount: 0,
    avgRate: 0,
    seriesId: '0',
    reviews: [],
    episodes: [],
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
    if (id !== '0') {
      fetch('https://localhost:5001/season/' + id, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(result => {
              setSeason(result);
            });
          } else {
            response.json().then(result => alert(result.message));
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  }, [history, id, user.role, user.token]);
  const deleteEpisode = id => {
    let requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    fetch('https://localhost:5001/episode?id=' + id, requestOptions)
      .then(response => {
        if (response.ok) {
          let requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + user.token,
            },
          };
          fetch('https://localhost:5001/episode/' + id, requestOptions)
            .then(response => {
              if (response.ok) {
                response.json().then(result => {
                  setSeason(result);
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
          fetch('https://localhost:5001/episode/' + id, requestOptions)
            .then(response => {
              if (response.ok) {
                response.json().then(result => {
                  setSeason(result);
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
  const renderTableData = () => {
    return season.episodes.map((movie, index) => {
      const { id, title, avgRate, reviewsCount } = movie;
      return (
        <tr
          key={id}
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/episode/' + id)}
        >
          <td>{index + 1}</td>
          <td>{title}</td>
          <td>{avgRate}</td>
          <td>{reviewsCount}</td>
          <td
            style={{ visibility: user.role === 'admin' ? 'visible' : 'hidden' }}
          >
            <Button text="Delete" onClick={() => deleteEpisode(id)} />
          </td>
        </tr>
      );
    });
  };
  const renderCommentsTableData = () => {
    return season.reviews.map((item, index) => {
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
    if (id === '0') season.id = uuid();
    season.description = event.target.elements.formDescription.value;
    season.seriesId = event.target.elements.formSeries.value;
    let requestOptions = {
      method: id === '0' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify(season),
    };
    fetch('https://localhost:5001/season', requestOptions)
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
  return (
    <>
      <Helmet>
        <title>Season</title>
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
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formTitle"
              style={{ visibility: id !== '0' ? 'visible' : 'hidden' }}
            >
              <Form.Label column sm="2">
                Number
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  defaultValue={season.number}
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formSeries">
              <Form.Label column sm="2">
                Series
              </Form.Label>
              <Col sm="8">
                <Form.Select
                  defaultValue={season.seriesId}
                  disabled={user.role !== 'admin' ? true : false}
                >
                  {series.map((item, index) => {
                    const { id, title } = item;
                    return <option key={id} value={id} label={title} />;
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
                  defaultValue={season.description}
                  readOnly={user.role === 'admin' ? false : true}
                  rows={6}
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
            {season.avgRate.toFixed(1)}
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
            Reviews count: {season.reviewsCount}
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
            <Tab
              eventKey="episodes"
              title="Episodes"
              style={{ visibility: id !== '0' ? 'visible' : 'hidden' }}
            >
              <Table>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Rate</th>
                    <th>Reviews</th>
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
                  {renderTableData()}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
              <Table>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Rate</th>
                    <th>Review</th>
                    <th>User</th>
                    <th
                      style={{
                        visibility:
                          user.role === 'admin' ? 'visible' : 'hidden',
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
                history.push('/seasonReview/0', {
                  series: season.seriesTitle,
                  number: season.number,
                  seasonId: season.id,
                })
              }
            />
          </div>
        </div>
      </Container>
    </>
  );
}
