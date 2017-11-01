import '../style';
const React=require('react');
const classNames=require( 'classnames');
const Icon=require( '@gag/icon');
const Touchable=require( 'rc-touchable');

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
  return typeof str === 'string';
}

// Insert one space between two chinese characters automatically.
function insertSpace(child) {
  if (isString(child.type) && isTwoCNChar(child.props.children)) {
    return React.cloneElement(child, {},
      child.props.children.split('').join(' '));
  }
  if (isString(child)) {
    if (isTwoCNChar(child)) {
      child = child.split('').join(' ');
    }
    return <span>{child}</span>;
  }
  return child;
}

class Button extends React.Component{
  constructor(props) {
        super(props);
    }
  render() {
    const { children, className, prefixCls, type, size, inline, across,
      disabled, icon, loading, activeStyle, onClick, ...restProps } = this.props;

    const wrapCls = {
      [className]: className,
      [prefixCls]: true,
      [`${prefixCls}-primary`]: type === 'primary',
      [`${prefixCls}-ghost`]: type === 'ghost',
      [`${prefixCls}-warning`]: type === 'warning',
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-inline`]: inline,
      [`${prefixCls}-across`]: across,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-loading`]: loading,
    };

    const iconType = loading ? 'loading' : icon;
    const kids = React.Children.map(children, insertSpace);

    if (iconType) {
      wrapCls[`${prefixCls}-icon`] = true;
    }

    // use div, button native is buggy @yiminghe
    return (
      <Touchable
        activeClassName={activeStyle ? `${prefixCls}-active` : undefined}
        disabled={disabled}
        activeStyle={activeStyle}
      >
        <a
          role="button"
          className={classNames(wrapCls)}
          {...restProps}
          onClick={disabled ? undefined : onClick}
        >
          {iconType ? <Icon type={iconType} size={size === 'small' ? 'xxs' : 'md'}/> : null}
          {kids}
        </a>
      </Touchable>
    );
  }
}
Button.defaultProps = {
      prefixCls: 'am-button',
      size: 'large',
      inline: false,
      across: false,
      disabled: false,
      loading: false,
      activeStyle: {},
};
Button.propTypes = {
    type:React.PropTypes.oneOf(['primary', 'warning','ghost']),
    size:React.PropTypes.oneOf(['large','small']),
    activeStyle:React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.object
    ]),
    disabled:React.PropTypes.bool,
    onClick:React.PropTypes.func,
    style:React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]),
    /** web only */
    inline: React.PropTypes.bool,
    across: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    icon: React.PropTypes.any,
    prefixCls: React.PropTypes.string,
    className: React.PropTypes.string
};
Button.displayName = "Button";
module.exports=Button;
