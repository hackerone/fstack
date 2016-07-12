import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import styles from 'client/styles/common.css';

const cx = classNames.bind(styles);

export const FlexBox = ({ col, children }) => {
  const wrapper = cx({
    'flex-wrapper': true,
    'flex-col': col,
  });
  return <div className={wrapper}>{children}</div>;
};

FlexBox.propTypes = {
  children: PropTypes.any,
  col: PropTypes.bool,
};

export const FlexCol = ({ size, children }) => {
  const wrapper = cx({
    'flex-el': true,
  });

  const elStyle = {
    flex: size,
  };
  return <div style={elStyle} className={wrapper}>{children}</div>;
};

FlexCol.propTypes = {
  children: PropTypes.any,
  size: PropTypes.number,
};


export const HeaderLink = (props) => {
  const wrapper = cx({
    'header-link': true,
  });
  return <Link className={wrapper} {...props}>{props.children}</Link>;
};

HeaderLink.propTypes = {
  children: PropTypes.any,
};


export const HeaderWrapper = (props) => {
  const wrapper = cx({
    'header-wrapper': true,
  });
  return <header className={wrapper} {...props}>{props.children}</header>;
};

HeaderWrapper.propTypes = {
  children: PropTypes.any,
};

export const Section = (props) => {
  const wrapper = cx({
    'section-wrapper': true,
    'section-with-image': props.avatar,
  });

  return (<section className={wrapper} {...props}>
    {props.children}
  </section>);
};

Section.propTypes = {
  children: PropTypes.any,
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export const List = (props) => {
  const wrapper = cx({
    'list-wrapper': true,
  });
  return <div className={wrapper} {...props}>{props.children}</div>;
};

List.propTypes = {
  children: PropTypes.any,
};

export const ListHeading = (props) => {
  const wrapper = cx({
    'list-heading': true,
  });
  return <h3 className={wrapper} {...props}>{props.children}</h3>;
};

ListHeading.propTypes = {
  children: PropTypes.any,
};

export const Avatar = ({ el, type }) => {
  const avatarWrapper = cx({
    'avatar-item': true,
    'list-avatar': type === 'list',
  });

  let AvatarEl = el;

  if (el && typeof el === 'string') {
    AvatarEl = <img src={el} />;
  }

  if (typeof AvatarEl !== 'undefined') {
    AvatarEl = <div className={avatarWrapper}>{AvatarEl}</div>;
  }

  return AvatarEl || null;
};

Avatar.propTypes = {
  el: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  type: PropTypes.oneOf(['list']),
};

export const ListItem = (props) => {
  const wrapper = cx({
    'list-item': true,
    'list-link': props.to,
    'list-avatar': props.avatar,
  });


  if (typeof props.to === 'undefined') {
    return (<div className={wrapper} {...props}>
      <Avatar el={props.avatar} type="list" />
      {props.children}
    </div>);
  } else {
    return (<Link className={wrapper} to={props.to} {...props}>
      <Avatar el={props.avatar} type="list" />
      {props.children}
    </Link>);
  }
};

ListItem.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string,
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};


export const Input = (props) => {
  const wrapper = cx({
    'input-wrapper': true,
  });
  const label = cx({
    'input-label': true,
  });
  const input = cx({
    'input-el': true,
    'input-el-textarea': props.type === 'textarea',
  });

  const id = Math.random().toString(36) + '_' + props.name;
  return (<div className={wrapper}>
    <label htmlFor={id} className={label}>{props.label}</label>
    {props.type === 'textarea' ?
      <textarea id={id} {...props} className={input}></textarea> :
      <input id={id} {...props} className={input} />}
  </div>);
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
};

export const Form = (props) => {
  const wrapper = cx({
    'form-wrapper': true,
  });
  return (<div className={wrapper}>
    <form {...props}>
      {props.children}
    </form>
  </div>);
};

Form.propTypes = {
  children: PropTypes.any,
};

export const Button = (props) => {
  const wrapper = cx({
    'input-button': true,
    'input-button-primary': true,
  });
  return <button className={wrapper} {...props}>{props.children}</button>;
};

Button.propTypes = {
  children: PropTypes.any,
};
