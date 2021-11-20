import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Button from 'app/components/Button';

import { Container, Row, Col } from 'react-bootstrap';

export function DashboardPage() {
  const [rate, setRate] = useState(1);
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    fetch('http://api.nbp.pl/api/exchangerates/rates/A/EUR/').then(data => {
      data.json().then(data => {
        setRate(data.rates[0].mid);
      });
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="TEMPLATE" />
      </Helmet>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col lg={4}>
            Licznik: {count} euro to {count * rate} zl
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={2}>
            <Button onClick={() => setCount(initialCount)} text="Zresetuj" />
          </Col>
          <Col lg={2}>
            <Button
              onClick={() => setCount(prevCount => prevCount - 1)}
              text="-"
            />
          </Col>
          <Col lg={2}>
            <Button
              onClick={() => setCount(prevCount => prevCount + 1)}
              text="+"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
