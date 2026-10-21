import { Link } from 'react-router-dom';
import { Page } from '../components/Motion';

const NotFound = () => (
  <Page className="flex min-h-[70vh] flex-col items-center justify-center text-center">
    <p className="font-mono text-sm text-ink-muted">404</p>
    <h1 className="mt-4 text-5xl sm:text-6xl">
      This page went <em className="text-accent">off the track</em>
    </h1>
    <p className="mt-4 text-ink-muted">The link may be old or mistyped.</p>
    <Link to="/" className="btn-primary mt-9">
      Back to the pits
    </Link>
  </Page>
);

export default NotFound;
