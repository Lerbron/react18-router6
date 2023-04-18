import React, {
  memo,
  useEffect
} from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
import { Modal } from 'antd';


export default memo(props => {
  let {
    when,
    message = 'Are you sure you want to leave without saving?'
  } = props

  const blocker = useBlocker(!!when);

  useEffect(() => {
    const handleLeave = () => {
      if (blocker.state === "blocked") {
        Modal.confirm({
          content: message,
          onOk: () => {
            blocker.proceed?.();
          },
          onCancel: () => {
            blocker.reset?.();
          },
        });
      }
    }

    handleLeave()
  }, [blocker]);

  return null
})