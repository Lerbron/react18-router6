import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./Request'),
  loading: () => <div>loading...</div>
});
