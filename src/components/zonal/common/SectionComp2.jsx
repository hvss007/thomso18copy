import React  from 'react';
import '../src/css/SecondComp2.css'; 
class SectionComp2 extends React.Component {
    render() {
        return (
                <div className={`zonal-common-comp2-head ${this.props.nameofclass}`}>
                    <div className="zonals-comp2-inside">
                        {this.props.dataOptions}
                    </div>
                </div>
        );
    }
}

export default SectionComp2;
