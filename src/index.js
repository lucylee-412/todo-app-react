import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './components/App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        {/* <Route path=":id" element={<Task />} />
        <Route path="/status/:status" element={<Status />} />
        <Route path="/priority/:priority" element={<Priority />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);