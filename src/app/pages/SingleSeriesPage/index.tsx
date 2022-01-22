import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Form, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'app/components/Button';
import uuid from 'react-uuid';

export function SingleSeriesPage() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [genres, setGenres] = useState([{ id: 0, name: '' }]);
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState({
    id: '0',
    title: '',
    description: '',
    creator: '',
    reviewsCount: -1,
    avgRate: 0,
    reviews: [],
    seasons: [],
    genreId: '2',
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
    fetch('https://localhost:5001/genre/', requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            setGenres(result);
          });
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        alert(error);
      });
    if (id !== '0') {
      fetch('https://localhost:5001/series/' + id, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(result => {
              setSeries(result);
              setLoading(false);
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
  const renderTableData = () => {
    return series.seasons.map((season, index) => {
      const { id, number, avgRate, reviewsCount, episodesCount } = season;
      return (
        <tr
          key={id}
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/season/' + id)}
        >
          <td>{index + 1}</td>
          <td>{number}</td>
          <td>{avgRate}</td>
          <td>{reviewsCount}</td>
          <td>{episodesCount}</td>
          <td
            style={{ visibility: user.role === 'admin' ? 'visible' : 'hidden' }}
            onClick={event => event.stopPropagation()}
          >
            <Button text="Delete" onClick={() => deleteSeason(id)} />
          </td>
        </tr>
      );
    });
  };
  const renderCommentsTableData = () => {
    return series.reviews.map((item, index) => {
      const { id, rate, review, userName } = item;
      return (
        <tr
          key={id}
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/seriesReview/' + id)}
        >
          <td>{index + 1}</td>
          <td>{rate}</td>
          <td>{review}</td>
          <td>{userName}</td>
          <td
            style={{ visibility: user.role === 'admin' ? 'visible' : 'hidden' }}
            onClick={event => event.stopPropagation()}
          >
            <Button text="Delete" onClick={() => deleteReview(id)} />
          </td>
        </tr>
      );
    });
  };
  const save = event => {
    event.preventDefault();
    if (id === '0') series.id = uuid();
    series.title = event.target.elements.formTitle.value;
    series.creator = event.target.elements.formDirector.value;
    series.description = event.target.elements.formDescription.value;
    series.genreId = event.target.elements.formGenre.value;
    let requestOptions = {
      method: id === '0' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify(series),
    };
    setLoading(true);
    fetch('https://localhost:5001/series', requestOptions)
      .then(response => {
        if (response.ok) {
          event.target.reset();
          setLoading(false);
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        setLoading(false);
        alert(error);
      });
  };
  const deleteSeason = id => {
    let requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    fetch('https://localhost:5001/season?id=' + id, requestOptions)
      .then(response => {
        if (response.ok) {
          let requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + user.token,
            },
          };
          fetch('https://localhost:5001/series/' + id, requestOptions)
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
    fetch('https://localhost:5001/seasonReview?id=' + id, requestOptions)
      .then(response => {
        if (response.ok) {
          let requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + user.token,
            },
          };
          fetch('https://localhost:5001/series/' + id, requestOptions)
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
        <title>Series</title>
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
                  defaultValue={series.title}
                  readOnly={user.role === 'admin' ? false : true}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDirector">
              <Form.Label column sm="2">
                Creator
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  defaultValue={series.creator}
                  readOnly={user.role === 'admin' ? false : true}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGenre">
              <Form.Label column sm="2">
                Genre
              </Form.Label>
              <Col sm="8">
                <Form.Select
                  defaultValue={series.genreId}
                  disabled={user.role !== 'admin' ? true : false}
                >
                  {genres.map((item, index) => {
                    const { id, name } = item;
                    return <option key={id} value={id} label={name} />;
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
                  defaultValue={series.description}
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
            {series.avgRate.toFixed(1)}
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
            Reviews count: {series.reviewsCount}
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
            <Tab eventKey="seasons" title="Seasons">
              <Table style={{ visibility: id !== '0' ? 'visible' : 'hidden' }}>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Number</th>
                    <th>Rate</th>
                    <th>Reviews</th>
                    <th>Episodes</th>
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
                history.push('/seriesReview/0', {
                  title: series.title,
                  seriesId: series.id,
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
