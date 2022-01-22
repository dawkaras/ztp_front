/**
 *
 * ReviewPage
 *
 */

import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import Button from 'app/components/Button';
import { useHistory, useParams } from 'react-router-dom';
import uuid from 'react-uuid';

export const MovieReviewPage = props => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { id } = useParams<{ id: string }>();
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({
    id: '0',
    rate: 0,
    review: '',
    userId: '',
    movieId: '',
    userName: '',
  });
  useEffect(() => {
    if (user.role == null) history.push('/login');
    if (id !== '0') {
      let requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
      };
      fetch('https://localhost:5001/movieReview/' + id, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(result => {
              setReview(result);
              setRate(result.rate);
              setLoading(false);
            });
          } else {
            response.json().then(result => alert(result.message));
          }
        })
        .catch(error => {
          alert(error);
          setLoading(false);
        });
    } else setLoading(false);
  }, [history, id, user.role, user.token]);
  const save = event => {
    event.preventDefault();
    if (id === '0') review.id = uuid();
    review.rate = rate;
    review.review = event.target.elements.formReview.value;
    review.movieId = props.location.state.movieId;
    let requestOptions = {
      method: id === '0' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify(review),
    };
    fetch('https://localhost:5001/movieReview', requestOptions)
      .then(response => {
        if (response.ok) {
          if (id === '0') history.push('/movie/' + review.movieId);
        } else
          response
            .json()
            .then(result => alert(result.message))
            .catch(err =>
              alert(
                'Nie możesz edytować komentarza dodanego przez innego użytkownika!'
              )
            );
      })
      .catch(error => {
        alert(error);
      });
  };
  return !loading ? (
    <Container fluid>
      <Row className="justify-content-md-center" style={{ marginTop: '60px' }}>
        <Col lg={6}>
          <Form.Label>Review for {props.location.state.title}.</Form.Label>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg={6}>
          <Form style={{ marginTop: '10px' }} onSubmit={save}>
            <Form.Group className="mb-3" controlId="formRate">
              <Form.Label>Rate:</Form.Label>

              <ReactStars
                count={5}
                size={32}
                activeColor="#ffd700"
                edit={localStorage.getItem('user') == null ? false : true}
                value={rate}
                onChange={value => setRate(value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formReview">
              <Form.Label>Review:</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                disabled={localStorage.getItem('user') == null ? true : false}
                defaultValue={review.review}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formUser"
              style={{ visibility: id !== '0' ? 'visible' : 'hidden' }}
            >
              <Form.Label>Added by: {review.userName}</Form.Label>
            </Form.Group>
            <div
              style={{
                visibility:
                  localStorage.getItem('user') == null ? 'hidden' : 'visible',
              }}
            >
              <Button text="Add" />
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  ) : (
    <div></div>
  );
};
