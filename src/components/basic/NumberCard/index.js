import React from 'react';
import { Icon, Card } from 'antd';
import CountUp from 'react-countup';
import styles from './styles/NumberCard.less';

function NumberCard({ icon, color, title, number, countUp }) {
  return (
    <Card className={styles.numberCard} bodyStyle={{ padding: 0 }} bordered={false} >
      <Icon className={styles.iconWarp} style={{ color }} type={icon} />
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
            {...countUp || {}}
          />
        </p>
      </div>
    </Card>
  );
}

export default NumberCard;
