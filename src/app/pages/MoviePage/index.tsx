import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Form, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'app/components/Button';
import uuid from 'react-uuid';

export function MoviePage() {
  const history = useHistory();
  const [genres, setGenres] = useState([{ id: 0, name: '' }]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({
    id: '0',
    title: '',
    description: '',
    duration: 0,
    director: '',
    reviewsCount: -1,
    avgRate: -1,
    reviews: [],
    genreId: '2',
  });
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const getMovie = id => {
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    fetch('https://localhost:5001/movie/' + id, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            setMovie(result);
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
  };
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
      getMovie(id);
    } else setLoading(false);
  }, [history, id, user.role, user.token]);
  const save = event => {
    event.preventDefault();
    if (id === '0') movie.id = uuid();
    movie.title = event.target.elements.formTitle.value;
    movie.director = event.target.elements.formDirector.value;
    movie.description = event.target.elements.formDescription.value;
    movie.duration = event.target.elements.formDuration.value;
    movie.genreId = event.target.elements.formGenre.value;
    let requestOptions = {
      method: id === '0' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify(movie),
    };
    fetch('https://localhost:5001/movie', requestOptions)
      .then(response => {
        if (response.ok) {
          if (id === '0') history.push('/movies');
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
    fetch('https://localhost:5001/movieReview?id=' + id, requestOptions)
      .then(response => {
        if (response.ok) {
          getMovie(movie.id);
        } else
          response
            .json()
            .then(result => alert(result.message))
            .catch(err =>
              alert(
                'Nie możesz usunąć komentarza dodanego przez innego użytkownika!'
              )
            );
      })
      .catch(error => {
        alert(error);
      });
  };
  const renderTableData = () => {
    return movie.reviews.map((item, index) => {
      const { id, rate, review, userName } = item;
      return (
        <tr
          key={id}
          style={{ cursor: 'pointer' }}
          onClick={() =>
            history.push('/movieReview/' + id, {
              title: movie.title,
              movieId: movie.id,
            })
          }
        >
          <td>{index + 1}</td>
          <td>{rate}</td>
          <td>{review}</td>
          <td>{userName}</td>
          <td
            style={{
              visibility:
                user.role === 'admin' && id !== '0' ? 'visible' : 'hidden',
            }}
            onClick={event => event.stopPropagation()}
          >
            <Button text="Delete" onClick={() => deleteReview(id)} />
          </td>
        </tr>
      );
    });
  };
  return !loading ? (
    <>
      <Helmet>
        <title>Movie</title>
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
                  defaultValue={movie.title}
                  readOnly={user.role === 'admin' ? false : true}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDirector">
              <Form.Label column sm="2">
                Director
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  defaultValue={movie.director}
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
                  defaultValue={movie.genreId}
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
                  defaultValue={movie.description}
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
                  defaultValue={movie.duration}
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
            {movie.avgRate.toFixed(1)}
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
            Reviews count: {movie.reviewsCount}
          </span>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            style={{
              marginTop: '50px',
              visibility: id !== '0' ? 'visible' : 'hidden',
            }}
          >
            <Tab eventKey="reviews" title="Reviews">
              <Table
                style={{
                  marginBottom: '50px',
                  visibility: id !== '0' ? 'visible' : 'hidden',
                }}
              >
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
                  {renderTableData()}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '8%',
              visibility:
                localStorage.getItem('user') !== null && id !== '0'
                  ? 'visible'
                  : 'hidden',
            }}
          >
            <Button
              text="Add review"
              onClick={() =>
                history.push('/movieReview/0', {
                  title: movie.title,
                  movieId: movie.id,
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
