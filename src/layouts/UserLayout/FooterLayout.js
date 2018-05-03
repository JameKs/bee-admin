import React, { PureComponent } from 'react';
import styles from './styles/FooterLayout.less';

class FooterLayout extends PureComponent {
  render() {
    const { links, copyright } = this.props;
    return (
      <div className={styles.footer}>
        {
          links && (
            <div className={styles.links}>
              {links.map(link => (
                <a
                  key={link.title}
                  target={link.blankTarget ? '_blank' : '_self'}
                  href={link.href}
                >
                  {link.title}
                </a>
              ))}
            </div>
          )
        }
        {copyright && <div className={styles.copyright}>{copyright}</div>}
      </div>
    );
  }
}

export default FooterLayout;
