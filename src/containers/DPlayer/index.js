import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./DPlayer'),
  loading: () => <div>loading...</div>
});
