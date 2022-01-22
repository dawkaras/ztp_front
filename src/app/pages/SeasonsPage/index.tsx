import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Button from 'app/components/Button';

export function SeasonsPage() {
  const history = useHistory();
  const [seasons, setSeasons] = useState<season[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  class season {
    constructor(
      public id: number,
      public seriesTitle: string,
      public number: string,
      public avgRate: number,
      public reviewsCount: number,
      public episodesCount: number
    ) {}
  }
  useEffect(() => {
    if (user.role == null) history.push('/login');
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    fetch('https://localhost:5001/season', requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            setSeasons(result);
          });
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        alert(error);
      });
  }, [history, user.role, user.token]);
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
          fetch('https://localhost:5001/season', requestOptions)
            .then(response => {
              if (response.ok) {
                response.json().then(result => {
                  setSeasons(result);
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
    return seasons.map((item, index) => {
      const { id, seriesTitle, number, avgRate, reviewsCount, episodesCount } =
        item;
      return (
        <tr
          key={id}
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/season/' + id)}
        >
          <td>{index + 1}</td>
          <td>{seriesTitle}</td>
          <td>{number}</td>
          <td>{avgRate}</td>
          <td>{reviewsCount}</td>
          <td>{episodesCount}</td>
          <td
            style={{ visibility: user.role === 'admin' ? 'visible' : 'hidden' }}
            onClick={event => event.stopPropagation()}
          >
            <Button
              text="Delete"
              onClick={() => {
                deleteSeason(id);
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
        <title>Seasons</title>
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
            <Button
              text="Add season"
              onClick={() => history.push('/season/0')}
            />
          </div>
        </div>
        <Table style={{ marginTop: '150px', marginBottom: '100px' }}>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Series</th>
              <th>Number</th>
              <th>Rate</th>
              <th>Reviews</th>
              <th>Episodes</th>
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
