import Loadable from 'react-loadable'
import React from 'react'


export default Loadable({
  loader: () => import('./Login'),
  loading: () => <div>loading...</div>
});
