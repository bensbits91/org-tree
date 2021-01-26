import * as React from 'react';
import { Treebeard } from 'react-treebeard';
import decorators from 'react-treebeard/dist/components/Decorators';
import defaultTheme from "react-treebeard/dist/themes/default";
import TreeItem from './TreeItem';
import './Tree.module.css';
// import { ActivityItem } from 'office-ui-fabric-react';

const mcc = 'color:aqua;';
const mcc2 = 'color:magenta;';
// let allUsers = [];
let _toggleAll = '';
let _handler: any;


export interface TreeProps {
    users: any;
    toggleAll?: string;
    handler: any;
}

export interface TreeState {
    cursor?: any;
    data?: any;
    toggleAll?: string;
}




class CutomContainer extends decorators.Container {

    public myProps;

    public constructor(props) {
        super(props);
        // console.log('%c : CutomContainer -> constructor -> props', mcc, props);
        this.myProps = props;
    }

    // public _onClick(e) {
    //     console.log('%c : CutomContainer -> _onClick -> e', mcc, e.target);

    // }

    public render() {
        const { onClick, node } = this.myProps;
        console.log('%c : CutomContainer -> render -> this.myProps', mcc2, this.myProps);
        console.log('%c : CutomContainer -> render -> node', mcc2, node);

        // const ui = 


        // console.log('%c : CutomContainer -> render -> _toggleAll', mcc, _toggleAll);
        const _toggled =
            _toggleAll == 'Expand all' ? true
                : _toggleAll == 'Collapse all' ? false
                    : node.toggled;
        // console.log('%c : CutomContainer -> render -> _toggled', mcc, _toggled);

        const kidCount = node.children.length || 0;
        //     me && me.Id ? allSites.length - 1
        //         : node.children ? node.children.length
        //             : 0;

        // const kidType =
        //     kidCount
        //         ? me && me.Id ? ' site collections'
        //             : me && me.SiteID ? ' subsites'
        //                 : ' site collections'
        //         : '';

        return (
            <div
                // onClick={(e) => this._onClick(e)}
                onClick={onClick}
                className='treeItemContainer'
            >
                <TreeItem
                    name={node.name}
                    id={node.id}
                    toggled={_toggled}

                    location={node.location}
                    email={node.email}
                    // dob={node.dob}
                    // phone={node.phone}
                    // cell={node.cell}
                    picture={node.picture.medium}
                    // nat={node.nat}
                    title={node.title}
                    department={node.department}
                    
                    hasKids={node.children && node.children.length} // REPLACE WITH KIDCOUNT ???????????????????????????????????????????????????????????????????????????????????????????????
                    kidCount={kidCount}
                    // kidType={kidType}
                    handler={_handler}
                    parentElement='tree'
                    presence={node.presence}
                />
            </div>
        );
    }
}


class Tree extends React.Component<TreeProps, TreeState> {

    public constructor(props: TreeProps) {
        super(props);

        this.state = {
            cursor: null,
            data: this.props.users
        };

        _handler = this.props.handler.bind(this);

        this.onToggle = this.onToggle.bind(this);
    }

    public componentDidMount() {
        console.log('%c : Tree -> componentDidMount -> this.props', mcc, this.props);
    }

    public componentDidUpdate(prevProps: TreeProps, prevState: TreeState) {
        if (prevProps !== this.props) console.log('%c : Tree -> componentDidUpdate -> this.props', mcc, this.props);
        if (prevState !== this.state) console.log('%c : Tree -> componentDidUpdate -> this.state', mcc, this.state);
        if (prevState.toggleAll != this.props.toggleAll) {
            _toggleAll = this.props.toggleAll;
            this.setState({ toggleAll: this.props.toggleAll });
        }
    }

    public onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
            // this.setState({ cursor[active]: false  });
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({ cursor: node });
    }



    public render() {

        // console.log('asdf');

        // decorators.Header = CustomHeader;
        decorators.Container = CutomContainer;

        defaultTheme.tree.base = {
            ...defaultTheme.tree.base,
            color: '#555',
            backgroundColor: '#fff'
        };

        return (
            <Treebeard
                key={this.state.toggleAll ? this.state.toggleAll.replace(/ /g, '') : 1}
                data={this.state.data}
                decorators={decorators}
                style={defaultTheme}
                onToggle={(node, toggled) => {
                    if (this.state.cursor) {
                        this.state.cursor.active = false;
                    }
                    node.active = true;
                    if (node.children) {
                        node.toggled = toggled;
                    }
                    this.setState({ cursor: node });
                }}
            />
        );
    }
}

export default Tree;