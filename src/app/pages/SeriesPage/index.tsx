import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Button from 'app/components/Button';

export function SeriesPage() {
  const history = useHistory();
  const [seriesArr, setSeries] = useState<series[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  class series {
    constructor(
      public id: number,
      public title: string,
      public avgRate: number,
      public reviewsCount: number,
      public seasonsCount: number
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
  }, [history, user.role, user.token]);
  const deleteSeries = id => {
    let requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    fetch('https://localhost:5001/series?id=' + id, requestOptions)
      .then(response => {
        if (response.ok) {
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
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  const renderTableData = () => {
    return seriesArr.map((singleSeries, index) => {
      const { id, title, avgRate, reviewsCount, seasonsCount } = singleSeries;
      return (
        <tr
          key={id}
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/series/' + id)}
        >
          <td>{index + 1}</td>
          <td>{title}</td>
          <td>{avgRate}</td>
          <td>{reviewsCount}</td>
          <td>{seasonsCount}</td>
          <td
            style={{ visibility: user.role === 'admin' ? 'visible' : 'hidden' }}
            onClick={event => event.stopPropagation()}
          >
            <Button
              text="Delete"
              onClick={() => {
                deleteSeries(id);
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
        <title>Series</title>
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
              text="Add series"
              onClick={() => history.push('/series/0')}
            />
          </div>
        </div>
        <Table style={{ marginTop: '150px', marginBottom: '100px' }}>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Rate</th>
              <th>Reviews</th>
              <th>Seasons</th>
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
