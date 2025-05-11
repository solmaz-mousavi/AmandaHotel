import Aos from "../../global/aos/Aos";
import "./pageHeader.scss";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="page-header">
      <Aos aosStyle="fadeInDown" once={true}>
        <p className="page-header-desc">{title}</p>
      </Aos>
    </div>
  );
}
