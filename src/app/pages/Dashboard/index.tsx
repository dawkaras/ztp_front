import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="TEMPLATE" />
      </Helmet>
      <span>Dashboard container</span>
    </>
  );
}
