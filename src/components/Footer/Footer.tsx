import React from 'react';

// @ts-ignore
import ElasticSearchLogo from '../../assets/images/elastic-elasticsearch-logo.png';
// @ts-ignore
import KibanaLogo from '../../assets/images/elastic-kibana-logo.png';
// @ts-ignore
import LogstashLogo from '../../assets/images/elastic-logstash-logo.png';
import { EuiHealth } from '@elastic/eui';
import { Elk, Status } from '../../types';
import './Footer.scss';
import { Link, useLocation } from 'react-router-dom';
import { ConfigService } from '../../services/ConfigService';

interface FooterProps {
  eStatus: Status;
  lStatus: Status;
  kStatus: Status;
}

interface MenuItem {
  item: Elk;
  logo: any;
  status: Status
}

export function Footer({ eStatus, lStatus, kStatus }: FooterProps) {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      item: 'elasticsearch',
      logo: ElasticSearchLogo,
      status: eStatus
    },
    {
      item: 'logstash',
      logo: LogstashLogo,
      status: lStatus
    },
    {
      item: 'kibana',
      logo: KibanaLogo,
      status: kStatus
    }
  ];

  return (
    <div className="Footer">
      {menuItems.map((menuItem) => (
        <Link onClick={() => {}} className={`Menu-item ${`/${menuItem.item}` === location.pathname ? 'isSelected' : ''}`} to={menuItem.item} key={menuItem.item}>
          <img src={menuItem.logo} style={{ width: 35 }} alt={menuItem.item} />
          <div className="Item-state">
            <EuiHealth color={ConfigService.prompt[menuItem.status].color}>
              {ConfigService.prompt[menuItem.status].text}
            </EuiHealth>
          </div>
        </Link>
      ))}
    </div>
  );
}

