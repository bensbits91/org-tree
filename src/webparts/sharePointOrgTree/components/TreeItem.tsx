import * as React from 'react';
// import { ActivityItem, Icon/* , Link, mergeStyleSets */ } from 'office-ui-fabric-react';
import TreeItemMenu from './TreeItemMenu';
// import { Image } from 'office-ui-fabric-react/lib/Image';

import { IPersonaProps, /* IPersonaSharedProps,  */Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
// import { Icon } from 'office-ui-fabric-react/lib/Icon';


import { ActionButton, IIconProps } from 'office-ui-fabric-react';

const mcc = 'color:orange;';
// let _handler: any;




/* const classNames = mergeStyleSets({
    exampleRoot: {
        marginTop: '20px'
    },
    nameText: {
        fontWeight: 'bold'
    }
});

const activityItemExamples = [
    {
        key: 1,
        activityDescription: [
            <Link
                key={1}
                className={classNames.nameText}
                onClick={() => {
                    alert('A name was clicked.');
                }}
            >
                Philippe Lampros
        </Link>,
            <span key={2}> commented</span>
        ],
        activityIcon: <Icon iconName={'Message'} />,
        comments: [
            <span key={1}>Hello! I am making a comment and mentioning </span>,
            <Link
                key={2}
                className={classNames.nameText}
                onClick={() => {
                    alert('An @mentioned name was clicked.');
                }}
            >
                @Anđela Debeljak
        </Link>,
            <span key={3}> in the text of the comment.</span>
        ],
        timeStamp: 'Just now'
    },
    {
        key: 2,
        activityDescription: [
            <Link
                key={1}
                className={classNames.nameText}
                onClick={() => {
                    alert('A name was clicked.');
                }}
            >
                Lisha Refai
        </Link>,
            <span key={2}> deleted </span>,
            <span key={3} className={classNames.nameText}>
                DocumentTitle.docx
        </span>
        ],
        activityIcon: <Icon iconName={'Trash'} />,
        timeStamp: '2 hours ago'
    },
    {
        key: 3,
        activityDescription: [
            <Link
                key={1}
                className={classNames.nameText}
                onClick={() => {
                    alert('A name was clicked.');
                }}
            >
                Julian Arvidsson
        </Link>,
            <span key={2}> moved </span>,
            <Link
                key={3}
                className={classNames.nameText}
                onClick={() => {
                    alert('A document was clicked.');
                }}
            >
                PresentationTitle.pptx
        </Link>,
            <span key={4}> to </span>,
            <Link
                key={5}
                className={classNames.nameText}
                onClick={() => {
                    alert('A folder was clicked.');
                }}
            >
                Destination Folder
        </Link>
        ],
        activityIcon: <Icon iconName={'FabricMovetoFolder'} />,
        timeStamp: 'Yesterday'
    }
];
 */



export interface TreeItemProps {
    name: string;
    id: string;

    location?: any;
    email?: string;
    picture: any;
    title: string;
    department: string;

    hasKids?: boolean;
    kidCount?: number;
    handler?: any;
    toggled?: boolean;

    parentElement?: string;
    presence?: string;
}
// export interface TreeItemState {}

class TreeItem extends React.Component<TreeItemProps, {}> {
    public constructor(props: TreeItemProps) {
        super(props);
        // this.state = { : };
        // _handler = this.props.handler.bind(this);
        this._onRenderPrimaryText = this._onRenderPrimaryText.bind(this);
        this._onRenderSecondaryText = this._onRenderSecondaryText.bind(this);
        this._onRenderTertiaryText = this._onRenderTertiaryText.bind(this);
    }

    public componentDidMount() {
        console.log('%c : TreeItem -> componentDidMount -> this.props', mcc, this.props);
    }

    public _onRenderPrimaryText(props: IPersonaProps): JSX.Element {
        console.log('%c : props', mcc, props);
        return (
            <>
                {props.text}
                {/* {this.props.parentElement == 'tree' && */}
                <TreeItemMenu
                    id={this.props.id}
                    email={this.props.email}
                    handler={this.props.handler}
                    parentElement={this.props.parentElement}
                />
                {/* } */}
            </>
        );
    }

    public _onRenderSecondaryText(props: IPersonaProps): JSX.Element {
        return (
            <div>
                {props.secondaryText}
            </div>
        );
    }

    public _onRenderTertiaryText(props: IPersonaProps): JSX.Element {

        const arrowIcon: IIconProps = this.props.toggled ? { iconName: 'ArrowUpRightMirrored8' } : { iconName: 'ArrowDownRight8' };

        return (
            <div>
                {props.tertiaryText}
                {this.props.parentElement == 'tree' && this.props.kidCount > 0 &&
                    <ActionButton menuIconProps={arrowIcon}>
                        {this.props.kidCount + ' supervisees'}
                    </ActionButton>
                }
            </div>
        );
    }

    public render() {

        const tertiaryTextCity = this.props.parentElement == 'tree' ? ' (' + this.props.location.city + ')' : '';
        const tertiaryText = this.props.department + tertiaryTextCity;

        const item = {
            key: this.props.id,
            imageUrl: this.props.picture,
            text: this.props.name,
            secondaryText: this.props.title,
            tertiaryText: tertiaryText,
            optionalText: 'Available at 4:00pm',
            presence: parseInt(this.props.presence)
            // presence: PersonaPresence[this.props.presence]
        };
        console.log('%c : TreeItem -> render -> this.props.presence', mcc, this.props.presence);


        return (
            <>
                <Persona
                    // key={item.key}
                    {...item}
                    size={this.props.parentElement == 'tree' ? PersonaSize.size72 : PersonaSize.size100}
                    coinSize={this.props.parentElement == 'tree' ? 72 : 150}
                    className={this.props.parentElement == 'tree' ? 'treeItemRoot' : 'infoPanelTop'}
                    // presence={PersonaPresence[this.props.presence]}
                    // presence={2}
                    onRenderPrimaryText={this._onRenderPrimaryText}
                    onRenderSecondaryText={this._onRenderSecondaryText}
                    onRenderTertiaryText={this._onRenderTertiaryText}
                    styles={{ root: { margin: '0 0 10px 0' } }}
                    imageAlt="Annie Lindqvist, status is offline."
                />
            </>
        );
    }
}




export default TreeItem;
