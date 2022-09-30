import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./List'),
  loading: () => <div>loading...</div>
});
