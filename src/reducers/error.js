import React from 'react';
import { SET_ERROR } from 'constants/reducers';
import { Modal } from 'antd';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_ERROR: {
      const message = action.payload.message;
      const index = message.indexOf('#');
      const errCode = message.substr(0, index);
      const errMsg = message.substr(index + 1);
      Modal.error({
        title: (
          <div>
            错误提示
          </div>
        ),
        content: (
          <div style={{ marginTop: 16 }}>
            错误码：<span style={{ color: '#f5222d' }}>{errCode}</span>
            <br />
            错误信息：<span style={{ color: '#f5222d' }}>{errMsg}</span>
          </div>
        ),
      });
      // eslint-disable-next-line no-console
      console.error(action.payload);
      return state;
    }
    default:
      return state;
  }
}
