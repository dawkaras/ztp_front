import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Button from 'app/components/Button';

export function MoviesPage() {
  const history = useHistory();
  const [movies, setMovies] = useState<movie[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  class movie {
    constructor(
      public id: number,
      public title: string,
      public avgRate: number,
      public reviewsCount: number
    ) {}
  }
  const getMovies = () => {
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    fetch('https://localhost:5001/movie', requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            setMovies(result);
          });
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  useEffect(() => {
    getMovies();
    if (user.role == null) history.push('/login');
  }, [history, user.role, user.token]);
  const deleteMovie = id => {
    let requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    fetch('https://localhost:5001/movie?id=' + id, requestOptions)
      .then(response => {
        if (response.ok) getMovies();
        else
          response
            .json()
            .then(result =>
              alert(
                result.message +
                  '\n' +
                  'Pamiętaj, aby najpierw usunąć wszystkie recenzje filmu!'
              )
            );
      })
      .catch(error => {
        alert(error);
      });
  };
  const renderTableData = () => {
    return movies.map((movie, index) => {
      const { id, title, avgRate, reviewsCount } = movie;
      return (
        <tr
          key={id}
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/movie/' + id)}
        >
          <td>{index + 1}</td>
          <td>{title}</td>
          <td>{avgRate}</td>
          <td>{reviewsCount}</td>
          <td
            style={{ visibility: user.role === 'admin' ? 'visible' : 'hidden' }}
            onClick={event => event.stopPropagation()}
          >
            <Button
              text="Delete"
              onClick={() => {
                deleteMovie(id);
              }}
            />
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <Helmet>
        <title>Movies</title>
        <meta name="description" content="TEMPLATE" />
      </Helmet>
      <Container fluid>
        <div
          style={{
            height: '75px',
            background: 'white',
            width: '100%',
            top: '56px',
            position: 'fixed',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '50px',
              top: '5px',
              visibility: user.role === 'admin' ? 'visible' : 'hidden',
            }}
          >
            <Button text="Add movie" onClick={() => history.push('/movie/0')} />
          </div>
        </div>
        <Table style={{ marginTop: '150px', marginBottom: '100px' }}>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Rate</th>
              <th>Reviews</th>
              <th
                style={{
                  visibility: user.role === 'admin' ? 'visible' : 'hidden',
                }}
              >
                Delete
              </th>
            </tr>
            {renderTableData()}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
