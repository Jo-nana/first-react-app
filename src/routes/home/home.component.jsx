import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  return (
    // Getting categories component
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
