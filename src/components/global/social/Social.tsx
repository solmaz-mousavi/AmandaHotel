import { useContext } from 'react'
import { StaticDataContext } from '../../../context/StaticContext';
import Icon from '../icon/Icon';
import "./social.scss";

export default function Social() {
	  const { staticData } = useContext(StaticDataContext);
	return (
		    <div className="social-container">
      {staticData?.social &&
        staticData.social.map((item) => (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            key={item.id}
          >
            <Icon name={item.iconName} className="social-icon" />
          </a>
        ))}
    </div>
	)
}
