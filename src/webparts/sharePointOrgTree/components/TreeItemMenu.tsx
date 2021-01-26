import * as React from 'react';
import { CommandBarButton, IButtonStyles, IconButton, IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react';

const mcc = 'background-color:black;';
const noOp = () => undefined;

export interface TreeItemMenuProps {
    id: string;
    email: string;
    handler: any;
    parentElement?: string;
}
// export interface TreeItemMenuState {}

class TreeItemMenu extends React.Component<TreeItemMenuProps, {}> {

    public constructor(props: TreeItemMenuProps) {
        super(props);
        // this.state = { :  };
        this._onClickDetails = this._onClickDetails.bind(this);
    }

    public componentDidMount() {
        console.log('%c : TreeItemMenu -> componentDidMount -> this.props', mcc, this.props);
    }

    private _onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
        console.log('%c : TreeItemMenu -> item', mcc, item);
        // const iid = item.id;
        // console.log('%c : TreeItemMenu -> iid', mcc, iid);
        return <CommandBarButton
            role="menuitem"
            iconProps={{ iconName: item.icon }}
            menuProps={item.subMenuProps}
            // text={item.name}
            title={item.name}
            onClick={e => {
                this._onClickDetails(e, item.key);
            }}
        />;

        // return (

        // item.name
        //   <Link role="menuitem" styles={{ root: { marginRight: 10 } }} onClick={item.onClick}>
        //     {item.name}
        //   </Link>
        // );
    }

    private _onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
        const buttonStyles: Partial<IButtonStyles> = {
            root: {
                minWidth: 0,
                padding: '0 4px',
                alignSelf: 'stretch',
                height: 'auto'
            }
        };

        return (
            <IconButton
                role="menuitem"
                title="More options"
                styles={buttonStyles}
                menuIconProps={{ iconName: 'More' }}
                menuProps={{ items: overflowItems! }}
            />
        );
    }

    public _onClickDetails(e, key) {
        e.preventDefault();
        e.stopPropagation();
        if (key == 'info') this.props.handler(this.props.id);
        else if (key == 'email') window.location.href = 'mailto:' + this.props.email;
    }

    public render() {
        return (
            <OverflowSet
                items={this.props.parentElement == 'tree' && [
                    {
                        key: 'info',
                        icon: 'ContactInfo',
                        name: 'Details',
                        ariaLabel: 'Contact Details',
                        // iconOnly: true,
                        // onClick: this._onClickDetails
                    },
                    {
                        key: 'email',
                        icon: 'Mail',
                        name: 'Email',
                        ariaLabel: 'Email',
                    },
                ]}
                overflowItems={[
                    {
                        key: 'profile',
                        name: 'Edit this user\'s profile',
                        iconProps: {
                            iconName: 'EditContact'
                        },
                        ariaLabel: 'Edit profile',
                    },
                    {
                        key: 'homepage',
                        name: 'View this user\'s homepage',
                        iconProps: {
                            iconName: 'Home'
                        },
                        ariaLabel: 'Home page',
                    },
                    {
                        key: 'tasks',
                        name: 'See a list of this user\'s tasks',
                        iconProps: {
                            iconName: 'TaskSolid'
                        },
                        ariaLabel: 'Tasks',
                    },
                    {
                        key: 'remove',
                        name: 'Remove this user',
                        iconProps: {
                            iconName: 'UserRemove'
                        },
                        ariaLabel: 'Remove user',
                    },
                ]}
                onRenderOverflowButton={this._onRenderOverflowButton}
                onRenderItem={this._onRenderItem}
            />
        );
    }
}

export default TreeItemMenu;