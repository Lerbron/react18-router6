import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./Page1'),
  loading: () => <div>loading...</div>
});
