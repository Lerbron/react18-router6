import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./Graph'),
  loading: () => <div>loading...</div>
});
