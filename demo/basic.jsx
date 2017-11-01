const React =require( 'react');
const ReactDOM =require( 'react-dom');
const Button =require( '../src');
const Flex =require('@gag/flex');
const WingBlank=require('@gag/wing-blank');
/* eslint global-require: 0 */
class ButtonExample extends React.Component{
 constructor(props) {
    super(props);
    this.state={};
    }

  render(){
        debugger
      return (
        <WingBlank>
          <div className="btn-container">
            <div>
              <Button className="btn" type="primary">primary 按钮</Button>
              <Button className="btn" disabled onClick={e => console.log(e)}>disabled 按钮</Button>
              <Button className="btn" loading>loading 按钮</Button>
              <Button className="btn" icon="check-circle-o">带图标按钮</Button>
              <Button className="btn" icon={require('./reload.svg')}>本地图标</Button>

              <div style={{ height: '0.16rem' }} />
              {/* <Button className="btn" activeStyle={false}>无点击反馈</Button> */}
              {/* <Button className="btn" activeStyle={{ backgroundColor: 'red' }}>自定义点击反馈 style</Button> */}

              <p style={{ margin: '30px 0 18px 0', color: '#999' }}>inline / small</p>
              <Flex style={{ marginBottom: '0.16rem' }}>
                <Button type="primary" inline style={{ marginRight: '0.08rem' }}>inline</Button>
                <Button type="ghost" inline size="small" style={{ marginRight: '0.08rem' }}>inline small</Button>
                <Button type="primary" inline size="small">inline small</Button>
              </Flex>
            </div>
          </div>
        </WingBlank>
      );
  }

}
ReactDOM.render(<ButtonExample />, document.getElementById('sk-root'));
