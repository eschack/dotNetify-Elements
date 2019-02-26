import React from 'react';
import PropTypes from 'prop-types';
import Element from '../core/Element';
import markdown from '../utils/markdown';
import createHtmlElement from '../utils/html-element';

export class Alert extends Element {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string,

      // Danger color.
      danger: PropTypes.bool,

      // Info color.
      info: PropTypes.bool,

      // Success color.
      success: PropTypes.bool,

      // Warning color.
      warning: PropTypes.bool,

      // Occurs when the element becomes visible.
      onShow: PropTypes.func
   };

   static componentTypes = {
      AlertComponent: undefined
   };

   render() {
      const [ _Alert ] = this.resolveComponents(Alert);
      const { fullId, children, onShow, ...props } = this.attrs;

      const show = (!!fullId && !!children) || !!this.value;
      onShow && onShow(show);

      return (
         show && (
            <_Alert id={fullId} ref="slotParent" {...props}>
               {this.value && markdown(this.value)}
               {children}
            </_Alert>
         )
      );
   }
}

createHtmlElement(Alert, 'd-alert');
