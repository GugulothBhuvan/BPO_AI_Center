// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import Dashboard from '@/components/layout/dashboard2';
import DataRetrieval from './components/layout/RetrivalPage';
import CustomerServiceUI from './components/layout/CustomerServiceUI';
import CustomerOutputUI from './components/layout/CallerInterfrece/CustomerService';
import CallInterface from './components/layout/CallerInterfrece';
import MeetingScheduler from './components/layout/MeetingScheduler';
import IssueStatusPage from './components/layout/IssueStatusPage';


// Import other pages as needed

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/retrieval" element={<DataRetrieval />} />
          {/* Add more routes as needed */}
          <Route path="/customerservice" element={<CustomerServiceUI />} />
          <Route path="/call-interface" element={<CallInterface />} />
          <Route path="/customeroutput" element={<CustomerOutputUI />} />
          <Route path="/schedule" element={<MeetingScheduler />} />
          <Route path="/issues" element={<IssueStatusPage />} />
          { /*<Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;