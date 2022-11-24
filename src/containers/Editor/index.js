import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./Editor'),
  loading: () => <div>loading...</div>
});
