import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./IDB'),
  loading: () => <div>loading...</div>
});
