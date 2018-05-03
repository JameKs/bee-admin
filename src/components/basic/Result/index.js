import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import styles from './styles/index.less';

class Result extends PureComponent {
  render() {
    const { type, title, description, extra, actions } = this.props;
    const iconMap = {
      error: <Icon className={styles.error} type="close-circle" />,
      success: <Icon className={styles.success} type="check-circle" />,
    };
    return (
      <div className={styles.result} style={{ marginTop: 48, marginBottom: 16 }}>
        <div className={styles.icon}>{iconMap[type]}</div>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
        {extra && <div className={styles.extra}>{extra}</div>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    );
  }
}

export default Result;
