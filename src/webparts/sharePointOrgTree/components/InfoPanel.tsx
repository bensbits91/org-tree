import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import TreeItem from './TreeItem';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import * as moment from 'moment';


import './InfoPanel.module.css';

// import { Image } from 'office-ui-fabric-react/lib/Image';
const emailIcon: IIconProps = { iconName: 'Mail' };
const phoneIcon: IIconProps = { iconName: 'Phone' };
const cellIcon: IIconProps = { iconName: 'CellPhone' };
const bdayIcon: IIconProps = { iconName: 'BirthdayCake' };
const hireIcon: IIconProps = { iconName: 'AddGroup' };
const mgrIcon: IIconProps = { iconName: 'People' };
const reportsIcon: IIconProps = { iconName: 'Org' };
const mapIcon: IIconProps = { iconName: 'MapPin' };


const mcc = 'color:black;background-color:lightgray;';

export interface InfoPanelProps {
    showPanel: boolean;
    handler: any;
    data: any;
}

// export interface InfoPanelState {
//     showPanel: boolean;
// }

class InfoPanel extends React.Component<InfoPanelProps, {}> {
    constructor(props: InfoPanelProps) {
        super(props);
        // this.state = { :  };
    }

    public componentDidMount() {
        console.log('%c : InfoPanel -> componentDidMount -> this.props', mcc, this.props);
    }

    public render() {
        const { data } = this.props;
        const kidCount = data.children.length || 0;

        const el_details_1 =
            <TreeItem
                name={data.name}
                id={data.id}
                // toggled={false}

                // location={data.location}
                // email={data.email}
                // dob={data.dob}
                // phone={data.phone}
                // cell={data.cell}
                picture={data.picture.large}
                // nat={data.nat}
                title={data.title}
                department={data.department}

                // hasKids={data.children && data.children.length} // REPLACE WITH KIDCOUNT ???????????????????????????????????????????????????????????????????????????????????????????????
                // kidCount={kidCount}
                // kidType={kidType}
                // handler={_handler}
                parentElement='infoPanel'
                presence={data.presence}
            />;


        const el_details_2 = <>
            <div>
                <ActionButton iconProps={emailIcon}>
                    {data.email}
                </ActionButton>
            </div>
            <div>
                <ActionButton iconProps={phoneIcon}>
                    {data.phone}
                </ActionButton>
            </div>
            <div>
                <ActionButton iconProps={cellIcon}>
                    {data.cell}
                </ActionButton>
            </div>
            <div>
                <ActionButton iconProps={bdayIcon} disabled>
                    Birthday: {moment(data.dob.date).format('MMMM Do')}
                </ActionButton>
            </div>
            <div>
                <ActionButton iconProps={hireIcon} disabled>
                    Hired: {moment(data.hiredate).format('MMMM Do YYYY')}
                </ActionButton>
            </div>
            {data.parentId &&
                <div>
                    <ActionButton iconProps={mgrIcon} disabled>
                        Supervisor: {data.parentId}
                    </ActionButton>
                </div>
            }
            <div>
                <ActionButton iconProps={reportsIcon} disabled>
                    Supervisees: {data.children.length}
                </ActionButton>
            </div>
        </>;

        const el_details_3 = <>
            <div>
                <ActionButton iconProps={mapIcon} disabled>
                    Office: {data.location.street.number + ' ' + data.location.street.nameObj}
                </ActionButton>
            </div>
            <div className='indentToButton'>
                {data.location.city + ', ' + data.location.state + ', ' + data.location.country + '  ' + data.location.postcode}
            </div>
        </>;


        return (
            <Panel
                isOpen={this.props.showPanel}
                // headerText={data.name}
                closeButtonAriaLabel='Close'
                isLightDismiss={true}
                onDismiss={() => {
                    this.props.handler();
                }}
                type={PanelType.custom}
                customWidth='800px'
                styles={{
                    content: { paddingRight: '0!important', paddingLeft: '0!important' }
                }}
            >
                {el_details_1}
                {el_details_2}
                {el_details_3}
            </Panel>
        );
    }
}


export default InfoPanel;