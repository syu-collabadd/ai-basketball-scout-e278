import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import PlayerDetail from './pages/PlayerDetail';
import ScoutReport from './pages/ScoutReport';

export default function App() {
  return (
    <BrowserRouter basename="/ai-basketball-scout-e278">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/report" element={<ScoutReport />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
