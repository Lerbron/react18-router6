import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./NotFound'),
  loading: () => <div>loading...</div>
});
