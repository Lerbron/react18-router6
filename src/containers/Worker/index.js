import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./Worker'),
  loading: () => <div>loading...</div>
});
