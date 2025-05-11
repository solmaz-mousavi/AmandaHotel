import { useContext } from 'react'
import { StaticDataContext } from '../../../context/StaticContext';
import Aos from '../../global/aos/Aos';
import "./intro.scss";

export default function Intro() {
  const { staticData } = useContext(StaticDataContext);
  return (
    <div className="intro-wrapper">
      {staticData?.intro &&
        staticData.intro.map((item) => (
          <Aos
            aosStyle="fadeInUp"
            once={true}
            key={item.id}
          >
            <div className="intro-item">
              <img src={item.image} alt={item.title} className="intro-image" />
              <div className="intro-details">
                <h3 className="intro-title">{item.title}</h3>
                <p className="intro-desc">{item.desc}</p>
              </div>
            </div>
          </Aos>
        ))}
    </div>
  );
}
