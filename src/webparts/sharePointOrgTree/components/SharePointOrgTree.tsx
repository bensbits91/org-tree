import * as React from 'react';
import { ISharePointOrgTreeProps } from './ISharePointOrgTreeProps';
import Users from './Users';
import listToTree from 'list-to-tree-lite';
import TopMenu from './TopMenu';
import Tree from './Tree';
import InfoPanel from './InfoPanel';
import './SharePointOrgTree.css';
import './temp.css';

const mcc = 'color:lime;background-color:black;';


Users.map(uu => {
  uu['name'] = uu.nameObj.first + ' ' + uu.nameObj.last;
});
const userTree = listToTree(Users, {
  idKey: 'id',
  parentKey: 'parentId',
  childrenKey: 'children'
});

console.log('%c : userTree', mcc, userTree);

export interface ISharePointOrgTreeState {
  users?: any;
  toggleAll?: string;
  panel_data?: any;
}

export default class SharePointOrgTree extends React.Component<ISharePointOrgTreeProps, ISharePointOrgTreeState> {


  public constructor(props) {
    super(props);
    this.state = {
      users: userTree
    };
    this.handler_topMenu = this.handler_topMenu.bind(this);
    this.handler_card = this.handler_card.bind(this);
    this.handler_panel = this.handler_panel.bind(this);
  }




  public handler_topMenu(what) {
    console.log('%c : SharePointSiteDirectory -> handler_topMenu -> what', mcc, what);
    console.log('%c : SharePointSiteDirectory -> handler_topMenu -> this.state.toggleAll', mcc, this.state.toggleAll);
    if (!this.state.toggleAll || this.state.toggleAll != what) {
      this.setState({ toggleAll: what });
    }
  }

  public handler_card(id) {
    console.log('%c : handler_card -> id', mcc, id);
    const panel_data = /* this.state. */Users.filter(a => a.id == id)[0]; // PASS LESS DATA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.setState({
      panel_data: panel_data
    });
  }

  public handler_panel() {
    this.setState({ panel_data: null });
  }



  public render(): React.ReactElement<ISharePointOrgTreeProps> {
    return (
      <>
        <TopMenu handler={this.handler_topMenu} />
        {this.state.users &&
          <Tree
            users={this.state.users} // PASS LESS DATA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            toggleAll={this.state.toggleAll}
            handler={this.handler_card}
          />
        }
        {
          this.state.panel_data &&
          <InfoPanel
            handler={this.handler_panel}
            data={this.state.panel_data}
            showPanel={this.state.panel_data !== null}
          />
        }
      </>
    );
  }
}